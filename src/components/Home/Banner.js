import React, { Component } from 'react';
import {connect } from 'react-redux';

import gov from '../../img/gov.png';
import iom from '../../img/iom.png';
import ccm from '../../img/ccm.png';
import Background from "../../img/banner-shape.png";

 class Banner extends Component {
    render() {
        return (
            // style={{backgroundImage: `url(${Background})`}}
            <section className="banner">  
         <div className="banner-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-3">
                        <div className="logos">
                            <figure>
                                <img src={gov} alt="government" />
                            </figure>
                            <figure>
                                <img src={iom} alt="IOM" />
                            </figure>
                            <figure>
                                <img src={ccm} alt="CCM" />
                            </figure>
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-9">
                        <div className="intro">
                            <h1>{this.props.language == '0' ? `Open Space Portal for Humanitarian Assistance` : "मानवीय खुल्ला क्षेत्र  पोर्टलमा स्वागत छ "}</h1>
                            <p> {this.props.language=='0'? `Welcome to the portal developed by the International Organization for Migration, IOM under the leadership of Ministry of Home Affairs (MoHA) and technical support of Naxa
                                Pvt. Ltd. with the objective of identifying open spaces and reducing the losses in times
                                of disaster.`: "अन्तरास्ट्रिय आप्रवासन संगठन (IOM) ले गृह मन्त्रालयको समन्वय तथा नक्सा प्रा. लि. को प्राविधिक सहकार्यमा, खुल्ला स्थान पहिचान गरि विपद्को समयमा हानि कम गर्ने उद्देश्यका साथ, निर्माण गरिएको यस पोर्टलमा  स्वागत छ  ।"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
         language: state.language
     }
  }

  
export default connect(mapStateToProps)(Banner);