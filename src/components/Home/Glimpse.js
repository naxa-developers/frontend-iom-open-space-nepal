import React, { Component } from 'react';
import countershape from '../../img/counter-shape.png'


class Glimpse extends Component {
    render() {
        return (
            <section className="glimps-counter" style={{backgroundImage: `url(${countershape})`}}>
            <div className="overlay"></div>
            <div className="glimps-wrapper">
                <div className="container">
                    <h3 className="openspace-title">Glimpse of Open Spaces in Nepal</h3>
                    <div className="row">
                        <div className="col-md-3 col-space-5">
                            <div className="glimps-count">
                                <h4>141</h4>
                                <h6>open spaces</h6>
                            </div>
                        </div>
                        <div className="col-md-3 col-space-5">
                            <div className="glimps-count">
                                <h4>13</h4>
                                <h6>Districts</h6>
                            </div>
                        </div>
                        <div className="col-md-3 col-space-5">
                            <div className="glimps-count">
                                <h4>13</h4>
                                <h6>Municipalities</h6>
                            </div>
                        </div>
                        <div className="col-md-3 col-space-5">
                            <div className="glimps-count">
                                <h4>236,364</h4>
                                <h6>Total area (sq.m)</h6>
                            </div>
                        </div>
                        <div className="col-md-3 col-space-5">
                            <div className="glimps-count">
                                <h4>105,236</h4>
                                <h6>Total capacity</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}
export default Glimpse;
