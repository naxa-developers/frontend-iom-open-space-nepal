import React, { Component } from 'react'
import {connect} from 'react-redux'

 class IdentificationCard extends Component {
    render() {
        
        
        return (
            <div className="post-meta">
            <figure style={{ height: 300, width:500,backgroundImage: `url('${this.props.image}')`}}
            >
            
                {/* <img src={this.props.image} alt="post" /> */}
            </figure>
    <h5><span>{this.props.no+1}</span>{this.props.language =='0' ?
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