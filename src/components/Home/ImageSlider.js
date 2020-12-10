import React, { Component } from "react";
import Slider from "react-slick";
import SingleSlider from "./SingleSlider";
import { connect } from "react-redux";
import Axios from "axios";
import SliderArrow from './SliderArrow';

class ImageSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderData: null
    };
  }

  componentDidMount() {
    Axios.get(`${process.env.BASE_URL_API}/slider/`).then(res => {
      const Sliderdata = res.data;
      this.setState({ sliderData: Sliderdata });
    
    });
  }
  render() {
  

    // Use responsive slick here after calculating breakpoints
    const settings = {

      // arrows: true,
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
               {this.state.sliderData&&this.state.sliderData.map( (e) => { 
                       return <SingleSlider key={e.id} title = {e.title} title_nep={e.title_nep} image={e.image} />
                     } )} 
              </Slider>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => {
  return {
    language: state.language
  };
};
export default connect(mapStateToProps)(ImageSlider);
