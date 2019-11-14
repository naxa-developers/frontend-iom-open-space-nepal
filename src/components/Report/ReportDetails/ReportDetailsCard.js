import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import Attach from '../../../img/attach.jpg'

class ReportDetailsCard extends Component {
    render() {
        return (
            <div className="map-sidebar">
                        <span className="sidebar-toggle">
                        <MaterialIcon icon="keyboard_arrow_right"></MaterialIcon>
                        </span>
                        <div className="sidebar-wrapper">
                            <span className="sidebar-close material-icons">close</span>
                            <div className="card">
                                <div className="card-body">
                                    <div className="report-details">

                                        <div className="report-details-heading">
                                            <h5>Increasing theft and fraud <i className="material-icons pending"
                                                    data-toggle="tooltip" data-placement="top" title="Pending">timer</i>
                                            </h5>
                                            <div className="report-content">
                                                <div className="report-address ">
                                                    <p className="flex-start loc-time"><a href="#">ratna park</a><time>2
                                                            days ago</time></p>
                                                    <p className="flex-start address"><i
                                                            className="material-icons">room</i><span>Ratna Park, Kathmandu
                                                            44600</span></p>
                                                </div>
                                                <div className="report-status">
                                                    <label className="unsuccess">high</label>
                                                    <span>Urgency</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="report-email">
                                            <span>Hello,</span>
                                            <p>Ratnapark is located centrally in Kathmandu,
                                                incorporates Ratnapark and Tundikhel and is a likely rallying point for
                                                IDP. It extends in an area of 177,241.96 sq. m out of which 140742.94 is
                                                found to be usable. The site is under the ownership of Kathmandu
                                                Metropolitan City.
                                            </p>
                                            <div className="reporter">
                                                <span>Regards</span>
                                                <h6>Suresh Khanal</h6>
                                            </div>

                                        </div>
                                        <div className="attached">
                                            <h5><i className="material-icons">attachment</i> attachment</h5>
                                            <figure>
                                                <img src={Attach} alt="attach" />
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        )
    }
}
export default ReportDetailsCard;
