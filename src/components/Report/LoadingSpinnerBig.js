
import React, { Component } from 'react'


 class LoadingSpinner extends Component {
    render() {
        return (
            <div >
               <img  style={{width: '90px'}} src={require('../../img/loader_big.gif')} alt="loading..." />
            </div>
        )
    }
}
export default LoadingSpinner;

