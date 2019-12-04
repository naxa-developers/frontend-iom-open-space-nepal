import React, { Component } from "react";

class Photo extends Component {
  render() {
 
    return (
        <div className="col-sm-4">
        <figure>
        <img src={this.props.photo} alt="map" /> 
        </figure>
      </div>
    );
  }
}

export default Photo;
