import React, { Component } from "react";
import Navbar from "../Home/Navbar";
import Map from './Map';
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
                <Map />
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
