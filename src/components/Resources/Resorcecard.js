import React, { Component } from 'react';

class Resorcecard extends Component {
    render() {
        return (
            <>
                <div className="row-section-wrap">
                    <div className="row">
                        <div className="col-12 col-md-9">
                            <div className="content-wrapper">
                                <div className="image-section">
                                    <figure>
                                        <img src={require('../../img/resources-img1.png')} alt="" />
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
                                    <button className="btn btn-download"><i className="humanitarian-icon-Download"></i></button>
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

export default Resorcecard;