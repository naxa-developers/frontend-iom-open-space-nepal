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
       
    };
  };
  componentDidMount(){

  }
  

  render() {
    return (
    <>
        <Navbar />
        <main className="main-content">
          <section className="openSpace-map">
            <div className="container-fluid">
              <div className ="map-wrapper">
                <OpenspaceMap mapRefss={this.mapRefs} />
                <Sidebar mapRefs={this.mapRefs} />
              </div>
              
            </div>
          </section>
        </main>
        </>
    );
  }
}
export default OpenSpace;
