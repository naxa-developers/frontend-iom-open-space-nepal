import React, { Component } from "react";
import Navbar from "../Home/Navbar";
import OpenspaceMap from './OpenspaceMap';
import Sidebar from './Sidebar';

class Report extends Component {

  render() {
    return (
    <>
        <Navbar />
        <main class="main-content">
          <section class="openSpace-map">
            <div class="container-fluid">
              <div class="map-wrapper">
                <OpenspaceMap />
                <Sidebar/>
              </div>
              
            </div>
          </section>
        </main>
        </>
    );
  }
}
export default Report;
