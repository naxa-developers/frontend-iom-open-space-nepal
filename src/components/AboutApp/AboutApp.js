import React, { Component } from 'react';
import Axios from 'axios';

import Navbar from '../Home/NavbarLayout';
import Footer from '../Home/Footer';
import bannerShape from '../../img/banner-shape.png';
import MapLocation from '../../img/map-pin-locations.svg'
import Steps from './Steps';
import { connect } from 'react-redux';
import DownloadApp from './DownloadApp';

 class AboutApp extends Component {

    constructor(props) {
        super(props);
        this.counter = 0;
        this.state = {
          data: ""
        };
      }

      componentDidMount() {
        window.scrollTo(0, 0)
      }
    
      fetchInfo = () => {
        Axios.get(
          `${process.env.BASE_URL}/open_space_app/`
        ).then(response => {
            console.log("app", response.data);
            
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
              <DownloadApp showViewMore={false} />
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
        <h3 class="openspace-title">{this.props.language=='0' ? this.state.data && this.state.data[0].title : this.state.data && this.state.data[0].title_nep }</h3>
                                        <p class="content-para">{this.props.language=='0' ? this.state.data && this.state.data[0].description : this.state.data && this.state.data[0].description_nep } </p>
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
                                        <h3 class="openspace-title">{this.props.language=='0' ? this.state.data && this.state.data[1].title : this.state.data && this.state.data[1].title_nep }</h3>
                                        <p class="content-para">{this.props.language=='0' ? this.state.data && this.state.data[1].description : this.state.data && this.state.data[1].description_nep }</p>
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
                                        <h3 class="openspace-title">{this.props.language=='0' ? this.state.data && this.state.data[2].title : this.state.data && this.state.data[2].title_nep }</h3>
                                        <p class="content-para">{this.props.language=='0' ? this.state.data && this.state.data[2].description : this.state.data && this.state.data[2].description_nep }</p>
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
const mapStateToProps = state => {
    return {
     language: state.language
    };
  };

  
export default connect(mapStateToProps)(AboutApp);
