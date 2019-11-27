import React, { Component } from 'react'
import AssementList from './AssementList'

class GeneralInfo extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
            usable_perc: null
        }
    }
    
calcPerc =() => {
   var usable_area =  this.props.usable_area&&this.props.usable_area;
    var total_area = this.props.total_area&&this.props.total_area
    console.log("values", usable_area, total_area);
    

     var usable_perc = (usable_area/total_area)*100;
     console.log("use",usable_perc);
     
     this.setState({
         usable_perc: this.usable_perc
      
        
     })
}
// componentDidMount () {
//     this.calcPerc();
// }
    

    render() {
        var usable_perc = Math.round((this.props.usable_area/this.props.total_area)*100);
        var actual_perc = usable_perc + '%';
  
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
                        <div className="legend-list ">
                            <div className="symbol-content flex-start">
                                <span className="usable-symbol symbol"></span>
                                <span>Usable Area</span>
                            </div>

        <span className="usable-percent">{usable_perc}%</span>
                        </div>
                        <div className="legend-list ">
                            <div className="symbol-content flex-start">
                                <span className="unusable-symbol symbol"></span>
                                <span>Non Usable Area</span>
                            </div>

        <span className="usable-percent">{100-usable_perc}%</span>
                        </div>
                    </div>
                    <div className="chart-wrapper flex-start">
                        <div className="chart-item non-usable">
                            <div className="chart-item usable" style={{width: actual_perc}}>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="suggested-content my-5">
                    <h5>Suggested Use</h5>
                    <div className="suggested-list">

                        <ul>
                            {/* <li>{this.props.suggested_use&&this.props.suggested_use[0].name}</li> */}

                        </ul>
                    </div>
                    <div className="suggested-list ">
                        {this.props.suggested_use && this.props.suggested_use.map((use) => {
                            return (
                                <ul>

                                    <li>{use.name}  </li>
                                </ul>
                            )
                        })}

                    </div>
                    <div className="suggested-list ">
                        {this.props.services && this.props.services.map((service) => {
                            return (
                                <ul>

                                    <li>{service.name}  </li>
                                </ul>
                            )
                        })}

                    </div>
                    <p>
                        {/* <span>""</span>
                    <a href="#">more</a> */}
                    </p>
                </div>
                <AssementList className="toggleModal" />
            </div>
        )
    }
}

export default GeneralInfo;