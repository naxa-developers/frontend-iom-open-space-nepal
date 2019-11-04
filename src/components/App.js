import React, { Component } from "react";

import Navbar from "./Home/Navbar";
import Banner from "./Home/Banner";
import ImageSlider from "./Home/ImageSlider";
import OpenSpace from "./Home/OpenSpace";
import Glimpse from "./Home/Glimpse";
import Identification from "./Home/Identification";
import Footer from "./Home/Footer";
// import {Provider } from 'react-redux';
// import store from '../store';

import "../scss/style.scss";
import "../css/style.css";
import Background from "../img/banner-shape.png";
import bannerShape from "../img/banner-shape.png";

class App extends Component {
  render() {
    return (
      <div className="">
        {/* header start */}
        <section
          className="banner"
          style={{ backgroundImage: `url(${Background})` }}>
          <Navbar />
          <Banner />
        </section>

        {/* slider start */}
        <main className="main-content">
          <ImageSlider />
          <OpenSpace />
          <Glimpse />
          <Identification />
        </main>
        <footer
          className="site-footer pt-150"
          style={{ backgroundImage: `url(${bannerShape})` }}
        >
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
