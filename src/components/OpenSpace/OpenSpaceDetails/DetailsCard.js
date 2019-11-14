import React, { Component } from 'react'
import DetailsHeader from './DetailsHeader'
import TabNavbar from './TabNavbar'
import GeneralInfo from './GeneralInfo'
import ReportTab from './ReportTab'
import NearbyTab from './NearbyTab'
import MaterialIcon from 'material-icons-react';


class DetailsCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabid: 1
        }
    }

    onload = () => {
        var windowHeight = window.innerHeight;
        console.log(windowHeight);
        var navHeight = document.getElementsByClassName('site-header')[0].clientHeight;
        console.log(navHeight);
        document.getElementsByClassName('sidebar-wrapper')[0].style.height = `${windowHeight - navHeight}px`


    }
    componentDidMount() {
        this.onload();
    }
    changetabid = (e) => {
        this.setState({tabid:e})

    }

    render() {
        return (
            <div>
                <div className="map-sidebar">
                    <span className="sidebar-toggle" >
                        <MaterialIcon icon="keyboard_arrow_right"></MaterialIcon>
                    </span>
                    <div className="sidebar-wrapper">
                        <span className="sidebar-close material-icons">close</span>
                        <div className="card">
                            <div className="card-body">
                                <DetailsHeader />
                                <TabNavbar tabid={this.state.tabid} changetabid={this.changetabid} />



                                <div className="tab-wrapper">
                                    <div className="tab-content" id="myTabContent">
                                        <div className={this.state.tabid == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="general" role="tabpanel"
                                            aria-labelledby="general_tab">
                                            <GeneralInfo />
                                        </div>
                                        <div className={this.state.tabid == 2 ? "tab-pane fade show active" : "tab-pane fade"} id="images" role="tabpanel"
                                            aria-labelledby="images_tab">
                                            <h2>khali</h2>

                                        </div>
                                        <div className={this.state.tabid == 3 ? "tab-pane fade show active" : "tab-pane fade"} id="reports" role="tabpanel"
                                            aria-labelledby="report_tab">
                                            <ReportTab />
                                        </div>
                                        <div className={this.state.tabid == 4 ? "tab-pane fade show active" : "tab-pane fade"} id="nearby" role="tabpanel"
                                            aria-labelledby="nearby_tab">
                                            <div id="accordion" className="accordion map-accordion">
                                                <NearbyTab />


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
