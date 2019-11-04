import React, { Component } from 'react';
import  {connect} from 'react-redux';

import logo from '../../img/logo.png';
import nepal from '../../img/nepal.png';
import uk from '../../img/uk.png';




 class Navbar extends Component {
    render() {
    console.log(this.props);
     const { contents } = this.props;
        
         return (
            <>
             <header className="site-header">
                              <div className="container">
                                <div className="headerWrap">
                    <div className="headLeft">
                       
                        <div className="logo">
                          
                            <a href="index.html"><img src={logo} alt="logo" /></a>
                        </div>
                    </div>

                    <div className="headRight">
                        <div className="country-logos flex-end">
                            <a className="active" href="#">
                                <img src={uk} alt="uk" onClick = { () => this.props.dispatch(
                                    {type: 'english'}
                                )}/>
                            </a>
                            <a href="#">
                                <img src={nepal} alt="Nepal" onClick={ () => this.props.dispatch(
                                    {type:'nepali'}
                                    )}/>
                            </a>
                        </div>
                        <nav id="site-navigation" className="main-navigation" role="navigation">
                            <div className="toggle-button">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="menu-primary-container">
                                <ul id="primary-menu" className="menu nav-menu">
                                    <li className="menu-item ">
                                        <a>{this.props.language=='0'?'Resources':"स्रोतहरु"}</a>
                                    </li>
                                    <li className="menu-item ">
                                        <a href="#">{this.props.language=='0'?'Reports':"रिपोर्ट"}</a>
                                    </li>
                                    <li className="menu-item menu-item-has-current">
                                        <a href="#">{this.props.language=='0'?'Find Open Space ':"खुल्ला क्षेत्र पत्ता लगाउनुहोस"}</a>
                                    </li>
                                    <li className="menu-item ">
                                        <a href="#"> {this.props.language=='0'?'about app':"हाम्रो बारे"}</a>
                                    </li>

                                </ul>
                            </div>
                        </nav>
                    </div>
            </div>
            </div>
            </header>
                </>
           
        )
    }
}

const mapStateToProps = (state) => {
   return {
        language: state.language
    }
 }

export default connect(mapStateToProps)(Navbar);
