import React, { Component } from 'react';
import './OpenSpaceCSS.css'

class OpenSpaceCard extends Component {
    render() {
        console.log(this.props.image);
        
        return (
            <>
                <li>
                    <div className="space">
                        <figure>
                            <img
                                src={`http://139.59.67.104:8011${this.props.image}`}
                                alt="space"
                            />
                        </figure>
                        <div className="space-content">
                            <h5>{this.props.name}</h5>
                            <p>
                                <span>
                                    <i className="material-icons">room</i>{this.props.address}
                          </span>
                                {/* <span>
                                    <i className="material-icons">near_me</i>200 m
                          </span> */}
                            </p>
                        </div>
                    </div>
                    <div className="space-direction">
                        <i className="material-icons">directions</i>
                    </div>
                </li>
            </>
        );
    }
}

export default OpenSpaceCard;