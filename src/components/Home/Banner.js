import React, { Component } from 'react';
import {connect } from 'react-redux';

import gov from '../../img/gov.png';
import iom from '../../img/iom.png';
import ccm from '../../img/ccm.png';
import Background from "../../img/banner-shape.png";
import Axios from 'axios';

 class Banner extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              texts: '',
              loader:false
            
              
         }
     }
     getData() {
       Axios.get(`http://139.59.67.104:8011/api/v1/header/`)
         .then( res => {
             const text = res.data;
             
             this.setState({ 
                 texts: text,
                 loader:true
         
              })
         })
        
     }
     componentDidMount() {
         this.getData();
     
         
     }
    

    render() {
        
     
        return (
           
         <div className="banner-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-3">
                        <div className="logos">
                            <figure>
                                <img src={gov} alt="government" />
                            </figure>
                            <figure>
                                <img src={iom} alt="IOM" />
                            </figure>
                            <figure>
                                <img src={ccm} alt="CCM" />
                            </figure>
                        </div>
                        
                    </div>

                    <div className="col-lg-10 col-md-9">
                        <div className="intro">
                           <h1>OPEN SPACE PORTAL FOR HUMANITARIAN <br /> ASSISTANCE</h1>
                       {/* <h1>{this.props.language == '0' ? this.state.loader && this.state.texts[0].title : this.state.loader && this.state.texts[0].title_nep  }</h1> */}
                        <p>{this.props.language == '0' ? this.state.loader && this.state.texts[0].description : this.state.loader && this.state.texts[0].description_nep}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
         language: state.language
     }
  }

  
export default connect(mapStateToProps)(Banner);