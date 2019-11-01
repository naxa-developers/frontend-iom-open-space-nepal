import React, { Component } from 'react';


import Navbar from './Home/Navbar';
import Banner from './Home/Banner';
import ImageSlider from './Home/ImageSlider';
import OpenSpace from './Home/OpenSpace';
import Glimpse from './Home/Glimpse';


import '../scss/style.scss';
import '../css/style.css'
import Background from '../img/banner-shape.png'



class App extends Component {
    render() {
        return (
                <div className="">
                  {/* header start */}
                       <section className="banner" style={{backgroundImage: `url(${Background})`}} >
                          <header className="site-header">
                              <div className="container">
                                <div className="headerWrap">
                                  <Navbar />
                                 </div>
                              </div>
                            </header>

                            <Banner />

                        </section>

                        {/* slider start */}
                        <main className="main-content">
                          <ImageSlider />
                          <OpenSpace />
                          <Glimpse />
                        </main>
                   </div>     
        )
    }
}

export default  App;