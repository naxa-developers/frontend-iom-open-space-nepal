import React, { Component } from "react";

class SingleReport extends Component {
  render() {
    return (
        <>
        <div className="report-content">
        <h5>
          {this.props.title}{" "}
          <i
            className="material-icons pending"
            data-toggle="tooltip"
            data-placement="top"
            title="Pending"
          >
            timer
          </i>
        </h5>

        <div className="loc-time flex-start">
    <a href="#">{this.props.name}</a>
          <time>1 week ago</time>
        </div>
        </div>

        <div className="report-status">
    <label className="unsuccess">{this.props.urgency}</label>
          <span>Urgency</span>
        </div>
        </>
    
    );
  }
}
export default SingleReport;
