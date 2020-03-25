import React, { Component } from 'react';
import Navbar from '../Home/NavbarLayout';
import Footer from '../Home/Footer';
import Openspace from '../Home/OpenSpace'
import { Row, Col, Tab, Nav } from 'react-bootstrap'

import Icon5 from '../../img/Icons5.png'
import Icon1 from '../../img/Icons1.png'
import Icon3 from '../../img/Icons3.png'
import Icon2 from '../../img/Icons2.png'
import Line from '../../img/Line.png'
import bannerShape from '../../img/banner-shape.png'
import { connect } from 'react-redux';
import aboutBg from '../../img/About-bg.png'
import logo from '../../img/header-logo.png'

 class About extends Component {
    render() {
        return (
            <>
                <Navbar />
          <section className="banner about-banner" style={{backgroundImage:`url(${aboutBg})`}}>
            <div className="banner-wrap">
                <div className="banner-image">
                    <img src={logo} alt="" />
                </div>
                <div className="banner-para">
                    <p className="banner-title">
                        Open spaces are identified and mapped with the aim to strengthen emergency preparedness and to provide the initial response planning framework for the local governments and partner agencies to be able to have a starting point from which to provide life-saving assistance to those in immediate need including the displaced population. 
                    </p>
                    <p className="about-body">
                        The importance of identification and mapping of open spaces for preparedness and risk reduction is also reflected in the National Policy for Disaster Risk Reduction 2018 for Nepal.
                    </p>
                </div>
            </div>
        </section>
              
        <section className="about-content pdt-130 pdb-130">
            <div className="container">
                <div className="content-top">
                    <div className="row">
                        <div className="col-md-4">
                            <h3 className="openspace-title">OPEN SPACES SELECTION CRITERIA</h3>
                        </div>
                        <div className="col-md-8">
                            <div className="para about-body">
                                <p>Open spaces for humanitarian purposes are selected in consultation with a multitude of stakeholders including local communities, humanitarian agencies, local disaster risk management committees, ward presidents and security forces, among others.</p>
                                <p> Open spaces failing to meet the below criteria may cause further distress to the disaster affected and displaced populations. Identification of flat and large open spaces in the hilly terrain of Nepal is in itself a challenge. However, the following criteria are considered for identifying open spaces for humanitarian purposes and providing refuge to displaced populations.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-bottom">
                    <div className="row">
                        <div className="col-md-4">
                           <div className="list-wrapper">
                               <ul className="about-h4">
                                   <li><span className="about-span">01</span><a href="#">Accessibility</a></li>
                                   <li><span className="about-span">02</span><a href="#">Security</a></li>
                                   <li><span className="about-span">03</span><a href="#">Access to resources and water</a></li>
                                   <li><span className="about-span">04</span><a href="#">Land availability and topography</a></li>
                                   <li><span className="about-span">05</span><a href="#">Environmental concerns</a></li>
                                   <li><span className="about-span">06</span><a href="#">Size</a></li>
                               </ul>
                           </div>
                        </div>
                        <div className="col-md-8">
                            <div className="list-wrapper-info">
                                <ul className="about-body">
                                    <li><i className="material-icons success">check_circle</i>Accessibility is a critical factor for open space identification. Some open spaces have restricted road access which impacts the establishment of camps, movement of IDPs to the camps, ensuring food supplies and other camp necessities. Therefore, it is critical in the selection phase that the accessibility of the open spaces in all seasons is considered.</li>
                                    <li><i className="material-icons success">check_circle</i>The mobility of displaced populations, supply of goods and services, access to critical services (such as hospitals, markets, schools) in the surroundings are ensured while selecting an open space.</li>
                                    <li><i className="material-icons success">check_circle</i>Access to livelihoods is also considered for open spaces identification.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="about-procedure pdt-130 pdb-130">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="about-left">
                            <h3 className="openspace-title">Open Space Identification Process</h3>
                            <p className="about-body">The open spaces were identified and selected through a 5-step methodology that is built upon the inputs from local governments, humanitarian agencies as well as community members. This methodology ensures the actual usability of the open spaces.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="about-right">
                            <div className="blocks">
                                <div className="block-icons"style={{backgroundImage:`url(${Icon2})`}}>
                                    {/* <!-- <div className="icon-image"><img className="icons" src="./images/Icons1.png" alt=""></div> --> */}
                                    <img src={Line} alt="" />
                                </div>
                                <div className="block-steps">
                                    <span className="about-span">Step 1</span>
                                    <h4 className="about-h4">Preparatory Phase</h4>
                                    <ul className="steps-list about-body">
                                        <li><i className="material-icons success">check_circle</i><span>Conduct desk study and literature review</span></li>
                                        <li><i className="material-icons success">check_circle</i><span>Collect relevant datasets</span></li>
                                        <li><i className="material-icons success">check_circle</i><span>Finalize criteria for open space identification</span></li>
                                        <li><i className="material-icons success">check_circle</i><span>Prepare detailed work plan</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="blocks">
                                <div className="block-icons"style={{backgroundImage:`url(${Icon5})`}}>
                                    <img src={Line} alt="" />
                                </div>
                                <div className="block-steps">
                                    <span className="about-span">Step 2</span>
                                    <h4 className="about-h4">Identification of Open Spaces</h4>
                                    <ul className="steps-list about-body">
                                        <li><i className="material-icons success">check_circle</i><span>Preliminary listing by local representatives</span></li>
                                        <li><i className="material-icons success">check_circle</i><span>Sensitization workshop on open spaces mapping </span></li>
                                        <li><i className="material-icons success">check_circle</i><span>Open spaces finalization as per standards</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="blocks">
                                <div className="block-icons" style={{backgroundImage:`url(${Icon1})`}}>
                                    <img src={Line} alt="" />
                                </div>
                                <div className="block-steps">
                                    <span className="about-span">Step 3</span>
                                    <h4 className="about-h4">Field Survey and Data Collection</h4>
                                    <ul className="steps-list about-body">
                                        <li><i className="material-icons success">check_circle</i><span>Secure drone flight permissions</span></li>
                                        <li><i className="material-icons success">check_circle</i> <span>Field observations and aerial survey</span></li>
                                        <li><i className="material-icons success">check_circle</i><span>Critical facilities mapping</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="blocks">
                                <div className="block-icons" style={{backgroundImage:`url(${Icon3})`}}>
                                    <img src={Line} alt="" />
                                </div>
                                <div className="block-steps">
                                    <span className="about-span">Step 4</span>
                                    <h4 className="about-h4">Data processing and GIS Mapping</h4>
                                    <ul className="steps-list about-body">
                                        <li><i className="material-icons success">check_circle</i><span>Data processing and Geodatabase preparation</span></li>
                                        <li><i className="material-icons success">check_circle</i><span>Detailed topographical mapping </span></li>
                                        <li><i className="material-icons success">check_circle</i><span>GIS maps and open space map atlas</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="blocks">
                                <div className="block-icons" style={{ backgroundImage: `url(${Icon2})` }}>
                                </div>
                                <div className="block-steps">
                                    <span className="about-span">Step 5</span>
                                    <h4 className="about-h4">Output Validation, Finalization and Dissemination</h4>
                                    <ul className="steps-list about-body">
                                        <li><i className="material-icons success">check_circle</i><span>Incorporate feedback from local government and stakeholders</span></li>
                                        <li><i className="material-icons success">check_circle</i><span>Finalize maps and outputs </span></li>
                                        <li><i className="material-icons success">check_circle</i><span>Organize dissemination workshop </span></li>
                                        <li><i className="material-icons success">check_circle</i><span>Integrate data into digital portals</span></li>
                                        <li><i className="material-icons success">check_circle</i><span>Submit final deliverables</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
                
                <footer
                    classNameName="site-footer pt-150"
                    style={{ backgroundImage: `url(${bannerShape})` }}
                >
                    <Footer />
                </footer>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
      language: state.language
    };
  };
  
  export default connect(mapStateToProps)(About);