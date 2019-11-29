import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Axios from "axios";
import ReportCard from "./ReportCard";
import ReportFilter from "./ReportFilter";
import LoadingSpinnerBig from "./LoadingSpinnerBig";
import { connect } from "react-redux";

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
      reportLengend : L.control({position: 'bottomright'})
      
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
    Axios.get("https://iomapi.naxa.com.np/api/v1/report/").then(response => {
     

      this.props.dispatch({ type: "ReportFilter", data: response.data });
      this.loadReports();
      this.setState({
        reports: response.data,
        reportsToShow: response.data,
        loading: false
      });
    });
  };

  toggleLoader = () => {
      this.setState({
          loading: !this.state.loading
      })
  }
  setKeywords = e => {
    this.setState({ keywords: e });
  };
  searchNow = () => {
   
    
    let filteredReports = this.state.reports.filter(report =>
      report.title.toLowerCase().includes(this.state.keywords.toLowerCase())
    );


    this.setState({ reportsToShow: filteredReports });
  };
  
  loadReports = () => {
   
    
  
    this.props.reportData&&this.props.reportData.map((p) => {

      var color= ''
      var fillColor= ''
      if(p.urgency=="high"){
        color= 'red'
        fillColor= 'red'
      } else if(p.urgency=="medium") {
        color= "#a27109"
        fillColor= "#ffb20f"
      } else if(p.urgency=="low") {
        color='#1ee611'
        fillColor= '#1ee611'
  
      }
      else {
        color='white'
        fillColor= 'white'
      }
      
    const  reportStyle = {
        color: color,
        fillColor: fillColor,
        opacity: 0.3,
        fillOpacity: 1,
        weight: 15,
        radius: 6
      }

     
     
    var marker =   L.circleMarker([p.location[1],p.location[0]], reportStyle).addTo(this.props.mapR.current.leafletElement)
   var popOne = " <div class='bind-popup'> " +
   "<div class='bind-header'> <h5>" +p.title+ "</h5>  <p> "+p.name+ " </p> </div> </div>"
   
   
   marker.bindPopup(popOne);
    })
     
      
  }
addReportLegend = () => {
  this.state.reportLengend.onAdd = (map) => {
    var div = L.DomUtil.create('div', `reportLegend`)
    div.innerHTML=''
    var reportCard =  "<ul><h6>Report Legends</h6><li><span class='legend red'></span><p>Pending Reports</p></li><li><span class='legend green'></span><p>Replied Reports</p></li></ul>"
    div.innerHTML += reportCard 
    return div;
  }
  this.state.reportLengend.addTo(this.props.mapR.current.leafletElement)
}


  componentDidMount() {
    this.onload();
    this.fetchReports();
    this.addReportLegend();
  
  }

  render() {

    

    return (
      <div>
        <div className="map-sidebar">
          <div className="sidebar-wrapper">
            <div className="card">
              <div className="card-body">
                <ReportFilter 
                toggleLoader = {this.toggleLoader}
                />
                <div className="report-count">
                  <h5>
                    Reports: <span>{this.props.reportData&&this.props.reportData.length}</span>
                  </h5>
                </div>
                <div className="report-list">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        {" "}
                        <MaterialIcon icon="search" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      aria-label=""
                      placeholder="Search reports"
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
                      <LoadingSpinnerBig />
                    ) : (
                      this.state.reportsToShow.map(e => {
                        return (
                          <ReportCard
                            id={e.id}
                            title={e.title}
                            location={e.name}
                            urgency={e.urgency}
                            date={e.date}
                            ReportLocation={e.location}
                            daysCount = {e.count}

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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reportData: state.reportData
  };
};

export default connect(mapStateToProps)(ReportSidebar);
