import React, { Component } from 'react'
import {connect} from 'react-redux'

 class IdentificationCard extends Component {
    render() {
    
        return (
            <div className="post-meta">
           <i class={this.props.image}></i>
           
     {/* <img src={this.props.image} style={{height:'40px', width:'auto'}}></img> */}
    <h5>{this.props.language =='0' ?
    this.props.title : this.props.title_nep}</h5>
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      language: state.language
    };
  };
  
export default connect(mapStateToProps)(IdentificationCard);