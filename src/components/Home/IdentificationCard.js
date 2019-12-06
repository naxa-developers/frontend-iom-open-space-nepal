import React, { Component } from 'react'

 class IdentificationCard extends Component {
    render() {
        
        
        return (
            <div className="post-meta">
            <figure style={{ height: 300, width:500,backgroundImage: `url('${this.props.image}')`}}
            >
            
                {/* <img src={this.props.image} alt="post" /> */}
            </figure>
    <h5><span>{this.props.no+1}</span>{this.props.title}</h5>
       </div>
        )
    }
}
export default IdentificationCard;