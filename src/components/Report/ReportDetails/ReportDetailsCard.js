import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import { connect } from "react-redux";
import Axios from "axios";

class ReportDetailsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportInfo: ''
    };
  }
  fetchReport = () => {
    Axios.get(`http://139.59.67.104:8011/api/v1/report/${this.props.id}`).then(
      response => {
        this.setState({ reportInfo: response.data });
      }
    );
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
    console.log(this.props.id);

    return (
      <div className="map-sidebar">
        <span className="sidebar-toggle">
          <MaterialIcon icon="keyboard_arrow_right"></MaterialIcon>
        </span>
        <div className="sidebar-wrapper">
          <span className="sidebar-close material-icons">close</span>
          <div className="card">
            <div className="card-body">
              <div className="report-details">
                <div className="report-details-heading">
                  <h5>
                    {this.state.reportInfo.title}
                    <i
                      className="material-icons pending"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Pending"
                    >
                      timer
                    </i>
                  </h5>
                  <div className="report-content">
                    <div className="report-address ">
                      <p className="flex-start loc-time">
    <a href="#">{this.state.reportInfo.name}</a>
                        <time>2 days ago</time>
                      </p>
                      <p className="flex-start address">
                        <i className="material-icons">room</i>
    <span>{this.state.reportInfo.location}</span>
                      </p>
                    </div>
                    <div className="report-status">
                      <label className="unsuccess">{this.state.reportInfo.urgency}</label>
                      <span>Urgency</span>
                    </div>
                  </div>
                </div>

                <div className="report-email">
                  <span>Hello,</span>
                  <p>{this.state.reportInfo.message}</p>
                  <div className="reporter">
                    <span>Regards</span>
                    <h6>{this.state.reportInfo.reported_by}</h6>
                  </div>
                </div>
                <div className="attached">
                  <h5>
                    <i className="material-icons">attachment</i> attachment
                  </h5>
                  <figure>
                    <img src={this.state.reportInfo&&this.state.reportInfo.image} alt="attach" />
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
    id: state.reportID
  };
};
export default connect(mapStateToProps)(ReportDetailsCard);
