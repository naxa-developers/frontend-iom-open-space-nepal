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

import Background from "../../img/hero-img.jpg";
import bannerShape from "../../img/banner-shape.png";
import OverlayVideo from './OverlayVideo';
import DownloadApp from '../AboutApp/DownloadApp';
import YoutubePlaylist from './YoutubePlaylist';


 class Home extends Component {
   constructor(props) {
     super(props)
   
     this.state = {
      counts: ''
     }
   }
   
   
  fetchCounts = () => {
    Axios.get(`${process.env.BASE_URL_API}/glimpse_of_open_space`)
    .then(res => {
        const counts = res.data.data;
        
        let mun = Object.values(counts.municipality_list);
        let munArray = [];
        mun.map((m) => {   
          munArray.push(Object.keys(m)[0]);
          
        })
       
        this.setState({counts: counts})  
        
    })
}

componentDidMount() {
  // this.fetchCounts();
}
    render() {
    console.log('urllll', process.env.BASE_URL_API);
      
        return (
        
        <div className='page-content'>
         <OverlayVideo />
         <section className="banner" style={{ backgroundImage: `url(${Background})` }}>
          <Navbar />
          <Banner />
        </section> 
        <main className="main-content">
          <YoutubePlaylist />
        <Identification />
        <OpenSpace />
        <Glimpse
        className= 'toggleModal'
        counts = {this.state.counts}
        />
          
      </main>
      <footer
          className="site-footer pt-150"
          style={{ backgroundImage: `url(${bannerShape})` }}
        >
          <Footer />
        </footer>
    
        </div>       
            
        )
    }
}
export default Home;
