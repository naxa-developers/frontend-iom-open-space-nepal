import React, { Component } from 'react';
import Slider from "react-slick";

import slider1 from '../../img/slider-1.jpg';
import slider2 from '../../img/slider-2.jpg';


 class ImageSlider extends Component {
    render() {
        // Use responsive slick here after calculating breakpoints
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
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
                            <h3>Interaction with Locals and Finalization of Open Spaces</h3>
                        </div>
                        <div className="intro-item">
                            <div className="figure" style={{backgroundImage: `url(${slider2})`}}>

                            </div>
                            <h3>Temporary Settlement Camps</h3>
                        </div>
                        </Slider>
                    </div>
                    
                </div>
            </div>
        </section>
     
          
              
            
        )
    }
}
export default ImageSlider;
