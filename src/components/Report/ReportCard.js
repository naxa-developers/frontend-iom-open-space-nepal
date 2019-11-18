import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {connect } from 'react-redux';


class ReportCard extends Component {
  render() {
   
    
    
    return (
    <>
        <li>
          <div class="report-content" onClick ={() => {
              
              this.props.history.push('/reportdetails')
            }}>
            <h5  onClick={() => this.props.dispatch({ type: "reportClicked", id:this.props.id })} >
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
const mapStateToProps = (state) => {
  return {
       language: state.language,
       id: state.reportID
   }
}

export default withRouter(connect(mapStateToProps)(ReportCard));
