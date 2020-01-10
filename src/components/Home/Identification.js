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

            <div>
                <section className="process ptb-150">
            <div className="container">
                <div className="row">
                    <div className="col-md-6" >
                        <div className="process-left sticky">
                            <h3 className="openspace-title">Open space indentification process</h3>
        <p>{this.props.language=='0'? this.state.data&&this.state.data[0].description: this.state.data&&this.state.data[0].description_nep }</p>
                        </div>
                     
                    </div>
                    <div className="col-md-6">
                  

                        <div className="process-content">
                         { this.state.steps&&this.state.steps.map( (step,i) => 
                       
                            <IdentificationCard key= {step.id} no ={i} image = {step.image} title = {step.title} title_nep = {step.title_nep}/>
                            )} 
                           
                         
                        </div>
                    </div>
                </div>
            </div>
        </section>
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
         language: state.language
     }
  }

export default connect(mapStateToProps)(Identification);
