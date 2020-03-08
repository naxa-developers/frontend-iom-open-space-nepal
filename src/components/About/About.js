import React, { Component } from 'react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import Openspace from '../Home/OpenSpace'

import one from '../../img/1.png'
import two from '../../img/2.png'
import three from '../../img/3.png'
import four from '../../img/4.png'
import five from '../../img/5.png'
import bannerShape from '../../img/banner-shape.png'

export default class About extends Component {
    render() {
        return (
            <>
            <Navbar />
            <div class="breadcrumb">
            <div class="container">
                <h1>About</h1>
                <p>Open Spaces Mapping for Humanitarian Purposes</p>

            </div>
        </div>
        <main class="main-content">
            <Openspace />
            {/* <section class="video-section ptb-150">
                <div class="container">
                    <div class="video" style="background:url(images/video.jpg)">
                        <div class="overlay"></div>
                        <a class="material-icons" href="">play_circle_filled</a>
                    </div>
                </div>
            </section> */}
            <section class="about-section about-video">
                <div class="container">
                    <div class="title">
                        <h3 class="openspace-title">Why map open spaces ?</h3>
                        <p>There is vital importance of open space areas that can be utilized as safe and secure housing
                            and for relief distribution during and after disastrous events. The identified open spaces
                            can be used not only during disaster but for other humanitarian purposes as well.</p>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-6">
                            <div class="about-item">
                                <figure>
                                    <img src={one} alt="" />
                                </figure>
                                <h4>Safe and secure place that can be used during disaster</h4>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="about-item">
                                <figure>
                                    <img src={two} alt="" />
                                </figure>
                                <h4>Temporary shelter for people affected by disaster</h4>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="about-item">
                                <figure>
                                    <img src={three} alt="" />
                                </figure>
                                <h4>Logistic Hub for retaliation against disaster</h4>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="about-item">
                                <figure>
                                    <img src={four} alt="" />
                                </figure>
                                <h4>Relief distribution and necessary coordination</h4>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="about-item">
                                <figure>
                                    <img src={five} alt="" />
                                </figure>
                                <h4>Cultural and entertainment programs</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="tab-section">
                <div class="container">
                    <div class="title">
                        <h3 class="openspace-title">Open Spaces Selection Criteria</h3>
                        <p>Open spaces for humanitarian purposes are selected in consultation with a multitude of
                            stakeholders including local communities, humanitarian agencies, local disaster risk
                            management committees, ward presidents, security forces among others. Open spaces failing to
                            meet the below criteria may cause further distress to the disaster affected and displaced
                            population. Identification of flat and large open spaces in the hilly terrain of Nepal is
                            itself a challenge however, the following criteria are considered for identifying open
                            spaces for humanitarian purposes and providing refuge to displaced population.
                        </p>
                    </div>
                    <div class="about-tab">
                        <div class="row">
                            <div class="col-md-4">
                                <ul class="tab-list">
                                    <li class="active">
                                        <a href="#"><small>1</small><span>Accessibility </span></a>
                                    </li>
                                    <li>
                                        <a href="#"><small>2</small><span>Security </span></a>
                                    </li>
                                    <li>
                                        <a href="#"><small>3</small><span>Access to resources and water </span></a>
                                    </li>
                                    <li>
                                        <a href="#"><small>4</small><span>Land availability and topography </span></a>
                                    </li>
                                    <li>
                                        <a href="#"><small>5</small><span>Environmental Concerns </span></a>
                                    </li>
                                    <li>
                                        <a href="#"><small>5</small><span>Size </span></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-8">
                                <div class="about-tab-content">
                                    <p>Security is likely to be a key issue in high density camp. Existing security
                                        features are explained as these will assist with open space identification and
                                        camp management.</p>
                                    <ul>
                                        <li>Accessibility is a critical factor for open space identification. Many open
                                            areas have restricted road access which impacts on the establishment of the
                                            camps, movement of IDP to the camps, food supply and other camp necessities
                                        </li>
                                        <li>Extreme climatic conditions. Example: Open spaces at risk of flooding, high
                                            winds or landslides are avoided. Similarly, open spaces with high intensity
                                            electric wires are also avoided. 
                                        </li>
                                        <li>Environmental and health conditions. Example: Health risk typical for the open spaces are assessed example- malaria zones and cholera risk areas are avoided. </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
 </main>
 <footer
          className="site-footer pt-150"
          style={{ backgroundImage: `url(${bannerShape})` }}
        >
          <Footer />
        </footer>
            </>
        )
    }
}
