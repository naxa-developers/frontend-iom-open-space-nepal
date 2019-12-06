import React, { Component } from "react";
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


class SingleReport extends Component {
  render() {
   console.log("fghjghjg", this.props);
   
    
    return (
        <>
        <div className="report-content">
        <h5 onClick={() =>   {
this.props.history.push('/reportdetails')
this.props.dispatch({type:'reportClicked', id: this.props.id})
        }
        
      
      }>
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
    <a href="#">{this.props.name}</a>
    <time>{this.props.days} days ago</time>
        </div>
        </div>

        {/* <div className="report-status">
    <label className="unsuccess">{this.props.urgency}</label>
          <span>Urgency</span>
        </div> */}
        </>
    
    );
  }
}



export default connect()(withRouter(SingleReport));
