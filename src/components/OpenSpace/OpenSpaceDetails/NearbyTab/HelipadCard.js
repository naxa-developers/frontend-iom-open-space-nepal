import React, { Component } from 'react'
import Axios from 'axios'
import SingleEcard from './SingleEcard'

 class HelipadCard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: "",
          ActiveRouteindex:null
         
        };
      }
    
    fetchInfo = () => {
        Axios.get(
          `https://iomapi.naxa.com.np/api/v1/near_by_me?type=helipad&count=50&distance=5&id=${localStorage.getItem("OpenspaceID")}`
        ).then(response => {
            // console.log("heli",response.data);
            
          this.setState({
            data: response.data
          });
        });
      };
      setActivefalse=(e)=>{
        this.setState({ActiveRouteindex:e})
      }
      componentDidMount() {
        this.fetchInfo();
      }
    render() {
        // console.log("on heli",localStorage.getItem("OpenspaceID"));
        
        return (
            <div class="space-list nearby-list">
            <ul>
      
            {this.state.data && this.state.data.facility.length > 0 ? 
                this.state.data.facility.map((e,i) => {
               
                    return <SingleEcard
                    reff={this.props.reff}
                    name = "Helipad"
                    setActivefalse={this.setActivefalse}
                    ActiveRoute={this.state.ActiveRouteindex}
                    index={i}
                    
                     fetchroute={this.props.fetchroute}
                      remove={this.props.remove} 
                      legend={this.props.legend} 
                      reff={this.props.reff}
                       OSlatlng={this.props.OSlatlng}
    
                       latlng={[e.latitude, e.longitude]}
                        key={e.id} 
                    
                    
                    />
                 
                })
              : <h7>There is no data available at the moment.</h7>
              }
      
            </ul>
          </div>
        )
    }
}
export default HelipadCard;
