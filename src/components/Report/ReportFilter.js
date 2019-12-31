import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Select from "react-select";
import Axios from "axios";
import { connect } from 'react-redux';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css'
import moment from "moment";


const status = [
  { value: "1", label: "Pending" },
  { value: "2", label: "Replied" }
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


  onStatusChange = e => {



    this.setState({
      valueStatus: e
      // showApply: !this.state.showApply
    });

  };


  onClear = () => {
    this.setState({
      valueDays: null, valueStatus: null, valueUrgency: null, startDate: null, endDate: null
    });



    this.props.resetReports();
    this.clearRange();

  };
  applyFilter = () => {
    this.props.toggleLoader();
    const start_date = this.state.startDate;
    const end_date = this.state.endDate;

    let url = '';
    this.state.valueStatus == null ?
      url = `https://iomapi.naxa.com.np/api/v1/report/?start_date=${start_date}&end_date=${end_date}`
      : url = `https://iomapi.naxa.com.np/api/v1/report/?start_date=${start_date}&end_date=${end_date}&status=${this.state.valueStatus.label.toLowerCase()}`




    Axios.get(url)
      .then(response => {



        this.props.dispatch({


          type: "ReportFilter",
          data: response.data,
          reportData: response.data

        })
        this.props.toggleLoader();
      })

  };
  handleSelect = (range, v) => {

    console.log("d", v.startDate._d);

    this.setState({
      startDate: moment(v.startDate._d).format('YYYY-MM-DD'),
      endDate: moment(v.endDate._d).format('YYYY-MM-DD')
    })
  }
  clearRange = (range, v) => {
    console.log("clear");
console.log("c value", v);

    this.refs.datePicker.setState ({
     v: null
    })
    
  
 

  }

  componentDidUpdate(){
    console.log(this.picker,"pock")
  }
  render() {



    return (

      <div className="map-filter">

        <div className="filter-option">
          <DateRangePicker 
          onApply={(range, v) => this.handleSelect(range, v)}
<<<<<<< HEAD
            onChange={this.onDaysChange} 
            ref={ref=>this.picker=ref}
=======
            onChange={this.onDaysChange}
            onBlur = {(range,v) => this.clearRange(range,v)} 
            ref="datePicker"
>>>>>>> 2ed51cee1b6803f590b97b2d20bd08224cc51834
          >
            <button className="btn btn-outline-primary dropdown-toggle" >
              {
                this.state.startDate && this.state.endDate ? `${this.state.startDate} - ${this.state.endDate}` : 'Select Range'
              }
            </button>

          </DateRangePicker>

          <Select
            placeholder="Status"
            options={status}
            value={this.state.valueStatus}
            onChange={this.onStatusChange}


          />

        </div>
        <div className="reset-btns">
          <div className="reset">
            <i icon="refresh" />

            <span onClick={() => this.onClear()}>clear all</span>
          </div>

          <button className="openspace-button" onClick={() => this.applyFilter()}>
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
