import React, { Component } from 'react'
import MaterialIcon from 'material-icons-react';
import Select from 'react-select'


const days = [
    { value: "1", label: "Last 7 days" }
  
  ];
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
        super(props)
    
        this.state = {
            select: {
                value: "Days here"
            },
             clear: false
        }
    }

    clearFilter = () => {
        this.state.clear = !this.state.clear;
        console.log(this.state.clear);
        
    }
    
    render() {
        return (
            <div className="map-filter">
            <div className="filter-option">
                
                <Select  options={days}  />
                
                <Select options={status}  value="null"/>
                <Select options={urgency} value="null" />
            </div>
            <div className="reset-btns">
                <div className="reset">
                <MaterialIcon icon="refresh" />
                    
                    <span onClick= {() => this.clearFilter()}>clear all</span>
                </div>
                <a href="#" className="openspace-button">Apply</a>
            </div>
        </div>
        )
    }
}
export default ReportFilter;
