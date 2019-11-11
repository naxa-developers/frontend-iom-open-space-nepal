import React, { Component } from "react";
import Select from "react-select";
import OpenSpaceCard from './OpenSpaceCard'
import PerfectScrollbar from 'react-perfect-scrollbar'
import './OpenSpaceCSS.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import L from 'leaflet';




import MaterialIcon from "material-icons-react";
import Axios from "axios";

const Province = [
  { value: "1", label: "Last 7 days" }

];
const District = [
  { value: "1", label: "Status" }

];

const Municipality = [
  { value: "1", label: "Urgency" }

];




class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.sidebarToggle = this.sidebarToggle.bind(this)
    this.state = {
      showContent: true,
      province: null,
      district: null,
      municipality: null,


    }
  }

  sidebarToggle(event) {
    event.preventDefault();
    this.setState({
      showContent: !this.state.showContent
    })

  }

  fetchingForDropdown = (name) => {
    var key=name=="province"?"province_api":name=="district"?"district_api":name=="municipality"?"municipality_api":''
    var url=`http://139.59.67.104:8011/api/v1/${key}`
    console.log(key,"sas",url);

    
    Axios.get(url)
      .then(response => {
        console.log(response.data.data,"A")
        var array = []
        response.data.data.map((e) => {
          let object = { value: e.id, label: e.name }
          array.push(object)
        })
        this.setState({ [name]: array })
      })


  }
  fetchOS=()=>{
    Axios.get("http://139.59.67.104:8011/api/v1/open_space_landing")
    .then(response=>{
      console.log(response.data.data)
      this.setState({Allos:response.data.data})
    
    }
    )
  }


  componentDidMount() {
    this.fetchingForDropdown('province')
    this.fetchingForDropdown('district')
    this.fetchingForDropdown('municipality')
    this.fetchOS()


  }


  render() {
    // var toggleClass = this.props.isClick ? 'rotated' : 'sidebar-toggle';
    const { showContent } = this.state;
    return (
      <div className="map-sidebar">
        <span className={` ${showContent == true ? 'sidebar-toggle' : 'sidebar-toggle rotated'}`}>
          <i className="material-icons" onClick={this.sidebarToggle}>keyboard_arrow_right</i>

        </span>
        <MaterialIcon ></MaterialIcon>
        <div className="sidebar-wrapper">
          <div className="card">
            <div className="card-body">
              <div className="map-filter">
                <div className="filter-option">

                  <Select options={this.state.province} placeholder="Province" />
                  <Select options={this.state.district} placeholder="District" isDisabled />
                  <Select options={this.state.municipality} placeholder="Municipality" isDisabled />
                  {/* <select className="selectpicker">
                    <option>status</option>
                  </select> */}
                </div>
                <div className="reset-btns">
                  <div className="reset">
                    <i className="material-icons">refresh</i>
                    <span>clear all</span>
                  </div>
                  <a href="#" className="openspace-button">
                    Apply
                  </a>
                </div>
              </div>

              <div className="nearme-btn">
                <a href="#" className="openspace-button">
                  <i className="material-icons">near_me</i>Nearby me
                </a>
              </div>
              <div className="report-count">
                <h5>
                  Open spaces: <span>150</span>
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
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="material-icons">keyboard_backspace</i>
                    </span>
                  </div>
                </div>


                <ul>
                  <PerfectScrollbar>

                  {this.state.Allos&&this.state.Allos.map((e)=>{
                    // L.marker([])
                    return <OpenSpaceCard name={e.title} address={e.address} image={e.image}/>

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
                  </PerfectScrollbar>

                </ul>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Sidebar;
