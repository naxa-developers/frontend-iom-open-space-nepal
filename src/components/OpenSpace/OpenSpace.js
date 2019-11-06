import React, { Component } from 'react'
import Navbar from '../Home/Navbar'
import OpenSpaceImage from '../../img/find_open_space.png'

class OpenSpace extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <img src={OpenSpaceImage} style={{margin:'3% 15%'}}></img>
                </div>
                
            </div>
        )
    }
}
export default OpenSpace;
