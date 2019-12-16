import React, { Component } from "react";
import ModalImage from "react-modal-image";

class Map extends Component {
  
   
  render() {
  

    return (
      <div className="col-sm-4">
        <figure>
        <ModalImage small={this.props.mapImage} 
        large={this.props.mapImage}
        alt="map" /> 
        </figure>
      </div>

    
    );
  }
}
export default Map;
