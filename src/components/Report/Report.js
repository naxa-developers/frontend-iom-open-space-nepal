import React, { Component } from 'react'
import Navbar from '../Home/Navbar';
import ReportMap from './ReportMap';
import ReportSidebar from './ReportSidebar'


class Report extends Component {
  
    render() {
        return (
            <>
            <Navbar />
            <main className="main-content">
          <section className="openSpace-map">
            <div className="container-fluid">
              <div className="map-wrapper">
              <div className="row no-gutters">
                  <div className="col-md-7">
                  <ReportMap/>
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
