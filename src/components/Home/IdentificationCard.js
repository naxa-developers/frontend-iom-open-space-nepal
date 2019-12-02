import React, { Component } from 'react'

 class IdentificationCard extends Component {
    render() {
        console.log(this.props.no);
        
        return (
            <div className="post-meta">
            <figure>
                <img src={this.props.image} alt="post" />
            </figure>
    <h5><span>{this.props.no}.</span>{this.props.title}</h5>
       </div>
        )
    }
}
export default IdentificationCard;