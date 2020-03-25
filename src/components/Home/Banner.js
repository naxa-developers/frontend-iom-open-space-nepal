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
        Axios.get(`https://iomapi.naxa.com.np/api/v1/header/`)
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
                 {/* <div class="intro">
                    <h1>Open space mapping <span>for</span><br />humanitarian assistance</h1>
                    <p>
                        <span>Identification and Mapping of Open Spaces to strengthen emergency </span><br/>
                        <span>preparedness and to provide the initial response planning framework </span> 
                        <span>for the local governments.</span>
                    </p>

                </div> */}

                <div class="intro">


                    <h1>{this.props.language == '0' ? this.state.loader && this.state.texts[0].title1 : this.state.loader && this.state.texts[0].title_nep1}
                     
                        <span>{this.props.language == '0' ? this.state.loader && this.state.texts[0].title2 : this.state.loader && this.state.texts[0].title_nep2}</span> 
                        <br />
                        {this.props.language == '0' ? this.state.loader && this.state.texts[0].title3 : this.state.loader && this.state.texts[0].title_nep3}
                    </h1>
                    <p>
                        {this.props.language == '0' ? this.state.loader && this.state.texts[0].description : this.state.loader && this.state.texts[0].description_nep}</p>



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