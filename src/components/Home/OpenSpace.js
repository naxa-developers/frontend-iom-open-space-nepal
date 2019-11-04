import React, { Component } from 'react';
import video from '../../img/video.jpg';
import play from '../../img/play.png'
import { connect } from 'react-redux';

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
                            <h3 className="openspace-title"> { this.props.language =="0" ? `What is open space ?`: `खुल्ला क्षेत्र के हो?`}</h3>
                            <p> { this.props.language =="0" ? `In the event of disasters, when the house is demolished or is unsafe to live, the
                                population
                                and communities affected by the disaster use the open space for emergency shelter.` : 'कुनै पनि विपद्को समयमा घर भत्किएको या बस्न सुरक्षित नभएको अवस्थामा, विपद् बाट प्रभावित जनसंख्या र समुदायले आक्समिक आश्रयकालागि खुल्ला क्षेत्रको प्रयोग गर्छन् । विपद्को समयमा खुल्ला क्षेत्र आश्रयकालागि मात्र नभई आक्समिक खानेपानी, सरसफाई तथा स्वच्छता प्रर्बधन, स्वास्थय सेवा, बाल,युवा तथा महिला मैत्री स्थान, राहत वितरणका लागी पनि खुल्ला क्षेत्र आवश्यक पर्दछ । यसैले आक्समिक विपद् पुर्वतयारी गर्दा नै खुल्ला क्षेत्रको पहिचान र संरक्षण अपरिहार्य छ । '}
</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}
const mapStateToProps = (state) => {
    return {
         language: state.language
     }
  }
export default connect(mapStateToProps)(OpenSpace);
