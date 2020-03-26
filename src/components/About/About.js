import React, { Component } from 'react';
import Navbar from '../Home/NavbarLayout';
import Footer from '../Home/Footer';
import Openspace from '../Home/OpenSpace'
import { Row, Col, Tab, Nav } from 'react-bootstrap'


import bannerShape from '../../img/banner-shape.png'
import { connect } from 'react-redux';
import aboutBg from '../../img/About-bg.png'
import logo from '../../img/header-logo.png'
import Criteria from './Criteria';

 class About extends Component {
    render() {
        return (
            <>
             <div class="page-wrap">
         <Navbar />
          <section className="banner about-banner" style={{backgroundImage:`url(${aboutBg})`}}>
            <div className="banner-wrap">
                <div className="banner-image">
                    <img src={logo} alt="" />
                </div>
                <div className="banner-para">
                    <p className="banner-title">
                        Open spaces are identified and mapped with the aim to strengthen emergency preparedness and to provide the initial response planning framework for the local governments and partner agencies to be able to have a starting point from which to provide life-saving assistance to those in immediate need including the displaced population. 
                    </p>
                    <p className="about-body">
                        The importance of identification and mapping of open spaces for preparedness and risk reduction is also reflected in the National Policy for Disaster Risk Reduction 2018 for Nepal.
                    </p>
                </div>
            </div>
        </section>
  
<Criteria />
                
                <footer
                    classNameName="site-footer pt-150"
                    style={{ backgroundImage: `url(${bannerShape})` }}
                >
                    <Footer />
                </footer>
                </div>
            </>
           
        )
    }
}

const mapStateToProps = state => {
    return {
      language: state.language
    };
  };
  
  export default connect(mapStateToProps)(About);