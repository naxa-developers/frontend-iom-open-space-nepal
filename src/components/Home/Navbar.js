import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import logo from "../../img/header-logo.png";
import nepal from "../../img/nepal.png";
import uk from "../../img/uk.png";



class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggle: false
        }
    }

    toggleButton = (event) => {
        event.preventDefault();


        this.setState({
            toggle: !this.state.toggle

        });
    }
    handleClick = (v) => {


    }

    render() {
        const { contents } = this.props;

        return (
            <>
                <header
                    className={this.state.toggle
                        ? "site-header homepage-header Is-toggle sticky"
                        : "site-header homepage-header "
                    } >
                    {/* //  id="navHeader"> */}
                    <div className="container">
                        <div className="headerWrap">
                            <div className="headLeft">
                                <div className="logo">
                                    <NavLink to="/">
                                        <img src={logo} alt="logo" style={{ zIndex: 99, cursor: 'pointer' }} />
                                    </NavLink>
                                </div>
                            </div>

                            <div className="headRight">
                                <div className="country-logos flex-end">
                                    <a className={this.props.language == "0" ? "active" : ''} onClick={() => this.props.dispatch({ type: "english" })}>
                                        {/* <img
                                            // src={uk}
                                            // alt="uk"
                                            src={uk} alt="uk"
                                            
                                            style={{ cursor: 'pointer' }} ></img> */}
                                        <p style={{ color: "white", fontSize: "0.75rem", fonttWeight: "600", padding: "0.1rem 0.2rem", cursor: "pointer" }} >En</p>

                                    </a>
                                    <a className={this.props.language == "0" ? "active" : ''} onClick={() => this.props.dispatch({ type: "nepali" })}>
                                        {/* <img
                                            // src={uk}
                                            // alt="uk"
                                            src={uk} alt="uk"
                                            
                                            style={{ cursor: 'pointer' }} ></img> */}
                                        <p style={{ color: "white", fontSize: "0.75rem", fonttWeight: "600", padding: "0.1rem 0.2rem", cursor: "pointer" }} >Np</p>

                                    </a>
                                </div>
                                <nav
                                    id="site-navigation"
                                    className="main-navigation"
                                    role="navigation"
                                >
                                    <div
                                        className={
                                            this.state.toggle
                                                ? "toggle-button active "
                                                : "toggle-button "
                                        }
                                        onClick={() => this.toggleButton(event)}
                                    >
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <div className="menu-primary-container">
                                        <ul id="primary-menu" className="menu nav-menu">
                                            {/* <li className="menu-item  ">
                      <NavLink to="/" className="menu-item"  activeClassName = "menu-item " >
                          {this.props.language == "0"
                            ? "Home"
                            : "गृहपृष्ठ "
                            } 
                           
                        </NavLink>
                        </li>
                         */}
                                            <li className="menu-item  ">
                                                <NavLink to="resources" className="menu-item" activeClassName="menu-item active" >
                                                    {this.props.language == "0"
                                                        ? "Resources"
                                                        : "स्रोतहरु"
                                                    }

                                                </NavLink>
                                            </li>
                                            <li className="menu-item  ">
                                                <NavLink to="report" className={this.props.nav ? "menu-item active" : "menu-item"} activeClassName=" menu-item active">
                                                    {this.props.language == "0" ? "Encroachment Reports" : "रिपोर्ट"}
                                                </NavLink>
                                            </li>

                                            <li className="menu-item ">
                                                <NavLink to="aboutapp" className="menu-item" activeClassName=" menu-item active ">
                                                    {" "}
                                                    {this.props.language == "0"
                                                        ? "Open space app"
                                                        : "मोबाईल एप  "}
                                                </NavLink>
                                            </li>
                                            <li className="menu-item ">
                                                <NavLink to="about" className="menu-item" activeClassName=" menu-item active ">
                                                    {" "}
                                                    {this.props.language == "0"
                                                        ? "About"
                                                        : "खुल्ला क्षेत्र बारे"}
                                                </NavLink>
                                            </li>

                                            <li className="menu-item menu-item-has-current">
                                                <NavLink to="openspace" className="menu-item" activeClassName=" menu-item ">
                                                    {this.props.language == "0"
                                                        ? "Find Open Space "
                                                        : "खुल्ला क्षेत्र पत्ता लगाउनुहोस"}
                                                </NavLink>
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
