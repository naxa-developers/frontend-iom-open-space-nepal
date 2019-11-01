import React, { Component } from 'react';
import video from '../../img/video.jpg';
import play from '../../img/play.png'

class OpenSpace extends Component {
    render() {
        return (
            <section className="video-section ptb-150">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-8">
                        <div className="video" style={{backgroundImage: `url(${video})`}}>
                            <div className="overlay"></div>
                            {/* <a className="material-icons" href="play_circle_filled" > <img src={play} /></a> */}
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <div className="video-content flexvr">
                            <h3 className="openspace-title">What is open space ?</h3>
                            <p>In the event of disasters, when the house is demolished or is unsafe to live, the
                                population
                                and communities affected by the disaster use the open space for emergency shelter.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}
export default OpenSpace;
