import React, { Component,createRef } from "react";
import Navbar from "../../Home/Navbar";
import OpenspaceMap from '../OpenspaceMap';
import DetailsCard from './DetailsCard';
import '../OpenSpaceCSS.css';

class OpenSpaceDetails extends Component {
  constructor(props) {
    super(props)
    this.mapRefs=createRef();
    this.state = {
       
    };
  };
  

  render() {
    return (
    <>
        <Navbar />
        <main class="main-content">
          <section class="openSpace-map">
            <div class="container-fluid">
              <div class="map-wrapper">
                <OpenspaceMap />
                <DetailsCard />
              </div>
              
            </div>
          </section>
        </main>
        </>
    );
  }
}
export default OpenSpaceDetails;
