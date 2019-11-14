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
                  <OpenspaceMap />
                  <ReportDetailsCard />
                 
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
