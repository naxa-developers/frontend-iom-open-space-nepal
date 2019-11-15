import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../../img/logo.png";
import nepal from "../../img/nepal.png";
import uk from "../../img/uk.png";
import $ from "jquery";

// do by react
function toggle_button() {
  $(".headRight .toggle-button").on("click", function() {
    $(this).toggleClass("active");
    $("body").toggleClass("Is-toggle");
  });
}
toggle_button();

class Navbar extends Component {
  render() {
   
    const { contents } = this.props;

    return (
      <>
        <header className="site-header" id="navHeader">
          <div className="container">
            <div className="headerWrap">
              <div className="headLeft">
                <div className="logo">
                  <Link to="/">
                    <img src={logo} alt="logo" />
                    </Link>
                </div>
              </div>

              <div className="headRight">
                <div className="country-logos flex-end">
                  <a className="active" >
                    <img
                      src={uk}
                      alt="uk"
                      onClick={() => this.props.dispatch({ type: "english" })}
                    />
                  </a>
                  <a >
                    <img
                      src={nepal}
                      alt="Nepal"
                      onClick={() => this.props.dispatch({ type: "nepali" })}
                    />
                  </a>
                </div>
                <nav
                  id="site-navigation"
                  className="main-navigation"
                  role="navigation"
                >
                  <div className="toggle-button" onClick={toggle_button}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="menu-primary-container">
                    <ul id="primary-menu" className="menu nav-menu">
                      <li className="menu-item ">
                        <Link to="resources">
                          {this.props.language == "0"
                            ? "Resources"
                            : "स्रोतहरु"}
                        </Link>
                      </li>
                      <li className="menu-item ">  
                        <Link to="report">
                          {this.props.language == "0" ? "Reports" : "रिपोर्ट"}
                          </Link>
                      </li>
                      <li className="menu-item menu-item">
                        <Link to="openspace">
                          {this.props.language == "0"
                            ? "Find Open Space "
                            : "खुल्ला क्षेत्र पत्ता लगाउनुहोस"}
                        </Link>
                      </li>
                      <li className="menu-item ">
                        <Link to="aboutapp">
                          {" "}
                          {this.props.language == "0"
                            ? "mobile app"
                            : "मोबाईल एप  "}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    language: state.language
  };
};

export default connect(mapStateToProps)(Navbar);
