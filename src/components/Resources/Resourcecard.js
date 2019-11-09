import React, { Component } from 'react';
import Axios from 'axios';


class Resourcecard extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             files: []
        }
    }
    

    // componentDidMount(){
    //     Axios({
    //         url: 'http://139.59.67.104:8011/api/v1/resource/',
    //         method: 'GET',
    //         responseType: 'blob',
    //     })
    //     .then(response=>{
    //         console.log('api', response.data);
            
    //         this.setState({files:response.data})
    //         console.log("download", this.state.files);
            
    //     })

    // }
    
    render() {
        return (
            <>
                <div className="row-section-wrap">
                    <div className="row">
                        <div className="col-12 col-md-9">
                            <div className="content-wrapper">
                                <div className="image-section">
                                    <figure>
                                        <img src={this.props.image} alt="" />
                                    </figure>
                                </div>
                                <div className="content-col-wrap">
                                    <div className="content-element-wrap">
                                        <h3 className="h3-title">{this.props.title}</h3>
                                        <span className="datetime">{this.props.date}</span>
                                        <p>{this.props.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-3">
                            <div className="download-section">
                                <div className="icon-wrap-section">
                                   <button className="btn btn-share"><i className="humanitarian-icon-Share"></i></button> 
                                   <a href="http://139.59.67.104:8011/media/video/1._Welcome_To_The_Course.mp4" download>  <button className="btn btn-download"><i className="humanitarian-icon-Download"></i></button></a>
                                </div>
                                <div className="para-wrap-section">
                                    <p className="para-details-block">
                                        <span className="title">Type</span>
                                        <span className="subtitle">{this.props.document_type}</span>
                                    </p>
                                    <p className="para-details-block">
                                        <span className="title">Category</span>
                                        <span className="subtitle">{this.props.categories}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default Resourcecard;