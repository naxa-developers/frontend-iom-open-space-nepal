import React, { Component } from 'react';
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-default.css';
import  {connect} from 'react-redux';

import countershape from '../../img/counter-shape.png'


class Glimpse extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             odometerValue: 0
        };
    }
    componentDidMount() {
        this.setState({  odometerValue:600   })
    }
    
    render() {
        const {odometerValue} = this.state;
        return (
            <section className="glimps-counter" style={{backgroundImage: `url(${countershape})`}}>
            <div className="overlay"></div>
            <div className="glimps-wrapper">
                <div className="container">
                    <h3 className="openspace-title">{this.props.language =='0' ? `GLIMPSE OF OPEN SPACES IN NEPAL` : `नेपालको खुल्ला क्षेत्रहरूको झलक` }</h3>
                    
                    <div className="row">
                        <div className="col-md-3 col-space-5">
                            <div className="glimps-count">
                                <h4><Odometer
                                    format= "d"
                                    duration= {500}
                                    value = {odometerValue}
                                /></h4>
                                <h6>{this.props.language =="0" ? `open spaces` : `खुल्ला क्षेत्र` }</h6>
                            </div>
                        </div>
                        <div className="col-md-3 col-space-5">
                            <div className="glimps-count">
                                <h4>13</h4>
                                <h6>{this.props.language =="0" ? `District` : ` जिल्ला` }</h6>
                            </div>
                        </div>
                        <div className="col-md-3 col-space-5">
                            <div className="glimps-count">
                                <h4>13</h4>
                                <h6>{this.props.language =="0" ? `Municipalities` : ` नगरपालिका` }</h6>
                            </div>
                        </div>
                        <div className="col-md-3 col-space-5">
                            <div className="glimps-count">
                                <h4>236,364</h4>
                                <h6>{this.props.language =="0" ? `Total area(sq.m)` : `जम्मा क्षेत्रफल  ` }</h6>
                            </div>
                        </div>
                        <div className="col-md-3 col-space-5">
                            <div className="glimps-count">
                                <h4>105,236</h4>
                                <h6>{this.props.language =="0" ? `Total Capacity` : `जम्मा क्षमता ` }</h6>
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
export default connect(mapStateToProps)(Glimpse);
