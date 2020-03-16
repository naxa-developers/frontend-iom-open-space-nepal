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
      openspaceList: '',
      oID: null
    };
  }


  onStatusChange = e => {



    this.setState({
      valueStatus: e
      // showApply: !this.state.showApply
    });

  };

onOpenChange = e => {
  this.setState({ oID: e})
}
  onClear = () => {
    this.setState({
      valueDays: null, valueStatus: null, valueUrgency: null, startDate: null, endDate: null,
      oID:null
    });



    this.props.resetReports();
    this.clearRange();

  };
  applyFilter = () => {
    this.props.toggleLoader();
    let start_date = this.state.startDate ;
    let end_date = this.state.endDate ;
    let oID = this.state.oID;
    //  let status = this.state.valueStatus.label.toLowerCase();
    // console.log("filter from ", start_date, end_date,oID, status );
    

    let url = ``;
    if(start_date!=null && end_date!=null && this.state.valueStatus==null && oID== null)
        url = `https://iomapi.naxa.com.np/api/v1/report/?start_date=${start_date}&end_date=${end_date}`
  
      else if(start_date!=null && end_date!=null &&this.state.valueStatus!=null && oID == null ) 
      url = `https://iomapi.naxa.com.np/api/v1/report/?start_date=${start_date}&end_date=${end_date}&status=${this.state.valueStatus.label.toLowerCase()}`

      else if((start_date!=null && end_date!=null &&this.state.valueStatus==null && oID!= null ))
      url=`https://iomapi.naxa.com.np/api/v1/report/?start_date=${start_date}&end_date=${end_date}&id=${oID.value}`

      else if((start_date==null && end_date==null &&this.state.valueStatus!=null && oID== null ))
      url=`https://iomapi.naxa.com.np/api/v1/report/?status=${this.state.valueStatus.label.toLowerCase()}`

      else if((start_date==null && end_date==null &&this.state.valueStatus==null && oID!= null ))
      url=`https://iomapi.naxa.com.np/api/v1/report/?id=${oID.value}`

      else if((start_date==null && end_date==null &&this.state.valueStatus!=null && oID!= null ))
      url=`https://iomapi.naxa.com.np/api/v1/report/?status=${this.state.valueStatus.label.toLowerCase()}&&id=${oID.value}`

      else 
      url=`https://iomapi.naxa.com.np/api/v1/report/?start_date=${start_date}&end_date=${end_date}&status=${status}&id=${oID.value}`








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

console.log("d");



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
          <>
              <Select
              placeholder={this.props.language=='0' ? "Openspace" : "खुल्ला ठाउँ" }
              options={this.state.openspaceList}
              value={this.state.oID}
              onChange={this.onOpenChange}
  
  
            />

            

         
        
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
                this.state.startDate && this.state.endDate ? `${this.state.startDate} - ${this.state.endDate}` : this.props.language=='0' ? 'Select Date' : "दायरा चयन गर्नुहोस्" 
              }
            </button>

          </DateRangePicker>

          <Select
            placeholder={this.props.language=='0' ? "Status" : "स्थिति" }
            options={status}
            value={this.state.valueStatus}
            onChange={this.onStatusChange}


          />
          </>
 }
        </div>
        <div className="reset-btns">
          <div className="reset">
            <i icon="refresh" />

            <span onClick={() => this.onClear()}>{this.props.language=='0' ? "Clear all" : "सबै हटाउनुहोस्" }</span>
          </div>

          <button className="openspace-button" onClick={() => this.applyFilter()}>
          {this.props.language=='0' ? "Apply" : "निवेदन गर्नु" }
          </button>
        </div>

      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state,
    language: state.language
  };
};
export default connect(mapStateToProps)(ReportFilter);
