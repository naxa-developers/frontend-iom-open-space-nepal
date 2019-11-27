import React, { Component,createRef } from "react";
import Navbar from '../Home/Navbar';
// import ReportMap from './ReportMap';
import ReportSidebar from './ReportSidebar'


class Report extends Component {
  constructor(props) {
    super(props)
    this.mapR=createRef();
   
  }
  // componentDidMount() {
  //   var map=this.mapRef.current.leafletElement;
  // }
  
  
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
                  <ReportMap mapR= {this.mapR}/>
                  </div>
                  <div className="col-md-5">
                  <ReportSidebar  mapR= {this.mapR} />
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
