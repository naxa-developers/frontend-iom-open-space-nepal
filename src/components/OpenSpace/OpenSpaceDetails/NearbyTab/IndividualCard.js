import React, { Component } from 'react'

 class IndividualCard extends Component {
 
     
    render() {
console.log("rendered");

        return (
            <div>
        {this.props.name}
        </div>
        )
    }
}
export default IndividualCard;
