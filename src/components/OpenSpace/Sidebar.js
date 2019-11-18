import React, { Component } from "react";
import Select from "react-select";
import OpenSpaceCard from "./OpenSpaceCard";
import PerfectScrollbar from "react-perfect-scrollbar";
import "./OpenSpaceCSS.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import L from "leaflet";

import MaterialIcon from "material-icons-react";
import Axios from "axios";
import { log } from "util";

const Province = [{ value: "1", label: "Last 7 days" }];
const District = [{ value: "1", label: "Status" }];

const Municipality = [{ value: "1", label: "Urgency" }];

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.sidebarToggle = this.sidebarToggle.bind(this);
    this.state = {
      Openspaces: null,
      showContent: true,
      province: null,
      district: null,
      municipality: null,
      SelectedProvince: null,
      SelectedDistrict: null,
      SelectedMunicipality: null,
      Allos: [],
      handlingindex: 0,
      focused: false,
      district_muni: L.featureGroup()
    };
  }

  sidebarToggle = event => {
    event.preventDefault();
    this.setState({
      showContent: !this.state.showContent
    });
  };

  fetchingForDropdown = name => {
    var key =
      name == "province"
        ? "province_api"
        : name == "district"
        ? "district_api"
        : name == "municipality"
        ? "municipality_api"
        : "";
    var url = `http://139.59.67.104:8011/api/v1/${key}`;
    var prvnc_dist =
      name == "district"
        ? "province"
        : name == "municipality"
        ? "district"
        : "";

    Axios.get(url).then(response => {
      var array = [];
      // console.log(response.data.data[0][prvnc_dist.toString()],"..a.a.a.")
      response.data.data.map(e => {
        let object = {
          value: e.id,
          label: e.name,
          [prvnc_dist]: e[prvnc_dist.toString()]
        };
        array.push(object);
      });
      this.setState({ [name]: array, [name + "tofilter"]: array });
    });
  };
  fetchOS = () => {
    Axios.get("http://139.59.67.104:8011/api/v1/open_space_landing").then(
      response => {
        this.setState({
          Allos: response.data.data,
          Openspaces: response.data.data
        });
        // this.props.mapRefs.addLayer(this.state.Ospointlayer)
        this.state.Allos.map(e => {
          console.log(this.props.mapRefs);
        });
      }
    );
  };

  onload = () => {
    var windowHeight = window.innerHeight;

    var navHeight = document.getElementsByClassName("site-header")[0]
      .clientHeight;

    document.getElementsByClassName(
      "sidebar-wrapper"
    )[0].style.height = `${windowHeight - navHeight}px`;
  };
  handleprovince = e => {
    this.setState({ SelectedProvince: e });

    let FilteredDistrict = this.state.districttofilter.filter(i => {
      return i.province == e.label;
    });
    this.setState({ district: FilteredDistrict, handlingindex: 1 });
  };

  handledistrict = e => {
    this.setState({ SelectedDistrict: e });
    this.setState({ handlingindex: 1 });
    window.map = this.props.mapRefs.current.leafletElement;
    this.state.district_muni.eachLayer(e =>
      this.state.district_muni.removeLayer(e)
    );

    let FilteredMunicipality = this.state.municipalitytofilter.filter(i => {
      return i.district == e.label;
    });
    this.setState({ municipality: FilteredMunicipality, handlingindex: 2 });

    Axios.get(
      `http://139.59.67.104:8011/api/v1/district_geo_json?id=${e.value}`
    ).then(response => {
      var district = L.geoJSON(response.data);
      district.addTo(this.state.district_muni);
      // this.props.mapRefs.current.leafletElement.fitBounds(this.state.district_muni.getBounds())
      // console.log(this.state.district_muni.getBounds())
      // var zoom=window.map.getZoom()
      // console.log(zoom)
      // window.map.setZoom(zoom-3)
    });
  };

  handlemunicipality = e => {
    this.setState({ SelectedMunicipality: e });
    window.map = this.props.mapRefs.current.leafletElement;
    this.state.district_muni.eachLayer(e =>
      this.state.district_muni.removeLayer(e)
    );

    Axios.get(
      `http://139.59.67.104:8011/api/v1/municipality_geo_json?id=${e.value}`
    ).then(response => {
      var municipality = L.geoJSON(response.data);
      municipality.addTo(this.state.district_muni);
      // this.props.mapRefs.current.leafletElement.fitBounds(this.state.district_muni.getBounds())

      var zoom = window.map.getZoom();
    });
  };
  searchOs = () => {
    var Filtered = this.state.Openspaces.filter(e =>
      e.title.toUpperCase().includes(this.state.search_keyword.toUpperCase())
    );
  };

  componentDidMount() {
    this.fetchingForDropdown("province");
    this.fetchingForDropdown("district");
    this.fetchingForDropdown("municipality");
    this.fetchOS();
    this.onload();
    window.map = this.props.mapRefs.current.leafletElement;
    window.map.addLayer(this.state.district_muni);
    // window.map1=this.props.mapRefs.current.leafletElement
  }

  render() {
    // var toggleClass = this.props.isClick ? 'rotated' : 'sidebar-toggle';
    const { showContent } = this.state;
    return (
      <>
        <div className="map-sidebar">
          <span
            className={` ${
              showContent == true ? "sidebar-toggle" : "sidebar-toggle rotated"
            }`}
          >
            <MaterialIcon
              icon="keyboard_arrow_right"
              onClick={() => this.sidebarToggle(event)}
            />
            {/* <i className="material-icons" onClick={this.sidebarToggle}>keyboard_arrow_right</i> */}
          </span>

          <div className="sidebar-wrapper">
            <div className="card">
              <div className="card-body">
                <div className="map-filter">
                  <div className="filter-option">
                    <Select
                      options={this.state.province}
                      placeholder="Province"
                      onChange={e => this.handleprovince(e)}
                      value = {this.state.SelectedProvince}
                    />
                    <Select
                      options={this.state.district}
                      placeholder="District"
                      onChange={e => this.handledistrict(e)}
                      isDisabled={this.state.handlingindex < 1 ? true : false}
                      value={this.state.SelectedDistrict}
                    />
                    <Select
                      options={this.state.municipality}
                      placeholder="Municipality"
                      onChange={e => this.handlemunicipality(e)}
                      isDisabled={this.state.handlingindex < 2 ? true : false}
                      value={this.state.SelectedMunicipality}
                    />
                    {/* <select className="selectpicker">
                    <option>status</option>
                  </select> */}
                  </div>
                  <div className="reset-btns">
                    <div className="reset">
                      <i className="material-icons">refresh</i>
                      <span
                        onClick={() =>
                          this.setState({
                            SelectedProvince: null,
                            SelectedDistrict: null,
                            SelectedMunicipality: null,
                            district: null,
                            municipality: null,
                            handlingindex: 0
                          })
                        }
                      >
                        clear all
                      </span>
                    </div>
                    <a href="#" className="openspace-button">
                      Apply
                    </a>
                  </div>
                </div>

                <div className="nearme-btn">
                  <a href="#" className="openspace-button">
                    <i
                      className="material-icons"
                      style={{ textDecoration: "none" }}
                    >
                      near_me
                    </i>
                    Nearby me
                  </a>
                </div>
                <div className="report-count">
                  <h5>
                    Open spaces: <span>{this.state.Allos.length}</span>
                  </h5>
                </div>
                <div className="space-list">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="material-icons">search</i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      aria-label=""
                      placeholder="Search Open Space"
                      onInput={e =>
                        this.setState({ search_keyword: e.target.value })
                      }
                      onFocus={() => this.setState({ focused: true })}
                      // onBlur={()=>setTimeout(()=>{
                      //   this.setState({focused:false})

                      // },300)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        {this.state.focused && (
                          <i
                            className="material-icons"
                            onClick={() => this.searchOs()}
                          >
                            keyboard_backspace
                          </i>
                        )}
                      </span>
                    </div>
                  </div>

                  <ul>
                    {/* <PerfectScrollbar> */}

                    {this.state.Allos &&
                      this.state.Allos.map(e => {
                        // L.marker([])
                        //
                        console.log(e);

                        return (
                          <OpenSpaceCard
                            name={e.title}
                            address={e.address}
                            image={e.image}
                            id={e.id}
                          />
                        );
                      })}

                    {/* <OpenSpaceCard />
                    <OpenSpaceCard />
                    <OpenSpaceCard />
                    <OpenSpaceCard />
                    <OpenSpaceCard />
                    <OpenSpaceCard />
                    <OpenSpaceCard />
                    <OpenSpaceCard />
                    <OpenSpaceCard />
                    <OpenSpaceCard />
                    <OpenSpaceCard />
                    <OpenSpaceCard /> */}
                    {/* </PerfectScrollbar> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Sidebar;
