import React, { Component } from 'react';
import Axios from 'axios';

import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import bannerShape from '../../img/banner-shape.png';
import MapLocation from '../../img/map-pin-locations.svg'
import Steps from './Steps';

 class AboutApp extends Component {

    constructor(props) {
        super(props);
        this.counter = 0;
        this.state = {
          data: ""
        };
      }
    
      fetchInfo = () => {
        Axios.get(
          `http://139.59.67.104:8011/api/v1/open_space_app/`
        ).then(response => {
          this.setState({
            data: response.data
          });
        });
      };
      componentDidMount() {
        this.fetchInfo();
      }


    render() {
     console.log(this.state.data);
     
        
        return (
            <div className="app-page">
                <Navbar />
                <div className="app-section mb-150 pt-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <figure className="app-figure flex-end">
                                    <img src={require('../../img/app-banner.png')} alt="app" />
                                </figure>
                            </div>
                            <div className="col-md-6">
                                <figure className="app-content">
                                    <span className="sub-title">Get started with</span>
                                    <h3 className="openspace-title">OPEN SPACES App</h3>
                                    
                                    <div className="app-icons-content">
                                        
                                        <h4>Download now</h4>
                                        <div className="app-icon flex-start">
                                            <figure>
                                                <img src={require('../../img/appstore.png')} alt="ios" />
                                            </figure>
                                            <figure>
                                                <img src={require('../../img/googleplay.png')} alt="android" />
                                            </figure>
                                        </div>
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
            </div>
            <main className="main-content">
            <div className="container">
            <div class="row-wrap">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="content-text">
                                <div class="content-center">
                                    <figure>
                                        <img src={this.state.data&&this.state.data[0].icon} alt="location" />
                                    </figure>
                                    <div class="content-title">
        <h3 class="openspace-title">{this.state.data&&this.state.data[0].title}</h3>
                                        <p class="content-para">{this.state.data&&this.state.data[0].description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="content-image">
                                <figure>
                                    <img src={this.state.data&&this.state.data[0].image} alt="find-space" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- second-row --> */}
                <div class="row-wrap">
                    <div class="row">
                        <div class="col-12 col-md-6 order-sm-1 order-md-0">
                            <div class="content-image">
                                <figure>
                                    <img src={this.state.data&&this.state.data[1].image} alt="" />
                                </figure>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 order-sm-0 order-md-1">
                            <div class="content-text">
                                <div class="content-center">
                                    <figure>
                                        <img src={this.state.data&&this.state.data[1].icon} alt="" />
                                    </figure>
                                    <div class="content-title">
                                        <h3 class="openspace-title">{this.state.data&&this.state.data[1].title}</h3>
                                        <p class="content-para">{this.state.data&&this.state.data[1].description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- third-row --> */}
                <div class="row-wrap">
                    <div class="row">
                        <div class="col-12 col-md-6 ">
                            <div class="content-text">
                                <div class="content-center">
                                    <figure>
                                        <img src={this.state.data&&this.state.data[2].icon} alt="" />
                                    </figure>
                                    <div class="content-title">
                                        <h3 class="openspace-title">{this.state.data&&this.state.data[2].title}</h3>
                                        <p class="content-para">{this.state.data&&this.state.data[2].description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="content-image">
                                <figure>
                                    <img src={this.state.data&&this.state.data[2].image} alt="" />
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row-wrap">
                {/* {this.state.data&&this.state.data.map((d,i) => { 
                    
                      return  <Steps 
                        counter = {this.counter}
                        key={d.id}
                        count = {i}
                        title ={d.title}
                        image = {d.image}
                        icon = {d.icon}
                        description = {d.description}

                        />
                     
                      
                    }
                    ) }  */}
                    
                {/* </div> */} 
            </div>
            
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
export default AboutApp;
