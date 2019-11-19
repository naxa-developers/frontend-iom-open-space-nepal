import React, { Component } from "react";
import Navbar from "../../Home/Navbar";
import OpenspaceMap from '../../OpenSpace/OpenspaceMap';
import ReportDetailsCard from "./ReportDetailsCard";

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
                  <div className="col-md-7">
                  <OpenspaceMap />
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
