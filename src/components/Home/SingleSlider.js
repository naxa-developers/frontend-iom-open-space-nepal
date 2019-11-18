import React, { Component } from 'react'
import { connect } from "react-redux"

 class SingleSlider extends Component {
    render() {
        return (
            <div className="intro-item">
                           
            <div className="figure" style={{backgroundImage: `url(${this.props.image})`}}>

            {/* <div className="figure" > <img src ={this.props.image} /> */}
            </div>
            <h3> {this.props.language =="0" ? this.props.title : this.props.title_nep  }</h3>     
        </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      language: state.language
    };
  };
export default connect(mapStateToProps)(SingleSlider);
