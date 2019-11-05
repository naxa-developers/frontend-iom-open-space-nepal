import React, { Component } from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';

import logo from '../../img/logo.png';
import gov from '../../img/gov.png';
import iom from '../../img/iom.png';
import ccm from '../../img/ccm.png';
import appstore from '../../img/appstore.png'
import googleplay from '../../img/googleplay.png'


 class Footer extends Component {
    render() {
        return (
     <>
              <div className="footer-top">
            <div className="container">
                <h3 className="openspace-title">find nearby open spaces</h3>
                <button className="openspace-button" role="button">
                    find open space
                </button>
            </div>
        </div>
        <div className="footer-bottom mt-150">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="footer-widget about-widget">
                            <figure className="footer-logo">
                                <img src={logo} alt="footer-logo" />
                            </figure>
                            <div className="footer-logos">
                                <figure>
                                    <img src={gov} alt="government" />
                                </figure>
                                <figure>
                                    <img src={iom} alt="IOM" />
                                </figure>
                                <figure>
                                    <img src={ccm}alt="CCM" />
                                </figure>
                            </div>
                            <div className="copyright">
                                <p>Copyright © 2019. <a href="#">Open Space Nepal</a> All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="footer-widget contact-widget">
                            <h5>Contact</h5>
                            <ul>
                                <li><i className="humanitarian-icon-Location"></i><span>International Immigration
                                        Organization (IOM)
                                        7/1 Thirbaum Road, Baluwatar-1
                                        P.O. Box: 25503, Kathmandu, Nepal</span></li>
                                       
                                <li><i className="material-icons">fax</i><span>+977 1 442 62 50</span></li>
                                <li><i className="material-icons">call</i><span>+977 1 442 62 50</span></li>
                                <li><i className="material-icons">email</i><span>iomnepal@iom.int</span></li>
                                <MaterialIcon />
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="footer-widget app-widget">
                            <h5>Available</h5>
                            <div className="apps flex-start">
                                <figure>
                                    <img src={appstore} alt="Ios" />
                                </figure>
                                <figure>
                                    <img src={googleplay} alt="Android" />
                                </figure>
                            </div>
                            <ul>
                                <li>
                                    <a href="#">Mofaga</a>
                                </li>
                                <li>
                                    <a href="#">Moha</a>
                                </li>
                                <li>
                                    <a href="#">MOfaga</a>
                                </li>
                                <li>
                                    <a href="#">moha</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
 
     </>           
        )
    }
}

export default Footer;
