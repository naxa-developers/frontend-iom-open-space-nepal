import React, { Component } from "react";
import Axios from "axios";
import ReportCard from "./ReportCard";
import ReportFilter from "./ReportFilter";
import LoadingSpinnerBig from "./LoadingSpinnerBig";
import { connect } from "react-redux";
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

require('leaflet.markercluster')

class ReportSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      reportsToShow: [],
      keywords: "",
      filteredReports: [],
      loading: true,
      isFocused: false,
      reportLengend: L.control({ position: "bottomright" }),
      reportsMarkers: L.markerClusterGroup()
 
    };
  }

  onload = () => {
    var windowHeight = window.innerHeight;

    var navHeight = document.getElementsByClassName("site-header")[0]
      .clientHeight;

    document.getElementsByClassName(
      "sidebar-wrapper"
    )[0].style.height = `${windowHeight - navHeight}px`;
  };
  fetchReports = () => {
    Axios.get(`${process.env.BASE_URL}/api/v1/report/`).then(response => {
      this.props.dispatch({ type: "ReportFilter", data: response.data });
   
      this.setState({
        reports: response.data,
        reportsToShow: response.data,
        loading: false
      });
      this.loadReports();
    });
 
  };

  toggleLoader = () => {
    this.setState({
      loading: !this.state.loading
    });
  };
  setKeywords = e => {
    this.setState({ keywords: e });
  };
  searchNow = () => {
    let filteredReports = this.state.reports.filter(report =>
      report.title.toLowerCase().includes(this.state.keywords.toLowerCase())
    );


this.props.dispatch({
       
        
  type:"ReportFilter",
  data: filteredReports

})
  };

  loadReports = () => {
    this.state.reportsMarkers.eachLayer((l) => this.state.reportsMarkers.removeLayer(l) )
    this.props.reportData &&
      this.props.reportData.map(p => {
        
        
        if (p.status == "pending") {
        var reportClass="reportMarkerPending"
       
        } else if (p.status == "replied") {
          var reportClass="reportMarkerReplied"
        } else {
          var reportClass=""
        }
       
        

    
        var icon = L.divIcon({
          className: reportClass,
          html: "<i class='OSmarker'></i>",
          // iconSize: [4, 4],
          // iconAnchor: [12, 6]
        });
        var htmlmrk = L.marker([p.location[1], p.location[0]], { icon: icon })
        .addTo(this.state.reportsMarkers);

    
        var popOne =
          " <div class='bind-popup'> " +
          "<div class='bind-header'> <h5>" +
          p.title +
          "</h5>  <p> " +
          p.name +
          " </p><a  class='report_btn' href='/#/reportDetails'>View Details</a> </div> </div>";

        htmlmrk.bindPopup(popOne);
        htmlmrk.on('click', () => {
          var classes = document.getElementsByClassName('report_btn')
          for (var i = 0; i < classes.length; i++) {
            classes[i].addEventListener('click', () => {
              this.props.dispatch({ type: "reportClicked", id: p.id, open: p.openS })
              this.props.history.push('/reportDetails');
  
            })
          }
      
      });
      
      });
     
      this.state.reportsMarkers&&this.props.mapR.current.leafletElement.fitBounds(
        this.state.reportsMarkers.getBounds()
      );
  };
  addReportLegend = () => {
    this.state.reportLengend.onAdd = map => {
      var div = L.DomUtil.create("div", `reportLegend`);
      div.innerHTML = "";
      var reportCard =
        "<ul><h6>Report Status</h6><li><span class='legend red'></span><p>Pending </p></li><li><span class='legend green'></span><p>Replied</p></li></ul>";
      div.innerHTML += reportCard;
      return div;
    };
    this.state.reportLengend.addTo(this.props.mapR.current.leafletElement);
  };

  resetReports = () => {
 

    this.props.dispatch({
      type: "ReportFilter",
      data: this.state.reports
    });
  };

  componentDidMount() {
    this.onload();
    this.fetchReports();
    this.addReportLegend();
    this.state.reportsMarkers.addTo(this.props.mapR.current.leafletElement);
    
  }
  componentDidUpdate() {

    this.loadReports();

  }

  render() {
 
    
    
    return (
      <div>
        <PerfectScrollbar>
        <div className="map-sidebar">
          <div className="sidebar-wrapper">
            <div className="card">
              <div className="card-body">
                <ReportFilter
                  resetReports={this.resetReports}
                  toggleLoader={this.toggleLoader}
                />
                <div className="report-count">
                  <h5>
                  {this.props.language=='0' ? "Reports" : "रिपोर्टहरू" }:{" "}
                    <span>
                      {this.props.reportData && this.props.reportData.length}
                    </span>
                  </h5>
                </div>
                <div className="report-list">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        {" "}
                        <i className="humanitarian-icon-Search"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      aria-label=""
                      placeholder= { this.props.language=='0' ? "Search reports" : "रिपोर्टहरू खोज्नुहोस्"}
                      onInput={e => this.setKeywords(e.target.value)}
                      onFocus={() => this.setState({ isFocused: true })}
                      // onBlur = {() => {
                      //     setTimeout(()=>this.setState({isFocused: false}),100)

                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          this.searchNow();
                          // this.setState({focused: false})
                        }
                      }}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        {this.state.isFocused && (
                          <i
                            className="material-icons"
                            onClick={() => this.searchNow()}
                          >
                            keyboard_backspace
                          </i>
                        )}
                      </span>
                    </div>
                  </div>

                  <ul>
                    {this.state.loading ? (
                    <LoadingSpinnerBig /> )  :this.props.reportData&& this.props.reportData.length==0 ? <h6 style={{fontSize:'0.9rem', color:'#6D6E71'}}>No reports available</h6> 
                   
                   : (
                      this.props.reportData.map(e => {
                        return (
                          <ReportCard
                            id={e.id}
                            title={e.title}
                            oname={e.name}
                            date={e.date}
                            ReportLocation={e.location}
                            ReportAddress={e.address}
                            daysC={e.count}
                            status={e.status}
                            openS={e.open_space}
                          />
                        );
                      })
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reportData: state.reportData,
    language: state.language
  };
};

export default connect(mapStateToProps)(ReportSidebar);
