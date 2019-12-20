import React, { Component } from 'react'
import Axios from 'axios';
import SingleSecurity from './SingleSecurity';
import SingleEcard from './SingleEcard'

class SecurityCard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: "",
          ActiveRouteindex:null
        };
      }
    
      fetchInfo = () => {
        Axios.get(
          `https://iomapi.naxa.com.np/api/v1/near_by_me?type=security%20force&count=10&distance=1&id=${localStorage.getItem("OpenspaceID")}`
        ).then(response => {
          console.log("ë...............................................................................",response)
          
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
      this.props.id && localStorage.setItem("OpenspaceID", this.props.id);
      console.log("t" ,this.state.data.facility);
      
        return (
          <div class="space-list nearby-list">
          <ul>
           

          {this.state.data && this.state.data.facility.length > 0 ? 
          this.state.data.facility.map((e,i) => {
         
              return <SingleEcard
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
                  name={e.name}
                    />;

          })
          : <h7>There is no data available at the moment.</h7>
          }

            </ul>
            </div>
        )
    }
}
export default SecurityCard;