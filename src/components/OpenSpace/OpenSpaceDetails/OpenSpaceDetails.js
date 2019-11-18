import React, { Component,createRef } from "react";
import Navbar from "../../Home/Navbar";
import DetailsMap from './DetailsMap';
import DetailsCard from './DetailsCard';
import '../OpenSpaceCSS.css';

class OpenSpaceDetails extends Component {
  constructor(props) {
    super(props)
    this.map=createRef();
    this.state = {
       
    };
  };
  

  render() {
    console.log(this.props.id);
    
    return (
    <>
        <Navbar />
        <main class="main-content">
          <section class="openSpace-map">
            <div class="container-fluid">
              <div class="map-wrapper">
                <DetailsMap reff={this.map} />
                <DetailsCard reff={this.map} id = {this.props.id}/>
              </div>
              
            </div>
          </section>
        </main>
        </>
    );
  }
}
export default OpenSpaceDetails;
