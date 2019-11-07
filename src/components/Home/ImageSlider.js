import React, { Component } from 'react';
import Slider from "react-slick";
import  {connect} from 'react-redux';


import slider1 from '../../img/slider-1.jpg';
import slider2 from '../../img/slider-2.jpg';


 class ImageSlider extends Component {
    render() {
        // Use responsive slick here after calculating breakpoints
        const settings = {
            arrows: false,
            autoplay: true,
            dots: false,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1
          };

        return (
            <section className="home-slider">
            <div className="slider-wrap">
                <div className="container">
                    <div className="intro-slider">
                    <Slider {...settings}> 
                        <div className="intro-item">
                           
                            <div className="figure" style={{backgroundImage: `url(${slider1})`}}>

                            </div>
                            <h3> {this.props.language =="0" ? `Interaction with Locals and Finalization of Open Spaces` : `स्थानीयहरूसँगको अभिमुखीकरण तथा अन्तरक्रियाद्वारा खुल्ला क्षेत्र निर्धारण` }</h3>
                        </div>
                        <div className="intro-item">
                            <div className="figure" style={{backgroundImage: `url(${slider2})`}}>

                            </div>
                            <h3>{this.props.language =="0" ? `Temporary Settlement Camps` : `अस्थायी आवास शिविर` }</h3>
                        </div>
                        </Slider>
                    </div>
                    
                </div>
            </div>
        </section>
     
          
              
            
        )
    }
}
const mapStateToProps = (state) => {
    return {
         language: state.language
     }
  }
export default connect(mapStateToProps)(ImageSlider);
