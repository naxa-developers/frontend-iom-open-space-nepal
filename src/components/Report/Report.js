import React, { Component } from 'react'
import Navbar from '../Home/Navbar';
import ReportMap from './ReportMap';
import ReportSidebar from './ReportSidebar'
import OpenspaceMap from '../OpenSpace/OpenspaceMap'

class Report extends Component {
  
    render() {
        return (
            <>
            <Navbar />
            <main class="main-content">
          <section class="openSpace-map">
            <div class="container-fluid">
              <div class="map-wrapper">
              <div className="row no-gutters">
                  <div className="col-md-7">
                  <OpenspaceMap/>
                  </div>
                  <div className="col-md-5">
                  <ReportSidebar/>
                  </div>
                </div>
               
              
                
              </div>
              
            </div>
          </section>
        </main>
            </>
        )
    }
}
export default Report;
