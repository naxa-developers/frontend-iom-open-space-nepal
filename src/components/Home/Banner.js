import React, { Component } from 'react';
import gov from '../../img/gov.png';
import iom from '../../img/iom.png';
import ccm from '../../img/ccm.png';

 class Banner extends Component {
    render() {
        return (
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
                            <h1>Open Space Portal for Humanitarian Assistance</h1>
                            <p>Welcome to the portal developed by the International Organization for Migration (IOM)
                                under the leadership of Ministry of Home Affairs (MoHA) and technical support of Naxa
                                Pvt. Ltd. with the objective of identifying open spaces and reducing the losses in times
                                of disaster.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default Banner;