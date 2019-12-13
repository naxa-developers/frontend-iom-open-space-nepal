import React, { Component } from 'react'
import Axios from 'axios';
import SingleSecurity from './SingleSecurity';

class SecurityCard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: ""
        };
      }
    
      fetchInfo = () => {
        Axios.get(
          `https://iomapi.naxa.com.np/api/v1/near_by_me?type=security%20force&count=10&distance=1&id=${localStorage.getItem("OpenspaceID")}`
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
      this.props.id && localStorage.setItem("OpenspaceID", this.props.id);
        return (
          <div class="space-list nearby-list">
          <ul>
           

          {this.state.data &&
          this.state.data.facility.map((e) => {
         
              return <SingleSecurity
               key ={e.id}
               name={e.name}
             
              
              />
           
          })}

            </ul>
            </div>
        )
    }
}
export default SecurityCard;