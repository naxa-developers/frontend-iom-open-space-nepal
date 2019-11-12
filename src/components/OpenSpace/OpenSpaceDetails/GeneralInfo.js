import React, { Component } from 'react'

 class GeneralInfo extends Component {
    render() {
        return (
            <div className="general-info">
            <div className="general-overview flex-between">
                <div className="overview-item">
                    <h6>40212</h6>
                    <p>Capacity</p>
                </div>
                <div className="overview-item">
                    <h6>176,853 <sub>sq.m</sub></h6>
                    <p>Total Area</p>
                </div>
                <div className="overview-item">
                    <h6>140,742.9<sub>sq.m</sub></h6>
                    <p>Usable Area</p>
                </div>
            </div>
            <div className="space-chart">
                <div className="chart-legend flex-start">
                    <div className="legend-list flex-start">
                        <span className="usable-symbol symbol"></span> <span>Usable
                            Area</span>
                    </div>
                    <div className="legend-list flex-start">
                        <span className="unusable-symbol symbol"></span> <span>Non
                            Usable Area</span>
                    </div>
                </div>
                <div className="chart-wrapper flex-start">
                    <div className="chart-item usable">
                        <span className="usable-percent">60%</span>

                    </div>
                    <div className="chart-item non-usable">
                        <span className="usable-percent">40%</span>
                    </div>
                </div>
            </div>
            <div className="suggested-content my-5">
                <h5>Suggested Use</h5>
                <div className="suggested-list">

                    <ul>
                        <li>
                            <i
                                className="humanitarian-icon-Camp-Coordination-and-Camp-Management humanitarian-icons"></i>
                            <span>Camp</span></li>
                        <li>
                            <i
                                className="humanitarian-icon-Helipad humanitarian-icons"></i>
                            <span> Helipad</span>
                        </li>
                        <li>
                            <i
                                className="humanitarian-icon-Building-facility-not-affected humanitarian-icons"></i>
                            <span>civil Mall coordination</span>
                        </li>
                        <li>
                            <i
                                className="humanitarian-icon-Medicine humanitarian-icons"></i>
                            <span> medical assistance area</span>
                        </li>
                        <li>
                            <i
                                className="humanitarian-icon-Population-return humanitarian-icons"></i>
                            <span>vulnerable population assistance area</span>
                        </li>
                    </ul>
                </div>
                <div className="suggested-list ">

                    <ul>
                        <li>
                            <i
                                className="humanitarian-icon-Internet humanitarian-icons"></i>
                            <span>Wifi</span>
                            <i className="material-icons check">check_circle</i>
                        </li>

                        <li>
                            <i
                                className="humanitarian-icon-Potable-water-source humanitarian-icons"></i>
                            <span> drinking water</span>
                            <i className="material-icons check">check_circle</i>
                        </li>
                        <li>
                            <i
                                className="humanitarian-icon-Innovation humanitarian-icons"></i>
                            <span>Electricity</span>
                            <i className="material-icons check">check_circle</i>
                        </li>
                        <li>
                            <i
                                className="humanitarian-icon-Toilet humanitarian-icons"></i>
                            <span> Drainage</span>
                            <i className="material-icons cross">cancel</i>
                        </li>
                    </ul>
                </div>
                <p>
                    <span>Ratnapark and Tundikhel and is a likely rallying point
                        for
                        IDP. It extends in an area of 177,241.96 sq. m out of
                        which
                        140742.94 is found to be usable. The site is under the
                        ownership of Kathmandu Metropolitan City Ratnapark and
                        Tundikhel and is a likely rallying point
                        for IDP.</span>
                    <a href="#">more</a>
                </p>
            </div>
            <div className="assessment-list">
                <ul>
                    <li data-toggle="modal" data-target="#assessment-popup">
                        General Information Assessment
                        <i className="material-icons">chevron_right</i>
                    </li>
                    <li data-toggle="modal" data-target="#assessment-popup">
                        General Environment Assessment
                        <i className="material-icons">chevron_right</i>
                    </li>
                </ul>

            </div>
        </div>
        )
    }
}

export default GeneralInfo;