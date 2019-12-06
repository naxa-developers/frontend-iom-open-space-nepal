import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {connect } from 'react-redux';



class ReportCard extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       days: ''
    }
  }
  


  CalcTime = (days) => {
    var weeks = parseInt(days/7);
    var months = parseInt(days/30);
    return (months > 0 ? months + " month" + (months > 1 ? "s, " : ", ") : "") + (weeks > 0 ? weeks + " week" + (weeks > 1 ? "s, " : ", ") : "") + (days > 0 ? days + " day" + (days > 1 ? "s " : " ") : "") 

   }
 
    componentDidMount(){
     
      // this.CalcTime(this.props.daysCount);
      // var days =  this.CalcTime(this.props.daysCount);
    }


  render() {

  
   
    
    let reportDays =  this.props.daysC == "0" ? "0 Days" : this.CalcTime(this.props.daysC);
  

    var timer = "timer"
    var circle ="check_circle"
 
    return (
    <>
        <li>
          <div class="report-content" onClick ={() => {
              
              this.props.history.push('/reportdetails')
            }}>
            <h5  onClick={() => {
                

              
            
              this.props.dispatch({ type: "reportClicked", id:this.props.id, openSpace:this.props.openS , daysCount :reportDays })
              
              }} >
              {this.props.title} 
             
          
               <i
                className={this.props.status=="pending" ? "material-icons pending" : "material-icons success"}
                data-toggle="tooltip"
                data-placement="top"
                title={this.props.status=="pending" ? "Pending" : "Replied"}
              >
               
              {this.props.status=="pending" ? timer : circle}
              </i> 
            </h5>
             <div className="loc-time flex-start">
          <a >{this.props.ReportAddress}</a>
            <time>{reportDays }</time>
                
            </div> 
          </div>
        </li>
     </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
       language: state.language,
      //  id: state.reportID
   }
}

export default withRouter(connect(mapStateToProps)(ReportCard));
