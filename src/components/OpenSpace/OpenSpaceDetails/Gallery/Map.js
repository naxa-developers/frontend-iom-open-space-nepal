import React, { Component } from "react";

class Map extends Component {
  
   
  render() {
  

    return (
      <div className="col-sm-4">
        <figure>
        <img src={this.props.mapImage} alt="map" /> 
        </figure>
      </div>

    
    );
  }
}
export default Map;