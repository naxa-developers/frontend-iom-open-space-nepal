import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Select from "react-select";

const days = [{ 
    value: "0", label: "Days",
    value: "1", label: "Last 7 days" 
}];
const status = [
  { value: "1", label: "Pending" },
  { value: "2", label: "Replied" }
];

const urgency = [
  { value: "1", label: "High" },
  { value: "2", label: "Low" }
];
class ReportFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueDays: null,
      valueStatus: null,
      valueUrgency: null,
   
      
    };
  }

  onDaysChange = e => {
    this.setState({ valueDays: e });
    
  };

  onStatusChange = e => {
    this.setState({  valueStatus: e });
    
  };

  onUrgencyChange = e => {
    this.setState({  valueUrgency: e });
    
  };
  onClear = () => {
   

  
    this.setState({ valueDays: null, valueStatus: null,valueUrgency: null});
  };

  render() {
    return (
      <div className="map-filter">
        <div className="filter-option">
          <Select
            options={days}
            value = {this.state.valueDays}
           
            onChange={this.onDaysChange}
          />

          <Select
            options={status}
            value = {this.state.valueStatus}
            onChange={this.onStatusChange}
          />
          <Select 
          options={urgency}
          value = {this.state.valueUrgency}
            onChange={this.onUrgencyChange}
           />
        </div>
        <div className="reset-btns">
          <div className="reset">
            <MaterialIcon icon="refresh" />

            <span onClick={() => this.onClear()}>clear all</span>
          </div>
          <a href="" className="openspace-button">
            Apply
          </a>
        </div>
      </div>
    );
  }
}
export default ReportFilter;
