import React, { Component } from "react";
import SingleEcard from "./SingleEcard";
import Axios from "axios";

class EducationCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      ActiveRouteindex:null
      

    };
  }


  fetchInfo = () => {

    Axios.get(
      `https://iomapi.naxa.com.np/api/v1/near_by_me?type=education%20facility&count=100&distance=2&id=${localStorage.getItem(
        "OpenspaceID"
      )}`
    ).then(response => {
      this.setState({
        data: response.data
      });
    });
  };
  componentDidMount() {
    setTimeout(()=>this.fetchInfo(),500)
    


  }
  setActivefalse=(e)=>{
    this.setState({ActiveRouteindex:e})
  }
  render() {
    console.log(this.props.OSlatlng, 'oslatlngedu')

    this.props.id && localStorage.setItem("OpenspaceID", this.props.id);

    return (
      <>

        <div class="space-list nearby-list">
          <ul>

            {this.state.data &&
              this.state.data.facility.map((e,i) => {

                return <SingleEcard
                setActivefalse={this.setActivefalse}
                ActiveRoute={this.state.ActiveRouteindex}
                index={i}
                
                 fetchroute={this.props.fetchroute}
                  remove={this.props.remove} 
                  legend={this.props.legend} reff={this.props.reff} OSlatlng={this.props.OSlatlng} key={e.id} name={e.name} latlng={[e.latitude, e.longitude]} />;
              })}

          </ul>
        </div>
      </>
    );
  }
}
export default EducationCard;
