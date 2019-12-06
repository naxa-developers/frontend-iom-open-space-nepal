import React, { Component } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';

import AssementList from '../OpenSpaceDetails/ModalComponent/AssementList'
import Service from './Service';

class GeneralInfo extends Component {
  


    render() {
        var usable_perc = (this.props.usable_area/this.props.total_area)*100;
        var actual_perc = usable_perc.toFixed(1) ;
        var width_perc = actual_perc+ '%'; 

   
        
        return (
            <div className="general-info">
                <div className="general-overview flex-between">
                    <div className="overview-item">
                        <h6>{this.props.capacity}</h6>
                        <p>Capacity</p>
                    </div>
                    <div className="overview-item">
                        <h6>{this.props.total_area} <sub>sq.m</sub></h6>
                        <p>Total Area</p>
                    </div>
                    <div className="overview-item">
                        <h6>{this.props.usable_area} <sub>sq.m</sub></h6>
                        <p>Usable Area</p>
                    </div>
                </div>
                <div className="space-chart">
                    <div className="chart-legend flex-start">
                        <div className="legend-list ">
                            <div className="symbol-content flex-start">
                                <span className="usable-symbol symbol"></span>
                                <span>Usable Area</span>
                            </div>

        <span className="usable-percent">{actual_perc}%</span>
                        </div>
                        <div className="legend-list ">
                            <div className="symbol-content flex-start">
                                <span className="unusable-symbol symbol"></span>
                                <span>Non Usable Area</span>
                            </div>

        <span className="usable-percent">{(100-actual_perc).toFixed(1)} %</span>
                        </div>
                    </div>
                    <div className="chart-wrapper flex-start">
                        <div className="chart-item non-usable">
                            <div className="chart-item usable" style={{width: width_perc}}>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="suggested-content my-5">
                    <h5>Suggested Use</h5>
                   
                    <div className="suggested-list ">
                        {this.props.suggested_use && this.props.suggested_use.map((use) => {
                           
                            
                            return (
                                <ul>
                                    
                      
                                    <li>    <img src ={use.suggested_use.icon} style={{height:30, width:"auto"}}  ></img>  {use.suggested_use.name}  </li>
                                </ul>
                            )
                        })}

                    </div>
                    <div className="suggested-list ">
                        {this.props.services && this.props.services.map((service) => {
                            return (
                                <ul>
                                   
                                        <Service name = {service.name} desc={service.description}  />
                                   
                                </ul>
                            )
                        })}

                    </div>
                    <p>
                    <span>
                    {/* <LinesEllipsis
  text="During construction, young players were intended be the primary beneficiaries of the new facilities. At the time, the national association had already set up seven academies (for U-19, U-14, U-12 and U-10 players) with their activities thus far having centered on the Nepalese capital, Kathmandu. The new regional centers allowed the project to be extended across the nation. The national association's headquarters in Kathmandu, with its technical centre, playing field and player accommodation, was opened early in 2000 by the President of the Asian Football Confederation, Mohammed Bin Hammam."
  maxLine='4'
  ellipsis='...'
  trimRight
  basedOn='letters'
/> */}
{this.props.description}

                        </span>
                   
                    </p>
                </div>
                <AssementList className="toggleModal" question_data ={this.props.question_data}/>
            </div>
        )
    }
}

export default GeneralInfo;