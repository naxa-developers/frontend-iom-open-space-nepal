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

const openspace = [
  { value: "1", label: "OpenSpace 1" },
  { value: "2", label: "OpenSpace 2" }

]


class ReportFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueDays: null,
      valueStatus: null,
      valueUrgency: null,
      showApply: false,
      startDate: '',
      endDate: '',
      openspaceList: ''
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



    this.setState({
      startDate: moment(v.startDate._d).format('YYYY-MM-DD'),
      endDate: moment(v.endDate._d).format('YYYY-MM-DD')
    })
  }
  clearRange = (range, v) => {


    this.refs.datePicker.setState({
      v: null
    })




  }
  componentDidMount() {
    Axios.get(`https://iomapi.naxa.com.np/api/v1/open_space_landing`)
      .then(res => {
        var arr =[];
        res.data.data.map(o => {
          let openObject = {
            value: o.id,
            label: o.title
          }
          arr.push(openObject)
        })
        this.setState({ openspaceList: arr })
       console.log("oo", this.state.openspaceList);
       

      })
  }

  // componentDidUpdate(){
  //   console.log(this.picker,"pock")
  // }
  render() {
   
    this.state.openspaceList&&this.state.openspaceList.map(o => {
      var list = o.title
    }
  
      )

    return (
  
      <div className="map-filter">

        <div className="filter-option">
          {this.state.openspaceList&&
              <Select
              placeholder="Openspace"
              options={this.state.openspaceList}
              // value={this.state.valueStatus}
              // onChange={this.onStatusChange}
  
  
            />

            

          }
        
          <DateRangePicker
            onApply={(range, v) => this.handleSelect(range, v)}
            onChange={this.onDaysChange}
            ref={ref => this.picker = ref}
          // onChange={this.onDaysChange}
          // onBlur = {(range,v) => this.clearRange(range,v)} 
          // ref="datePicker"
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
