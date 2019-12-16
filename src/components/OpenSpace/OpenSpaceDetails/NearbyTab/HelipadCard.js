import React, { Component } from 'react'

 class HelipadCard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: "",
         
        };
      }
    
    fetchInfo = () => {
        Axios.get(
          `https://iomapi.naxa.com.np/api/v1/near_by_me?type=helipad&count=50&distance=1&id=${localStorage.getItem("openspaceID")}`
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
        return (
            <div class="space-list nearby-list">
            <ul>
      
            {this.state.data && this.state.data.facility.length > 0 ? 
                this.state.data.facility.map((e,i) => {
               
                    return <SingleEcard
                    
                    
                    />
                 
                })
              : <h7>There is no data available</h7>
              }
      
            </ul>
          </div>
        )
    }
}
export default HelipadCard;
