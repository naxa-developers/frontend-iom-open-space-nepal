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
   constructor(props) {
     super(props)
   
     this.state = {
        toggle: false
     }
   }

  toggleButton = (event) => {
    event.preventDefault();
    console.log("toggle now");
  
    this.setState({
       toggle: !this.state.toggle

       });
      }
    render() {
        return (
        
        < body className={this.state.toggle? "Is-toggle": ""}>
         <section className="banner" style={{ backgroundImage: `url(${Background})` }}>
          <Navbar toggle = {this.state.toggle} onToggle = {this.toggleButton} />
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
        </ body>       
            
        )
    }
}
export default Home;
