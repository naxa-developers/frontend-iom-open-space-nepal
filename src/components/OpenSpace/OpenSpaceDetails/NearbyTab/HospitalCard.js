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
      `http://139.59.67.104:8011/api/v1/near_by_me?type=education%20facility&count=10&distance=10000000&id=8`
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
    console.log(this.state.data);

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
         
              return <IndividualCard name={e.name} />
           
          })}
          </span>
      </>
    );
  }
}
export default HospitalCard;
