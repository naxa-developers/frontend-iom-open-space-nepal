import React, { Component } from "react";
import Axios from "axios";

import DetailsHeader from "./DetailsHeader";
import TabNavbar from "./TabNavbar";
import GeneralInfo from "./GeneralInfo";
import ReportTab from "./ReportTab/ReportTab";
import NearbyTab from "./NearbyTab/NearbyTab";

import { connect } from "react-redux";

class DetailsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spaceInfo: "",
      tabid: 1
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

  fetchDetails = () => {
    Axios.get(
      `http://139.59.67.104:8011/api/v1/open_space/${this.props.id}`
    ).then(response => {
      console.log("id data", response.data);
      this.setState({ spaceInfo: response.data });
     
      
    });
  };
  componentDidMount() {
    this.onload();
    this.fetchDetails();
  }
  changetabid = e => {
    this.setState({ tabid: e });
  };

  render() {
    
    return (
      <div>
        <div className="map-sidebar">
          <div className="sidebar-wrapper">
          
            <div className="card">
              <div className="card-body">
                <DetailsHeader
                  title={this.state.spaceInfo && this.state.spaceInfo.title}
                  address={this.state.spaceInfo.address}
                  image={this.state.spaceInfo.image}
                />
                <TabNavbar
                  tabid={this.state.tabid}
                  changetabid={this.changetabid}
                />

                <div className="tab-wrapper">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className={
                        this.state.tabid == 1
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                      id="general"
                      role="tabpanel"
                      aria-labelledby="general_tab"
                    >
                      <GeneralInfo
                        capacity={this.state.spaceInfo.capacity}
                        total_area={this.state.spaceInfo.total_area}
                        usable_area={this.state.spaceInfo.usable_area}
                        suggested_use={this.state.spaceInfo.suggested_use}
                        services = {this.state.spaceInfo.services}
                        title = {this.state.spaceInfo.title}
                      />
                    </div>
                    <div
                      className={
                        this.state.tabid == 2
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                      id="images"
                      role="tabpanel"
                      aria-labelledby="images_tab"
                    >
                      <h2>khali</h2>
                    </div>
                    <div
                      className={
                        this.state.tabid == 3
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                      id="reports"
                      role="tabpanel"
                      aria-labelledby="report_tab"
                    >
                      <ReportTab id={this.props.id}/>
                    </div>
                    <div
                      className={
                        this.state.tabid == 4
                          ? "tab-pane fade show active"
                          : "tab-pane fade"
                      }
                      id="nearby"
                      role="tabpanel"
                      aria-labelledby="nearby_tab"
                    >
                      <div id="accordion" className="accordion map-accordion">
                        <NearbyTab />
                      </div>
                    </div>
                  </div>
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
    spaceID: state.spaceID
  };
};
export default connect(mapStateToProps)(DetailsCard);
