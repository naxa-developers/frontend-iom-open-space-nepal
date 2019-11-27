import React, { Component } from "react";
import Navbar from "../../Home/Navbar";
import ReportMap from '../ReportMap'
import ReportDetailsCard from "./ReportDetailsCard";

class ReportDetails extends Component {
  render() {
    this.props.reportID&&console.log("pid",this.props.reportID);
    
    return (
      <div>
        <>
          <Navbar />
          <main class="main-content">
            <section class="openSpace-map">
              <div class="container-fluid">
                <div class="map-wrapper">
                <div className="row no-gutters">
                  <div className="col-md-7">
                  <ReportMap />
                  </div>
                  <div className="col-md-5">
                  <ReportDetailsCard />
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
