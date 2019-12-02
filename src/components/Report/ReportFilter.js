import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Select from "react-select";
import Axios from "axios";
import {connect } from 'react-redux';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css'
import moment from "moment";

const days = [
  {
    value: "0",
    label: "Days",
    label: "Last 7 days"
  }
];
const status = [
  { value: "1", label: "Pending" },
  { value: "2", label: "Replied" }
];

const urgency = [
  { value: "1", label: "High" },
  { value: "2", label: "Medium" },
  { value: "3", label: "Low" }
];
class ReportFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueDays: null,
      valueStatus: null,
      valueUrgency: null,
      showApply: false,
      startDate: '',
      endDate: ''
    };
  }

  onDaysChange = e => {
    this.setState({ valueDays: e ,
    showApply: !this.state.showApply
    });
  };

  onStatusChange = e => {
    this.setState({ valueStatus: e,
      showApply: !this.state.showApply
     });
  };

  onUrgencyChange = e => {
    this.setState({ valueUrgency: e,
      showApply: !this.state.showApply
     });
  };
  onClear = () => {
    this.setState({ valueDays: null, valueStatus: null, valueUrgency: null });
  };
  applyFilter = () => {
    this.props.toggleLoader();
   
    const status = this.state.valueStatus;
    const start_date = this.state.startDate;
    const end_date = this.state.endDate;
   const url = `http://139.59.67.104:8011/api/v1/report/?start_date=${start_date}%2006:00Z&end_date=${end_date}%2006:00Z&status=${status.label.toLowerCase()}`
    Axios.get(url)
    .then(response => {
      console.log(url);
      
      console.log("filtered", response);
      
      this.props.dispatch({
       
        
        type:"ReportFilter",
        data: response.data

      })
      this.props.toggleLoader();
    })
    
  };
  handleSelect = (range, v) => {
    this.setState({
      startDate: moment(v.startDate._d).format('YYYY-MM-DD'),
      endDate: moment(v.endDate._d).format('YYYY-MM-DD')
    })
}

  render() {
    console.log(this.state.startDate);
    
    return (
     
      <div className="map-filter">
       
        <div className="filter-option">
        <DateRangePicker onApply={(range,v) => this.handleSelect(range, v)}>
      <button className="btn btn-outline-primary dropdown-toggle" >   Select Range</button>
      
    </DateRangePicker>
     
          <Select
            placeholder="Status"
            options={status}
            value={this.state.valueStatus}
            onChange={this.onStatusChange}
          />
          {/* <Select
            placeholder="Urgency"
            options={urgency}
            value={this.state.valueUrgency}
            onChange={this.onUrgencyChange}
          /> */}
        </div>
        <div className="reset-btns">
          <div className="reset">
            <i icon="refresh" />

            <span onClick={() => this.onClear()}>clear all</span>
          </div>
          <button disabled ={!this.state.showApply} className="openspace-button" onClick={() => this.applyFilter()}>
            Apply
          </button>
        </div>
      
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state
  };
};
export default connect(mapStateToProps)(ReportFilter);
