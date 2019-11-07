import React, { Component } from 'react'
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

import bannerShape from '../../img/banner-shape.png';

 class AboutApp extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div class="app-section mb-150 pt-150">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <figure class="app-figure flex-end">
                                    <img src={require('../../img/app-banner.png')} alt="app" />
                                </figure>
                            </div>
                            <div class="col-md-6">
                                <figure class="app-content">
                                    <span class="sub-title">Get started with</span>
                                    <h3 class="openspace-title">OPEN SPACES App</h3>
                                    
                                    <div class="app-icons-content">
                                        <a href="#" class="openspace-button">Learn more</a>
                                        <h4>Download now</h4>
                                        <div class="app-icon flex-start">
                                            <figure>
                                                <img src={require('../../img/appstore.png')} alt="ios" />
                                            </figure>
                                            <figure>
                                                <img src={require('../../img/googleplay.png')} alt="android" />
                                            </figure>
                                        </div>
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
            </div>
            <main class="main-content">
            <div class="container">
                {/* <!-- first-row --> */}
                <div class="row-wrap">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="content-text">
                                <div class="content-center">
                                    <figure>
                                        <img src={require('../../img/map-pin-locations.svg')} alt="location" />
                                    </figure>
                                    <div class="content-title">
                                        <h3 class="openspace-title">Find open spaces</h3>
                                        <p class="content-para">In 13 district with total 141 open spaces, find an open space near you easily, in times of disaster</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="content-image">
                                <figure>
                                    <img src={require('../../img/find-space.png')} alt="find-space" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- second-row --> */}
                <div class="row-wrap">
                    <div class="row">
                        <div class="col-12 col-md-6 order-sm-1 order-md-0">
                            <div class="content-image">
                                <figure>
                                    <img src={require('../../img/report.png')} alt="" />
                                </figure>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 order-sm-0 order-md-1">
                            <div class="content-text">
                                <div class="content-center">
                                    <figure>
                                        <img src={require('../../img/chat.svg')} alt="" />
                                    </figure>
                                    <div class="content-title">
                                        <h3 class="openspace-title">Report Encroachment</h3>
                                        <p class="content-para">Click a photo and submit your report, issue or suggestion on any open space</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- third-row --> */}
                <div class="row-wrap">
                    <div class="row">
                        <div class="col-12 col-md-6 ">
                            <div class="content-text">
                                <div class="content-center">
                                    <figure>
                                        <img src={require('../../img/flag.svg')} alt="" />
                                    </figure>
                                    <div class="content-title">
                                        <h3 class="openspace-title">I support open space</h3>
                                        <p class="content-para">Click a photo and submit your report, issue or suggestion on any open space</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="content-image">
                                <figure>
                                    <img src={require('../../img/support.png')} alt="" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </main> 
        <footer
          className="site-footer pt-150"
          style={{ backgroundImage: `url(${bannerShape})` }}
        >
            <Footer />
            </footer>
        
            </div>
        )
    }
}
export default AboutApp;
