import React, { Component } from "react";
import Select from "react-select";


import MaterialIcon from "material-icons-react";

const options = [
    { value: "1", label: "Last 7 days" }
 
  ];
  const options1 = [
    { value: "1", label: "Status" }
 
  ];

  const options2 = [
    { value: "1", label: "Urgency" }
 
  ];

// DO USING REACT LATER
//   function sidebarToggle() {
//     $('.map-sidebar .sidebar-toggle').on('click', function () {
//         $(this).toggleClass('rotated');
//         $(this).closest('.map-sidebar').find('.sidebar-wrapper').animate({
//             width: "toggle"
//         });
//     });
// }
// sidebarToggle();
class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.sidebarToggle = this.sidebarToggle.bind(this)
    this.state = {
      showContent: true
    }
  }
  
  sidebarToggle(event) {
      event.preventDefault();
      this.setState({
        showContent: !this.state.showContent
      })
  
  }

  
  render() {
    // var toggleClass = this.props.isClick ? 'rotated' : 'sidebar-toggle';
    const {showContent} = this.state;
    return (
      <div className="map-sidebar">
        <span className= {` ${showContent == true ? 'sidebar-toggle': 'sidebar-toggle rotated' }`}>
          <i className="material-icons" onClick={this.sidebarToggle}>keyboard_arrow_right</i>
          
        </span>
        <MaterialIcon ></MaterialIcon>
        <div className="sidebar-wrapper">
          <div className="card">
            <div className="card-body">
              <div className="map-filter">
                <div className="filter-option">
                 
                  <Select options={options} />
                  <Select options={options1} />
                  <Select options={options2} />
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
                    placeholder="Search reports"
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="material-icons">keyboard_backspace</i>
                    </span>
                  </div>
                </div>

                <ul>
                  <li>
                    <div className="space">
                      <figure>
                        <img
                          src={require("../../img/space-1.jpg")}
                          alt="space"
                        />
                      </figure>
                      <div className="space-content">
                        <h5>Ratna Park</h5>
                        <p>
                          <span>
                            <i className="material-icons">room</i>Ratna park,
                            kathmandu 44600
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>200 m
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="space-direction">
                      <i className="material-icons">directions</i>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img
                          src={require("../../img/space-2.jpg")}
                          alt="space"
                        />
                      </figure>
                      <div className="space-content">
                        <h5>National Academy</h5>
                        <p>
                          <span>
                            <i className="material-icons">room</i>Kanti Path,
                            Kathmandu 44600
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>500 m
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="space-direction">
                      <i className="material-icons">directions</i>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img
                          src={require("../../img/space-3.jpg")}
                          alt="space"
                        />
                      </figure>
                      <div className="space-content">
                        <h5>Jawalakhel Football Ground</h5>
                        <p>
                          <span>
                            <i className="material-icons">room</i>Jawalakhel,
                            Lalitpur 44700
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>750 m
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="space-direction">
                      <i className="material-icons">directions</i>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img
                          src={require("../../img/space-4.jpg")}
                          alt="space"
                        />
                      </figure>
                      <div className="space-content">
                        <h5>Lagankhel Football Ground</h5>
                        <p>
                          <span>
                            <i className="material-icons">room</i>Lagankhel,
                            Lalitpur 44700
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>800 m
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="space-direction">
                      <i className="material-icons">directions</i>
                    </div>
                  </li>
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
