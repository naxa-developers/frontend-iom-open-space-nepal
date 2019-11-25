import React, { Component,createRef } from "react";
import Navbar from "../Home/Navbar";
import OpenspaceMap from './OpenspaceMap';
import Sidebar from './Sidebar';
import './OpenSpaceCSS.css';

class OpenSpace extends Component {
  constructor(props) {
    super(props)
    this.mapRefs=createRef();
    this.state = {
      currentLocation: null

       
    };
  };
  setcurrentlocation=(loc)=>{
    console.log(loc,"sert")
    this.setState({currentLocation:loc})
  }
  componentDidMount(){

  }
  

  render() {
    console.log("render",this.state.currentLocation)
    return (
    <>
        <Navbar />
        <main className="main-content">
          <section className="openSpace-map">
            <div className="container-fluid">
              <div className ="map-wrapper">
                <div className="row no-gutters">
                  <div className="col-md-7">
                  <OpenspaceMap setcurrentLocation={this.setcurrentlocation} currentLocation={this.state.currentLocation} mapRefss={this.mapRefs} />
                  </div>
                  <div className="col-md-5">
                  <Sidebar mapRefs={this.mapRefs}  currentLocation={this.state.currentLocation} />
                  </div>
                </div>
                
                
              </div>
              
            </div>
          </section>
        </main>
        </>
    );
  }
}
export default OpenSpace;
