import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

class ReportCard extends Component {
  render() {
    
    
    return (
    <>
        <li>
          <div class="report-content" onClick ={() => {
              
              this.props.history.push('/reportdetails')
            }}>
            <h5 >
              {this.props.title} 
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
          <a >{this.props.ReportLocation}</a>
              <time>1 week ago</time>
            </div> 
          </div>
          <div class="report-status">
            <label class="unsuccess">high</label>
            <span>{this.props.urgency}</span>
          </div>
        </li>
     </>
    );
  }
}
export default withRouter(ReportCard);
