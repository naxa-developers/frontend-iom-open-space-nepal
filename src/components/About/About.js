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
import Axios from 'axios';

 class About extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              header:''
         }
     }
     componentDidMount() {
         Axios.get(`https://iomapi.naxa.com.np/api/v1/about_header/`).then(
             res => {
                 this.setState({header: res.data[0]})
             }
         )
     }
     
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
                    {this.state.header&& this.props.language == '0' ? this.state.header.title : this.state.header&&this.state.header.title_nep}
                    </p>
                    <p className="about-body">
                    {this.state.header&& this.props.language == '0' ? this.state.header.description : this.state.header&&this.state.header.description_nep}
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