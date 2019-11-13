import React, { Component } from "react";

class ReportCard extends Component {
  render() {
    return (
      <div>
        <li>
          <div class="report-content">
            <h5>
              {this.props.title}
              <i
                class="material-icons pending"
                data-toggle="tooltip"
                data-placement="top"
                title="Pending"
              >
                timer
              </i>
            </h5>
            <div class="loc-time flex-start">
              <a href="#">{this.props.location}</a>
              <time>1 week ago</time>
            </div>
          </div>
          <div class="report-status">
            <label class="unsuccess">high</label>
            <span>{this.props.urgency}</span>
          </div>
        </li>
      </div>
    );
  }
}
export default ReportCard;
