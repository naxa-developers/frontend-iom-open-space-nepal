import React, { Component } from 'react';
import axios from 'axios';
import {connect } from 'react-redux';

import IdentificationCard from './IdentificationCard';

class Identification extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             steps: null,
             data: null
        }
    }
    
    // state = {
    //     steps: []
    // }
    componentDidMount() {
        axios.get(`https://iomapi.naxa.com.np/api/v1/identify_open_space/`)
        .then( res => {
            const steps = res.data;
            this.setState({ steps: steps });
            
        })
        axios.get(`https://iomapi.naxa.com.np/api/v1/open_space_ide/`)
        .then( res => {
            const data = res.data;
            this.setState({ data: data });
            
        })

    }
    render() {
        // console.log("ide",this.state.data);
        
        return (

       
                <section className="process ptb-150">
            <div className="container">
                <div className="row">
                    <div className="col-md-6" >
                        {/* <div className="process-left sticky"> */}
                      <div className="process-left">
                            <h3 className="openspace-title">{this.props.language=='0'? 'Open space indentification process': 'खुल्ला क्षेत्र पहिचान प्रक्रिया'}</h3>
        <p>{this.props.language=='0'? this.state.data&&this.state.data[0].description: this.state.data&&this.state.data[0].description_nep }</p>
                        </div>
                     
                    </div>
                    <div className="col-md-6">
                  

                        <div className="process-content">
                         {/* { this.state.steps&&this.state.steps.map( (step,i) => 
                       
                            <IdentificationCard key= {step.id} no ={i} image = {step.image} title = {step.title} title_nep = {step.title_nep}/>
                            )} 
                            */}
                                  <div class="post-meta">
                                <i class="humanitarian-icon-Location"></i>
                                <h5>Safe refuge for the most vulnerable displaced populations </h5>
                            </div>
                            <div class="post-meta">
                                <i class="humanitarian-icon-Health"></i>
                                <h5>Medical and health care facilities</h5>
                            </div>
                            <div class="post-meta">
                                <i class="humanitarian-icon-Water-Sanitation-and-Hygiene"></i>
                                <h5>Logistical hub for disaster response and relief item distribution</h5>
                            </div>
                            <div class="post-meta">
                                <i class="humanitarian-icon-Kitchen-set"></i>
                                <h5>WASH facilities</h5>
                            </div>
                            <div class="post-meta">
                                <i class="humanitarian-icon-People-with-physical-impairments"></i>
                                <h5>Gender and disability inclusion </h5>
                            </div>
                            <div class="post-meta">
                                <i class="humanitarian-icon-Group"></i>
                                <h5>Community meeting and recreational space during normal (pre-disaster) conditions  </h5>
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

export default connect(mapStateToProps)(Identification);
