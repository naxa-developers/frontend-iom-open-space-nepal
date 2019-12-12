import React, { Component } from "react";
import Axios from "axios";
import SingleHealthCard from "./SingleHealthCard";

class HospitalCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ""
    };
  }

  fetchInfo = () => {
    Axios.get(
      `https://iomapi.naxa.com.np/api/v1/near_by_me?type=health%20facility&count=50&distance=1&id=${localStorage.getItem("eid")}`
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
    this.props.id && localStorage.setItem("eid", this.props.id);


    return (

      <div class="space-list nearby-list">
      <ul>

      {this.state.data &&
          this.state.data.facility.map(e => {
         
              return <SingleHealthCard key ={e.id}name={e.name} />
           
          })}

      </ul>
    </div>


    );
  }
}
export default HospitalCard;
