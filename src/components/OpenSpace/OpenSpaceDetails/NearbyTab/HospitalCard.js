import React, { Component } from "react";
import Axios from "axios";
import IndividualCard from "./IndividualCard";

class HospitalCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ""
    };
  }

  fetchInfo = () => {
    Axios.get(
      `http://139.59.67.104:8011/api/v1/near_by_me?type=health%20facility&count=100&distance=500&id=${this.props.id}`
    ).then(response => {
      this.setState({
        data: response.data
      });
    });
  };
  componentDidMount() {
    this.fetchInfo();
  }

  render() {



    return (
      <>
        <div className="facility-overview flex-between">
          <div className="overview-item ">
            <h6>1</h6>
            <p>district hospital</p>
          </div>
          <div className="overview-item">
            <h6>13</h6>
            <p>government Hospital</p>
          </div>
          <div className="overview-item">
            <h6>1</h6>
            <p>private Hospital</p>
          </div>
        </div>
        <span>
        {this.state.data &&
          this.state.data.facility.map(e => {
         
              return <IndividualCard key ={e.id}name={e.name} />
           
          })}
          </span>
      </>
    );
  }
}
export default HospitalCard;
