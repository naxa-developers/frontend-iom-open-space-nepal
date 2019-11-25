import React, { Component } from 'react';
import Axios from 'axios';

import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

import bannerShape from '../../img/banner-shape.png';
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
              
                <div className="row-wrap">
                {this.state.data&&this.state.data.map((d,i) => { 
                    
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
                    ) } 
                    
                </div>
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
