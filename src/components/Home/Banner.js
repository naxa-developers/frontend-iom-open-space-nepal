import React, { Component } from 'react';
import { connect } from 'react-redux';

import Axios from 'axios';


class Banner extends Component {
    constructor(props) {
        super(props)

        this.state = {
            texts: '',
            loader: false


        }
    }
    getData() {
        Axios.get(`${process.env.BASE_URL_API}/header/`)
            .then(res => {
                const text = res.data;

                this.setState({
                    texts: text,
                    loader: true

                })
            })

    }
    componentDidMount() {
        this.getData();


    }


    render() {


        return (

            <div className="banner-content">

                <div className={this.props.language == '0' ? "intro" : "intro-nepali"}>


                    <h1>{this.props.language == '0' ? this.state.loader && this.state.texts[0].title1 : this.state.loader && this.state.texts[0].title_nep1}

                        <span> {this.props.language == '0' ? this.state.loader && this.state.texts[0].title2 : this.state.loader && this.state.texts[0].title_nep2}</span>
                        <br />
                        {this.props.language == '0' ? this.state.loader && this.state.texts[0].title3 : this.state.loader && this.state.texts[0].title_nep3}
                    </h1>
                    <p>
                        {this.props.language == '0' ? this.state.loader && this.state.texts[0].description : this.state.loader && this.state.texts[0].description_nep}</p>



                </div>
                <div className="app-icons-content" style={{
                    marginLeft: '40vw',
                    marginTop: '18px'
                }}>

                    {/* <h4>{ this.props.language=='0' ? 'Download now' : 'डाउनलोड गर्नुहोस्' }</h4> */}
                    <div className="app-icon flex-start">
                        <figure>
                            <a href='https://apps.apple.com/sk/app/open-space-nepal/id1534918535' target='_blank'>
                                <img src={require('../../img/appstore.png')} alt="ios" />
                            </a>
                        </figure>
                        <figure>
                            <a href='https://play.google.com/store/apps/details?id=com.iom.openspaces&hl=en&gl=US' target='_blank'>
                                <img src={require('../../img/googleplay.png')} alt="android" />
                            </a>
                        </figure>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.language
    }
}


export default connect(mapStateToProps)(Banner);