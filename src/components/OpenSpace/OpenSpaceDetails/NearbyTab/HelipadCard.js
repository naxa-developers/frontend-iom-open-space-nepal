import React, { Component } from 'react'
import Axios from 'axios'
import SingleEcard from './SingleEcard'

 class HelipadCard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: "",
         
        };
      }
    
    fetchInfo = () => {
        Axios.get(
          `https://iomapi.naxa.com.np/api/v1/near_by_me?type=helipad&count=50&distance=5&id=${localStorage.getItem("OpenspaceID")}`
        ).then(response => {
            console.log("heli",response.data);
            
          this.setState({
            data: response.data
          });
        });
      };
  
      componentDidMount() {
        this.fetchInfo();
      }
    render() {
        console.log("on heli",localStorage.getItem("OpenspaceID"));
        
        return (
            <div class="space-list nearby-list">
            <ul>
      
            {this.state.data && this.state.data.facility.length > 0 ? 
                this.state.data.facility.map((e,i) => {
               
                    return <SingleEcard
                    name = "Helipad"
                    
                    
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
