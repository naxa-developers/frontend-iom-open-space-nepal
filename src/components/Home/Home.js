import React, { Component } from 'react'
import Navbar from "./Navbar";
import Banner from "./Banner";
import ImageSlider from "./ImageSlider";
import OpenSpace from "./OpenSpace";
import Glimpse from "./Glimpse";
import Identification from "./Identification";

import Footer from "./Footer";

import Background from "../../img/banner-shape.png";
import bannerShape from "../../img/banner-shape.png";

 class Home extends Component {
    render() {
        return (
         <>
        
         <section className="banner" style={{ backgroundImage: `url(${Background})` }}>
          <Navbar />
          <Banner />
        </section> 
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
         </>       
            
        )
    }
}
export default Home;
