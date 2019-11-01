import React, { Component } from 'react';
import Slider from "react-slick";

import slider1 from '../../img/slider-1.jpg';
import slider2 from '../../img/slider-2.jpg';


 class ImageSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };

        return (
           
            <section class="home-slider">
                <div class="slider-wrap">
                    <div class="container">
                       <h1>Space for Slider</h1>
                   </div>
                </div>
            </section>
        
        
        /* // <Slider {...settings}>
        // <div>
        //     <h1>ghgfjhs</h1>
        //     <h2>fhjshgf</h2>
        // </div>
        // <div>
        //     <h1>wwwww</h1>
        //     <h2>fhjshgf</h2>
        // </div> */
        //   {/* <div>
        //     <h3>1st item</h3>
        //     <img src={slider1} className ="sliderImage"></img>
        //   </div>
        //   <div>
        //     <h3>2nd item</h3>
        //     <img src={slider2} className ="sliderImage"></img>
        //   </div>
        //   <div>
        //     <h3>3rd item</h3>
        //     <img src={slider1} className ="sliderImage"></img>
        //   </div>
        //   <div>
        //     <h3>4th item</h3>
        //     <img src={slider2} className ="sliderImage"></img>
        //   </div>
        //   <div>
        //     <h3>5th item </h3>
        //     <img src={slider1} className ="sliderImage"></img>
        //   </div>
        //   <div>
        //     <h3>6th item </h3>
        //     <img src={slider2} className ="sliderImage"></img>
        //   </div> */}
        // </Slider>
                 
              
            
        )
    }
}
export default ImageSlider;
