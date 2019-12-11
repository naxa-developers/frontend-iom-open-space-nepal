import React, { Component, createRef } from "react";
import Navbar from "../../Home/Navbar";
import ReportDetailsCard from "./ReportDetailsCard";

import RDetailsMap from "./RDetailsMap";


class ReportDetails extends Component {

  
  render() {

    
    
    return (
      <div>
        <>
          <Navbar />
          <main class="main-content">
            <section class="openSpace-map">
              <div class="container-fluid">
                <div class="map-wrapper">
                <div className="row no-gutters">
                  <div className="col-md-8">
                  <RDetailsMap />
                  </div>
                  <div className="col-md-4">
                  <ReportDetailsCard daysCount ={this.props.daysCount}/>
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


export default ReportDetails;
