import React, { Component } from 'react'
import SingleEcard from './SingleEcard';
import Axios from 'axios';

 class EducationCard extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          data: ""
        };
      }
    
      fetchInfo = () => {
        Axios.get(
          `http://139.59.67.104:8011/api/v1/near_by_me?type=education%20facility&count=100&distance=3&id=${this.props.id}`
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
            <span>
            {this.state.data &&this.state.data.facility.map(e => {
             
                  return <SingleEcard key ={e.id}name={e.name} />
               
              })}
              </span>
        )
    }
}
export default EducationCard;
