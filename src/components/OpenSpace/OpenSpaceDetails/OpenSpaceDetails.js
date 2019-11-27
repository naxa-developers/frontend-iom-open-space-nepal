import React, { Component,createRef } from "react";
import Navbar from "../../Home/Navbar";
import DetailsMap from './DetailsMap';
import DetailsCard from './DetailsCard';
import { connect } from 'react-redux';
// import '../OpenSpaceCSS.css';

class OpenSpaceDetails extends Component {
  constructor(props) {
    super(props)
    this.map=createRef();
    this.state = {
       
    };
  };
  

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
                  <DetailsMap reff={this.map}  />
                  </div>
                  <div className="col-md-5">
                  <DetailsCard reff={this.map} id = {this.props.id}/>
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
const mapStateToProps = (state) => {
  return {
       
       id: state.spaceID

  }
}
export default connect(mapStateToProps)(OpenSpaceDetails);
