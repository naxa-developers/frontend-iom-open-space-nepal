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
        axios.get(`https://iomapi.naxa.com.np/api/v1/about_why_map_open_icon/`)
        .then( res => {
            const steps = res.data;
            this.setState({ steps: steps });
            
        })
        axios.get(`https://iomapi.naxa.com.np/api/v1/about_why_map_open_space/`)
        .then( res => {
            const data = res.data;
            this.setState({ data: data });
            
        })

    }
    render() {
 
        return (

       
                <section className="process ptb-150">
            <div className="container">
                <div className="row">
                    <div className="col-md-6" >
                        {/* <div className="process-left sticky"> */}
                      <div className="process-left">
                            <h3 className="openspace-title">{this.props.language=='0'? this.state.data&&this.state.data[0].title: this.state.data[0].title_nep}</h3>
        <p>{this.props.language=='0'? this.state.data&&this.state.data[0].description: this.state.data&&this.state.data[0].description_nep }</p>
                        </div>
                         {/* <div className="process-left">
                            <h3 className="openspace-title">WHY MAP OPEN SPACES ? </h3>
        <p>One of the lessons learned from past disasters is the vital role of pre- 
identified open spaces that can be utilized for safe and secure refuge and 
relief distribution during and after disasters. Other core services that can 
be provided and utilized in open spaces include: 
</p>
                        </div> */}
                     
                    </div>
                    <div className="col-md-6">
                  

                        <div className="process-content">
                         { this.state.steps&&this.state.steps.map( (step,i) => 
                    
                            <IdentificationCard key= {step.id} no ={i} image = {step.icon_class} title = {step.description} title_nep = {step.description_nep}/>
                            )} 
                            
                                  {/* {/* <div class="post-meta">
                                <i class="humanitarian-icon-Location"></i>
                                <h5>Safe refuge for the most vulnerable displaced populations </h5>
                            </div>
                            <div class="post-meta">
                                <i class="humanitarian-icon-Health"></i>
                                <h5>Medical and health care facilities</h5>
                            </div> */}
                          
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
