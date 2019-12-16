import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import {Link } from 'react-router-dom'




import appstore from "../../img/appstore.png";
import googleplay from "../../img/googleplay.png";
import Axios from "axios";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contactInfo: ""
    };
  }

  componentDidMount() {
    Axios.get(`https://iomapi.naxa.com.np/api/v1/contact/`).then(res => {
      this.setState({
        contactInfo: res.data
      });
    
    });
  }
  render() {
    return (
      <>
        <div className="footer-top">
          <div className="container">
            <h3 className="openspace-title">find nearby open spaces</h3>
            <Link to="/openspace"><button className="openspace-button" role="button">
              find open space
            </button> </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="footer-widget about-widget">
                <h5>About</h5>
                  <p>
                    {this.state.contactInfo &&
                      this.state.contactInfo[0].description}
                  </p>

                  <div className="copyright">
                    <p>
                      Copyright © 2019. <a href="#">Humanitarion Open Space portal.</a> <br/>All
                      rights reserved.<br />
                      Designed by <a href="http://naxa.com.np">NAXA.</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="footer-widget contact-widget">
                  <h5>Contact</h5>
                  <ul>
                    <li>
                      <i className="humanitarian-icon-Location"></i>
                      <span>
                        {this.state.contactInfo &&
                          this.state.contactInfo[0].title} <br/>
                        {this.state.contactInfo &&
                          this.state.contactInfo[0].location}
                      </span>
                    </li>

                    <li>
                      <i className="humanitarian-icon-Fax"></i>
                      <span>
                        
                        {this.state.contactInfo &&
                          this.state.contactInfo[0].num1}
                      </span>
                    </li>
                    <li>
                      <i className="material-icons">call</i>
                      <span>
                        
                        {this.state.contactInfo &&
                          this.state.contactInfo[0].num2}
                      </span>
                    </li>
                    <li>
                      <i className="humanitarian-icon-E-mail"></i>
                      <span>
                        {this.state.contactInfo &&
                          this.state.contactInfo[0].email}
                      </span>
                    </li>
                    <MaterialIcon />
                  </ul>
                </div>
              </div>
              <div className="col-md-4">
                <div className="footer-widget app-widget">
                  <h5>download now</h5>
                  <div className="apps flex-start">
                    <figure>
                      <img src={appstore} alt="Ios" />
                    </figure>
                    <figure>
                      <img src={googleplay} alt="Android" />
                    </figure>
                  </div>
                 
                  <ul>
                    <span class="list-title">Useful Links</span>
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
    );
  }
}

export default Footer;
