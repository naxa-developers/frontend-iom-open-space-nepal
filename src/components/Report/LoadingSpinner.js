import React, { Component } from 'react'
import Loader from '../../img/loader.gif'

 class LoadingSpinner extends Component {
    render() {
        return (
            <div >
               <img  style={{backgroundColor:'white',width:40}} src={require('../../img/loader.gif')} alt="loading..." />
            </div>
        )
    }
}
export default LoadingSpinner;
