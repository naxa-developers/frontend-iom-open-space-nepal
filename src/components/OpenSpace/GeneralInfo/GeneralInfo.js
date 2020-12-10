import React, { Component } from "react";
// import LinesEllipsis from 'react-lines-ellipsis'
import ShowMore from "react-show-more";

import AssementList from "../OpenSpaceDetails/ModalComponent/AssementList";
import Service from "./Service";

class GeneralInfo extends Component {
  render() {
    var usable_perc = (this.props.usable_area / this.props.total_area) * 100;
    var actual_perc = usable_perc.toFixed(1);
    var width_perc = actual_perc + "%";
  
    

    return (
      <div className="general-info">
        <div className="general-overview flex-between">
          <div className="overview-item">
            <h6>{this.props.capacity}</h6>
            <p>Capacity</p>
          </div>
          <div className="overview-item">
            <h6>
              {Math.round(this.props.total_area)} <sub>sq.m</sub>
            </h6>
            <p>Total Area</p>
          </div>
          <div className="overview-item">
            <h6>
              {Math.round(this.props.usable_area)} <sub>sq.m</sub>
            </h6>
            <p>Usable Area</p>
          </div>
        </div>
        <div className="space-chart">
          <div className="chart-legend flex-start">
            <div className="legend-list ">
              <div className="symbol-content flex-start">
                <span className="usable-symbol symbol"></span>
                <span>Usable Area</span>
              </div>

              <span className="usable-percent">{actual_perc}%</span>
            </div>
            <div className="legend-list ">
              <div className="symbol-content flex-start">
                <span className="unusable-symbol symbol"></span>
                <span>Non Usable Area</span>
              </div>

              <span className="usable-percent">
                {(100 - actual_perc).toFixed(1)} %
              </span>
            </div>
          </div>
          <div className="chart-wrapper flex-start">
            <div className="chart-item non-usable">
              <div
                className="chart-item usable"
                style={{ width: width_perc }}
              ></div>
            </div>
          </div>
        </div>
        <div className="suggested-content my-5">
          <h5>Suggested Use</h5>

          <div className="suggested-list ">
            {  this.props.suggested_use&&this.props.suggested_use.length!=0 ? 
              this.props.suggested_use.map(use => {

                return (
                  <ul>
                    <li>
                     
                      <img
                        src={use.suggested_use.icon}
                        style={{ height: 30, width: "auto" }}
                      ></img>
                      {use.suggested_use.name}
                    </li>
                  </ul>
                );
              })
            : (
              <span style={{color: '#6D6E71'}} >No suggested uses to show</span>
            )}
          </div>
          <h5>On-site Amenities</h5>
          <div className="suggested-list ">
            {this.props.services &&
              this.props.services.map(service => {
                 return (
                 
                    <ul>
                  
                       <Service
                        icon={service.service.icon}
                        name={service.service.name}
                        desc={service.description}
                        isAvailable={service.is_available}
                      />   
            
                    </ul>
                  );
                  
              })}
          </div>
          <p>
            <h5>Description</h5>
            <span>
              {this.props.description != null ? (
                <ShowMore
                  lines={3}
                  more="Show more"
                  less="Show less"
                  anchorClass=""
                >
                  {this.props.description}
                </ShowMore>
              ) : (
                <span>No description to show</span>
              )}
            </span>
          </p>
        </div>
        <AssementList
          className="toggleModal"
          question_data={this.props.question_data}
          id={this.props.id}
          capacity={this.props.capacity}
          total_area={this.props.total_area}
          usable_area={this.props.usable_area}
          suggested_use={this.props.suggested_use}
          services={this.props.services}
          title={this.props.title}
          question_data={this.props.question_data}
          description={this.props.description}
          ward={this.props.ward}
          province={this.props.province}
          municipality={this.props.municipality}
          ownership={this.props.ownership}
          special_feature={this.props.special_feature}
          access={this.props.access}
          elevation={this.props.elevation}
        />
      </div>
    );
  }
}

export default GeneralInfo;
