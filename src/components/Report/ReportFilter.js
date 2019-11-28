import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Select from "react-select";
import Axios from "axios";
import {connect } from 'react-redux';

const days = [
  {
    value: "0",
    label: "Days",
    value: "1",
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
      showApply: false
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
    const urgency = this.state.valueUrgency;
    const url = `https://iomapi.naxa.com.np/api/v1/report/?status=${status.label.toLowerCase()}&urgency=${urgency.label.toLowerCase()}`
   
    Axios.get(url)
    .then(response => {
     
      console.log("filtered", response);
      
      this.props.dispatch({
       
        
        type:"ReportFilter",
        data: response.data

      })
      this.props.toggleLoader();
    })
    
  };
  render() {
    return (
      <div className="map-filter">
        <div className="filter-option">
          <Select
            placeholder="Days"
            options={days}
            value={this.state.valueDays}
            onChange={this.onDaysChange}
          />

          <Select
            placeholder="Status"
            options={status}
            value={this.state.valueStatus}
            onChange={this.onStatusChange}
          />
          <Select
            placeholder="Urgency"
            options={urgency}
            value={this.state.valueUrgency}
            onChange={this.onUrgencyChange}
          />
        </div>
        <div className="reset-btns">
          <div className="reset">
            <MaterialIcon icon="refresh" />

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
