import React, { Component } from 'react'
import Ratnapark from '../../../img/space-details.jpg'

 class DetailsHeader extends Component {
    render() {
        return (
         
                <div className="space-details">
                                        <div className="space">
                                            <div className="space-content">
                                                <h5>Ratna Park</h5>
                                                <p>
                                                    <span><i className="material-icons">room</i>Ratna park,
                                                        kathmandu 44600</span>
                                                    <span><i className="material-icons">near_me</i>200 m</span>
                                                </p>
                                            </div>
                                            <div className="space-direction">
                                                <i className="material-icons">directions</i>
                                            </div>
                                        </div>
                                        <figure>
                                            <img src={Ratnapark} alt="ratna park" />
                                        </figure>

                                    </div>
          
        )
    }
}
export default DetailsHeader;
