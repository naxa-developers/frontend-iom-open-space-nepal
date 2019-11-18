import React, { Component } from 'react'


 class DetailsHeader extends Component {
    render() {
        return (
         
                <div className="space-details">
                                        <div className="space">
                                            <div className="space-content">
        <h5>{this.props.title}</h5>
                                                <p>
        <span><i className="material-icons">room</i>{this.props.location}</span>
                                                    <span><i className="material-icons">near_me</i>200 m</span>
                                                </p>
                                            </div>
                                            <div className="space-direction">
                                                <i className="material-icons">directions</i>
                                            </div>
                                        </div>
                                        <figure>
                                            <img src={this.props.image} alt="open space " />
                                        </figure>

                                    </div>
          
        )
    }
}
export default DetailsHeader;
