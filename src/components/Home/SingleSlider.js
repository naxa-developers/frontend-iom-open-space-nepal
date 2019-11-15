import React, { Component } from 'react'

 class SingleSlider extends Component {
    render() {
        return (
            <div className="intro-item">
                           
            <div className="figure" style={{backgroundImage: `url(http://139.59.67.104:8011/media/slider/tab_Y99gsp8.jpg)`}}>

            </div>
            <h3> {this.props.language =="0" ? this.props.title : this.state.props.title_nep  }</h3>     
        </div>
        )
    }
}
export default SingleSlider;
