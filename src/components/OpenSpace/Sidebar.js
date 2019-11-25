import React, { Component } from "react";
import Select from "react-select";
import OpenSpaceCard from "./OpenSpaceCard";
import Loader from '../Report/LoadingSpinner';

import "./OpenSpaceCSS.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import L from "leaflet";

import MaterialIcon from "material-icons-react";
import Axios from "axios";



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
      loading: true,
      district_muni: L.featureGroup(),
      Routespaths: [],
      Routes: L.featureGroup(),
      legend: L.control({ position: 'bottomright' }),
      div: L.DomUtil.create('div', 'routeWrapper')
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
          Openspaces: response.data.data,
          loading: false
        });
        

        // this.state.Allos.map(e => {
        //   console.log(this.props.mapRefs);
        // });
        this.displayOS();
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
    this.setState({
      district: FilteredDistrict,
      handlingindex: 1,
      SelectedDistrict: null,
      SelectedMunicipality: null
    });
  };

  handledistrict = e => {
    this.setState({ SelectedDistrict: e });
    this.setState({ handlingindex: 2 });
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
      this.props.mapRefs.current.leafletElement.fitBounds(
        this.state.district_muni.getBounds()
      );
      // console.log(this.state.district_muni.getBounds())
      // var zoom=window.map.getZoom()

      // window.map.setZoom(zoom-3)
    });
    this.setState({ SelectedMunicipality: null });
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
      this.props.mapRefs.current.leafletElement.fitBounds(
        this.state.district_muni.getBounds()
      );

      // var zoom = window.map.getZoom();
    });
  };
  searchOs = () => {


    var Filtered = this.state.Openspaces.filter(e =>
      e.title.toUpperCase().includes(this.state.search_keyword.toUpperCase())
    );

    this.setState({ Allos: Filtered });
  };

  displayOS = () => {


    this.state.Allos.map(e => {

      var map = this.props.mapRefs.current.leafletElement;
      var marker = L.circleMarker([e.latitude, e.longitude]).addTo(map);
    });
  };

  fetchroute = (first, second) => {
    console.log(second,first)
    var activeroute;

    this.state.Routespaths = []
    this.state.Routes.eachLayer((r) => this.state.Routes.removeLayer(r))
    var baseUrl = "http://139.59.67.104:8989/route";
    var url =
      `${baseUrl}?point= ${first[0]},${first[1]},` +
      `&point=${second[0]},${second[1]}` +
      "&points_encoded=false" +
      "&ch.disable=true" +
      "&alternative_route.max_paths=4" +
      "&algorithm=alternative_route";
    var colors = ["red", 'green', 'black']
    console.log(url)
    Axios.get(url)
      .then(Response => {
        console.log(Response.data)

   
        for (var j = 0; j < Response.data.paths.length; j++) {
          var path = []
          for (var i = 0; i < Response.data.paths[j].points.coordinates.length; i++) {

            path.push(Response.data.paths[j].points.coordinates[i].reverse())
          }
          console.log(Response.data.paths[j].description)
          var polyline = L.polyline(path, { color: j == Response.data.paths.length - 1 ? 'blue' : 'grey' })
          this.state.Routespaths.push({ id: j, path: polyline, description:Response.data.paths[j].description==undefined?"No Descrption":Response.data.paths[j].description[0] , distance: Response.data.paths[j].distance })
        
          this.state.Routes.addLayer(polyline)
          window.map.fitBounds(polyline.getBounds())

        }
        activeroute=0











        // var legend = L.control({ position: 'bottomright' })
        this.state.legend.onAdd = (map) => {

          var div = L.DomUtil.create('div', `routeWrapper`)
          div.innerHTML = ''


          this.state.Routespaths.map(e => {
            console.log(activeroute)

            var class1='desccard';
            var activeclass=class1
     
            var descCard = `<div  class=${class1} name=`+ e.id + ">" +
              e.description + '<br/>' +
              e.distance + " m"
            "<div>";
            activeroute==this.state.Routespaths.length-1?descCard.classList.add('pathactive'):null


            div.innerHTML += descCard
            activeroute++

          })
          // innterhtml
          



          return div;
        }



        // var divss = document.getElementsByClassName('routeWrapper');
        // console.log(divss,"divs")
        // if(divss!=0){
        //   for(var i=0;i<divss.length;i++){


        //     divss[i].innerHTML='<h1>a</h1>'



        //   }
        // }

        this.state.legend.addTo(window.map)
        console.log(this.state.Routespaths)





        var doc = document.getElementsByClassName('desccard')

        for (var i = 0; i < doc.length; i++) {
          doc[i].addEventListener('click', (e) => {
            // console.log(e.target.getAttribute('name'));
            var value = e.target.getAttribute('name')
            var selected = this.state.Routespaths.filter((a) => {
              return a.id == value})

            for (var a = 0; a < doc.length; a++) {
              if (doc[a].getAttribute('name') == value) {
                doc[a].classList.add('pathactive')
                for (var k = 0; k < this.state.Routespaths.length; k++) {
                  this.state.Routespaths[k].path.setStyle({
                    color: 'grey'
                  })
                }

                selected[0].path.setStyle({ color: 'blue' })

                selected[0].path.bringToFront()

              }
              else {
                doc[a].classList.remove('pathactive')


              }
            }


          }
          )
        }


      }
      )
  }



  componentDidMount() {
    this.fetchingForDropdown("province");
    this.fetchingForDropdown("district");
    this.fetchingForDropdown("municipality");
    this.fetchOS();
    this.onload();


    window.map = this.props.mapRefs.current.leafletElement;
    window.map.addLayer(this.state.district_muni);
    window.map.addLayer(this.state.Routes);

    // window.map1=this.props.mapRefs.current.leafletElement
  }

  render() {




    // var toggleClass = this.props.isClick ? 'rotated' : 'sidebar-toggle';
    const { showContent } = this.state;
    return (
      <>
        <div className="map-sidebar">


          <div className="sidebar-wrapper">
            <div className="card">
              <div className="card-body">
                <div className="map-filter">
                  <div className="filter-option">
                    <Select
                      options={this.state.province}
                      placeholder="Province"
                      onChange={e => this.handleprovince(e)}
                      value={this.state.SelectedProvince}
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

                  </div>
                  <div className="reset-btns">
                    <div className="reset">
                      <MaterialIcon icon="refresh"></MaterialIcon>
                      <span
                        onClick={() => {
                          this.setState({
                            SelectedProvince: null,
                            SelectedDistrict: null,
                            SelectedMunicipality: null,
                            district: null,
                            municipality: null,
                            handlingindex: 0
                          })
                          var bounds = [[30.86924662953735,
                            100.29542704344739],
                          [
                            26.7211025368031,
                            79.2016770434474
                          ]];
                          window.map.fitBounds(bounds)
                        }

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
                      onKeyDown={e => {
                        if (e.key == "Enter") this.searchOs();
                      }}

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


                    {this.state.loading ? <Loader /> :
                      this.state.Allos.map(e => {

                        return (
                          <OpenSpaceCard
                          currentlocation={this.props.currentLocation}
                            latlng={[e.latitude, e.longitude]}
                            routing={this.fetchroute}
                            key={e.id}
                            name={e.title}
                            address={e.address}
                            image={e.image}
                            id={e.id}
                          />
                        );
                      })}


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
