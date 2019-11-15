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
      selection: 0
    };
  }

//   onSelectChange = e => {
//     this.setState({ selection: e.value });
//   };
  onClear = (e) => {
    e.preventDefault();
    console.log("clear now");

    const { selection } = this.state;
    this.setState({ selection: 0 });
  };

  render() {
    return (
      <div className="map-filter">
        <div className="filter-option">
          <Select
            options={days}
            //  value={this.state.selection}
            // onChange={this.onSelectChange}
          />

          <Select
            options={status}
            // value={this.state.selection}
            // onChange={this.onSelectChange}
          />
          <Select 
          options={urgency}
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
