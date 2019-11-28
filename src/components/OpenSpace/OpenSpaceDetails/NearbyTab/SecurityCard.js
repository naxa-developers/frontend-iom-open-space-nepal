import React, { Component } from 'react'
import Axios from 'axios';

class SecurityCard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: ""
        };
      }
    
      fetchInfo = () => {
        Axios.get(
          `https://iomapi.naxa.com.np/api/v1/near_by_me?type=security%20force&count=100&distance=500&id=${this.props.id}`
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
            <div>
                <p>Securityyyyyyyyy</p>
            </div>
        )
    }
}
export default SecurityCard;