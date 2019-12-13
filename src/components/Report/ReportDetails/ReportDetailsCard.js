import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import { connect } from "react-redux";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class ReportDetailsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportInfo: ""
    };
  }
  fetchReport = () => {
    Axios.get(
      `https://iomapi.naxa.com.np/api/v1/report/${localStorage.getItem(
        "reportId"
      )}`
    ).then(response => {
      this.setState({ reportInfo: response.data });
    });
  };

  onload = () => {
    var windowHeight = window.innerHeight;

    var navHeight = document.getElementsByClassName("site-header")[0]
      .clientHeight;

    document.getElementsByClassName(
      "sidebar-wrapper"
    )[0].style.height = `${windowHeight - navHeight}px`;
  };
  componentDidMount() {
    this.fetchReport();
    this.onload();
  }

  render() {


    var status = this.state.reportInfo.status;
    this.props.id && localStorage.setItem("reportId", this.props.id);
    // console.log("should change", localStorage.getItem("reportId"));
    console.log("props", this.props);
    
    this.props.days && localStorage.setItem("days", this.props.days);
  
    

    return (
      <div className="map-sidebar">
        <div className="sidebar-wrapper">
          <span
            class="sidebar-close material-icons"
            onClick={() => {
              this.props.history.push("/report")
              
            }}
          >
            close
          </span>
          <div className="card">
            <div className="card-body">
              <div className="report-details">
                <div className="report-details-heading">
                  <h5>
                    {this.state.reportInfo.title}
                    <i
                      className={
                        status == "pending"
                          ? "material-icons pending"
                          : "material-icons success"
                      }
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Pending"
                    >
                      {status == "pending" ? "timer" : "check_circle"}
                    </i>
                  </h5>
                  <div className="report-content">
                    <div className="report-address ">
                      <p className="flex-start loc-time">
                        <a  
                         onClick={() => {
                          console.log("dispatch now");
                           this.props.history.push('/openspacedetails'); 
                           this.props.dispatch({
                             type: 'spaceClicked',
                             id: this.props.spaceId

                           })

                         
                         }
                         }
                         >{this.state.reportInfo.name}</a>
                        <time>{localStorage.getItem("days")}</time>
                      </p>
                      <p className="flex-start address">
                        <i className="material-icons room">room</i>
                        <span>{this.state.reportInfo.address}</span>
                      </p>
                    </div>
                    {/* <div className="report-status">
                      <label className="unsuccess">{this.state.reportInfo.urgency}</label>
                      <span>Urgency</span>
                    </div> */}
                  </div>
                </div>

                <div className="report-email">
                  <span>Hello,</span>
                  <p>{this.state.reportInfo.message}</p>
                  <div className="reporter">
                    <span>Regards,</span>
                    <h6>{this.state.reportInfo.reported_by}</h6>
                  </div>
                </div>
                <div className="attached">
                  <h5>
                    <i className="material-icons">attachment</i> attachment
                  </h5>
               
          
                  <figure    style={{ 
                    height: 300,
                    width: 600,
                    backgroundImage: `url('${this.state.reportInfo&&this.state.reportInfo.image}') ` }} >
                  {/* <img
                    src=""
                    // {this.state.reportInfo&&this.state.reportInfo.image}
                    alt="attach"
                  /> */}
                </figure>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    id: state.reportID,
    days: state.daysCount,
    spaceId: state.space
  };
};
export default withRouter(connect(mapStateToProps)(ReportDetailsCard));
