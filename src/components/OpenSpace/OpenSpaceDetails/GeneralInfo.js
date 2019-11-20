import React, { Component } from 'react'
import AssementList from './AssementList'

 class GeneralInfo extends Component {
    
     
    render() {
       this.props.services&&console.log("psycho",this.props.services[0].name);
       
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
                    <h6>{this.props.usable_area}<sub>sq.m</sub></h6>
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
        <li>{this.props.suggested_use&&this.props.suggested_use[0].name}</li>
        
                    </ul>
                </div>
                <div className="suggested-list ">
{this.props.services&& this.props.services.map((service) => {
    return(
    <ul>
        
               <li>{service.name}  </li>      
                       </ul>
    )
}) }
                    
                </div>
                <p>
                    {/* <span>""</span>
                    <a href="#">more</a> */}
                </p>
            </div>
                <AssementList className= "toggleModal"/>
        </div>
        )
    }
}

export default GeneralInfo;