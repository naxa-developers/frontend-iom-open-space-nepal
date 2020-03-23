import React, { Component, createRef } from "react";
import Navbar from "../../Home/NavbarLayout";
import ReportDetailsCard from "./ReportDetailsCard";

import RDetailsMap from "./RDetailsMap";
import {connect} from 'react-redux';


class ReportDetails extends Component {

  
  render() {

    console.log("rd",this.props);
    
    
    return (
      <div>
        <>
          <Navbar nav ={this.props.nav} />
          <main class="main-content">
            <section class="openSpace-map">
              <div class="container-fluid">
                <div class="map-wrapper">
                <div className="row no-gutters">
                  <div className="col-md-7 col-lg-8">
                  <RDetailsMap />
                  </div>
                  <div className="col-md-5 col-lg-4">
                  <ReportDetailsCard daysCount ={this.props.daysCount} />
                  </div>
                </div>
            
               
                 
                </div>
              </div>
            </section>
          </main>
        </>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
   nav: state.nav
};
}

export default connect(mapStateToProps)(ReportDetails);
