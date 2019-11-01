import React, { Component } from 'react';
import logo from '../../img/logo.png';
import nepal from '../../img/nepal.png';
import uk from '../../img/uk.png'


 class Navbar extends Component {
    render() {
        return (
            <>
                    <div className="headLeft">
                        <div className="logo">
                            <a href="index.html"><img src={logo} alt="logo" /></a>
                        </div>
                    </div>

                    <div className="headRight">
                        <div className="country-logos flex-end">
                            <a className="active" href="#">
                                <img src={uk} alt="uk" />
                            </a>
                            <a href="#">
                                <img src={nepal} alt="Nepal" />
                            </a>
                        </div>
                        <nav id="site-navigation" className="main-navigation" role="navigation">
                            <div className="toggle-button">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="menu-primary-container">
                                <ul id="primary-menu" className="menu nav-menu">
                                    <li className="menu-item ">
                                        <a href="index.html">Resources</a>
                                    </li>
                                    <li className="menu-item ">
                                        <a href="#">Reports</a>
                                    </li>
                                    <li className="menu-item menu-item-has-current">
                                        <a href="#">Find Open Space</a>
                                    </li>
                                    <li className="menu-item ">
                                        <a href="#">about app</a>
                                    </li>

                                </ul>
                            </div>
                        </nav>
                    </div>
                </>
           
        )
    }
}
export default Navbar;
