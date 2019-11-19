import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';


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
                            <p>This portal contains location based information and attribute details of open spaces from different locations of Nepal. All the open spaces datasets were prepared by IOM in different time in direct coordination and consultation with local governments and relevant line ministries.</p>
                         
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
                                        Organization (IOM) <br />
                                        7/1 Thirbaum Road, Baluwatar-1 <br />
                                        P.O. Box: 25503, Kathmandu, Nepal</span></li>
                                       
                                <li><i className="humanitarian-icon-Fax"></i><span>+977 1 442 62 50</span></li>
                                <li><i className="material-icons">call</i><span>+977 1 442 62 50</span></li>
                                <li><i className="humanitarian-icon-E-mail"></i><span>iomnepal@iom.int</span></li>
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
