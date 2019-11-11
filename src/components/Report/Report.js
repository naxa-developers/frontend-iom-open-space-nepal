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
                {/* <ReportMap /> */}
                <OpenspaceMap/>
                <ReportSidebar/>
              </div>
              
            </div>
          </section>
        </main>
            </>
        )
    }
}
export default Report;
