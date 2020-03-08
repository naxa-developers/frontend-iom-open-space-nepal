import React, { Component } from 'react'
import Navbar from "./Navbar";
import Banner from "./Banner";
import ImageSlider from "./ImageSlider";
import OpenSpace from "./OpenSpace";
// import GlimpseNew from "./GlimpseNew";
import Glimpse from './Glimpse'
import Identification from "./Identification";
import Axios from 'axios';

import Footer from "./Footer";

import Background from "../../img/banner-shape.png";
import bannerShape from "../../img/banner-shape.png";

 class Home extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
      counts: ''
     }
   }
   
   
  fetchCounts = () => {
    Axios.get(`https://iomapi.naxa.com.np/api/v1/glimpse_of_open_space`)
    .then(res => {
    
        
       console.log("res", res.data);
       
        const counts = res.data;
        this.setState({counts: counts})
        

       
        
    })
}

componentDidMount() {
  this.fetchCounts();
}
    render() {
      console.log("p", this.state.counts);
      
        return (
        
        <  >
         <section className="banner" style={{ backgroundImage: `url(${Background})` }}>
          <Navbar />
          <Banner />
        </section> 
        <main className="main-content">
        <ImageSlider />
        {/* <OpenSpace /> */}
        <Glimpse
        className= 'toggleModal'
        counts = {this.state.counts}
        />
        
        <Identification />
        
      </main>
      <footer
          className="site-footer pt-150"
          style={{ backgroundImage: `url(${bannerShape})` }}
        >
          <Footer />
        </footer>
        </ >       
            
        )
    }
}
export default Home;
