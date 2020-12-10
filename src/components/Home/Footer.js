import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import { Link } from 'react-router-dom'
import appstore from "../../img/appstore.png";
import googleplay from "../../img/googleplay.png";
import Axios from "axios";
import { connect } from 'react-redux';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactInfo: ""
        };
    }

    componentDidMount() {
        Axios.get(`${process.env.BASE_URL_API}/contact/`).then(res => {
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
                        <h3 className="openspace-title">{this.props.language == "0" ? "find nearby open spaces" : "नजिकै खुला ठाउँहरू खोज्नुहोस् "}</h3>
                        <Link to="/openspace"><button className="openspace-button" role="button">
                            {this.props.language == "0" ? "find open space" : "खुला स्थान खोज्नुहोस् "}

                        </button> </Link>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="footer-widget about-widget">
                                    <h5>{this.props.language == "0" ? 'About' : "बारेमा"}</h5>
                                    <p>
                                        {this.state.contactInfo && this.props.language == '0' ?
                                            this.state.contactInfo[0].description : this.state.contactInfo && this.state.contactInfo[0].description_nep}
                                    </p>

                                    <div className="copyright">

                                        {
                                            this.props.language == "0" ? <p>
                                                Copyright © 2019. <a href="#">Humanitarion Open Space portal.</a> <br />All
                      rights reserved.<br />

                      Designed by <a href="http://naxa.com.np">NAXA.</a>

                                            </p>
                                                :
                                                <p>
                                                    प्रतिलिपि अधिकार © २०१९  <a href="#"> ह्यूमानिटेरियन खुला स्पेस पोर्टल।</a> <br />सबै अधिकार सुरक्षित। <br />
                                                    <a href="http://naxa.com.np">NAXA</a> द्वारा डिजाइन गरिएको।


                    </p>

                                        }
                                     {/* {  this.props.language == "0" ? ( */}
                                     <p>Read <Link to='/privacy-policy'>Privacy and Policies.</Link></p>
                                     {/* )
                                     :
                                    // <p><Link to='/privacy-policy'>गोपनीयता र नीति</Link></p>   */}
                                    {/* } */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="footer-widget contact-widget">
                                    <h5>{this.props.language == "0" ? 'Contact ' : 'सम्पर्क'}</h5>
                                    <ul>
                                        <li>
                                            <i className="humanitarian-icon-Location"></i>
                                            <span>
                                                {this.state.contactInfo && this.props.language == '0' ?
                                                    this.state.contactInfo[0].title
                                                    : this.state.contactInfo && this.state.contactInfo[0].title_nep
                                                } <br />
                                                {this.state.contactInfo && this.props.language == '0' ?
                                                    this.state.contactInfo[0].location :
                                                    this.state.contactInfo && this.state.contactInfo[0].location_nep}
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
                                    <h5>{this.props.language == "0" ? "download now" : "डाउनलोड गर्नुहोस्"}</h5>
                                    <div className="apps flex-start">
                                        <figure>
                                            <img src={appstore} alt="Ios" />
                                        </figure>
                                        <figure>
                                            <img src={googleplay} alt="Android" />
                                        </figure>
                                    </div>

                                    <ul>
                                        <span className="list-title">{this.props.language == "0" ? "Useful Links" : "उपयोगी लिङ्कहरू"}</span>
                                        <li>
                                            <a href="http://www.mofaga.gov.np/" target="blank">{this.props.language == "0" ? "mofaga" : "सङ्‍घीय मामिला तथा सामान्य प्रशासन मन्त्रालय"}</a>
                                        </li>
                                        <li>
                                            <a href="http://www.moha.gov.np/" target="blank">{this.props.language == "0" ? "moha" : "गृह मन्त्रालय"}</a>
                                        </li>
                                        <li>
                                            <a href="https://www.facebook.com/NDRRMA/" target="blank">{this.props.language == "0" ? "nddrma" : "राष्ट्रिय विपद जोखिम न्यूनिकरण तथा व्यवस्थापन प्राधिकरण"}</a>
                                        </li>
                                        <li>
                                            <a href="http://www.bipad.gov.np/" target="blank">{this.props.language == "0" ? "bipad" : "बिपद"}</a>
                                        </li>
                                        {/* <li>
                      <a href="#">moha</a>
                    </li> */}
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

const mapStateToProps = state => {
    return {
        language: state.language
    };
};


export default connect(mapStateToProps)(Footer);
