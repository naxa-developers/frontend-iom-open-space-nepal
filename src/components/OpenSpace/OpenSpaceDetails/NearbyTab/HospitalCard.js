import React, { Component } from "react";
import Axios from "axios";
import SingleHealthCard from "./SingleHealthCard";
import SingleEcard from "./SingleEcard";

class HospitalCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      ActiveRouteindex: null
    };
  }

  fetchInfo = () => {
    Axios.get(
      `${process.env.BASE_URL}/near_by_me?type=Health%20Facility&count=50&distance=1&id=${localStorage.getItem("eid")}`
    ).then(response => {
      this.setState({
        data: response.data
      });
    });
  };


  setActivefalse = (e) => {
    this.setState({ ActiveRouteindex: e })
  }
  componentDidMount() {
    this.fetchInfo();
  }

  render() {
    this.props.id && localStorage.setItem("eid", this.props.id);


    return (

      <div class="space-list nearby-list">
        <ul>

          {this.state.data && this.state.data.facility.length > 0 ?
            this.state.data.facility.map((e, i) => {

              return <SingleEcard
                reff={this.props.reff}
                key={e.id}
                name={e.name}
                setActivefalse={this.setActivefalse}
                ActiveRoute={this.state.ActiveRouteindex}
                index={i}

                fetchroute={this.props.fetchroute}
                remove={this.props.remove}
                legend={this.props.legend}
                reff={this.props.reff}
                OSlatlng={this.props.OSlatlng}

                latlng={[e.latitude, e.longitude]}

              />

            })
            : <h7 style={{ fontSize: '0.9rem', color: '#6D6E71' }}>There is no data available at the moment</h7>
          }

        </ul>
      </div>


    );
  }
}
export default HospitalCard;
