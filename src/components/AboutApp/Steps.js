import React, { Component } from "react";

class Steps extends Component {
  render() {
      console.log(this.props.count);
      
    return (
      <div className="row">

        <div className={this.props.count==1 ? "col-12 col-md-6 order-sm-1 order-md-0" :"col-12 col-md-6" }>
          <div className="content-text">
            <div className="content-center">
              <figure>
                <img src={this.props.icon} alt="location" />
              </figure>
              <div className="content-title">
                <h3 className="openspace-title">{this.props.title}</h3>
                <p className="content-para">{this.props.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={this.props.count==1 ? "col-12 col-md-6 order-sm-0 order-md-1" :"col-12 col-md-6" }>
          <div className="content-image">
            <figure>
              <img src={this.props.image} alt="find-space" />
            </figure>
          </div>
        </div>
      </div>
    );
  }
}
export default Steps;
