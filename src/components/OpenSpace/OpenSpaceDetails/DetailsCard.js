import React, { Component } from 'react'
import DetailsHeader from './DetailsHeader'
import TabNavbar from './TabNavbar'
import GeneralInfo from './GeneralInfo'
import ReportTab from './ReportTab'
import NearbyTab from './NearbyTab'
import MaterialIcon from 'material-icons-react';


 class DetailsCard extends Component {
    render() {
        return (
            <div>
                 <div className="map-sidebar">
                        <span className="sidebar-toggle">
                            <MaterialIcon className="material-icons">keyboard_arrow_right</MaterialIcon>
                        </span>
                        <div className="sidebar-wrapper">
                            <span className="sidebar-close material-icons">close</span>
                            <div className="card">
                                <div className="card-body">
                                    <DetailsHeader />
                                    <TabNavbar />


                          
                                    <div className="tab-wrapper">
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="general" role="tabpanel"
                                                aria-labelledby="general_tab">
                                                <GeneralInfo />
                                            </div>
                                            <div className="tab-pane fade" id="images" role="tabpanel"
                                                aria-labelledby="images_tab">

                                            </div>
                                            <div className="tab-pane fade" id="reports" role="tabpanel"
                                                aria-labelledby="report_tab">
                                                    <ReportTab />
                                            </div>
                                            <div className="tab-pane fade" id="nearby" role="tabpanel"
                                                aria-labelledby="nearby_tab">
                                                <div id="accordion" className="accordion map-accordion">
                                                    {/* <NearbyTab /> */}
                        

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
        )
    }
}
export default DetailsCard;
