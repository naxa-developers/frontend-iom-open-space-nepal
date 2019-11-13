import React, { Component,createRef } from "react";
import Navbar from "../Home/Navbar";
import OpenspaceMap from './OpenspaceMap';
import Sidebar from './Sidebar';
import L from 'leaflet';
import './OpenSpaceCSS.css';


class OpenSpace extends Component {
  constructor(props) {
    super(props)
    this.mapRefs=createRef();
    this.state = {
       
    };
  };
  
  onclick=()=>{
    console.log(this.mapRefs.current.leafletElement);
    const map=this.mapRefs.current.leafletElement
    L.circleMarker([27,86]).addTo(map)

    

  }
  render() {
    return (
    <>
        <Navbar />
        <main class="main-content">
          <section class="openSpace-map">
            <div class="container-fluid">
              <div class="map-wrapper">
                <OpenspaceMap reff={this.mapRefs} />
                <Sidebar  />
                <button onClick={()=>this.onclick()}>Applya</button>
              </div>
              
            </div>
          </section>
        </main>
        </>
    );
  }
}
export default OpenSpace;
