import React, {useState} from 'react'
import { connect } from 'react-redux';

const OverlayVideo = ({language}) => {
const[overlay, setOverlay] = useState(true)

    return (
        <div className={overlay ? "popup open video-popup" : "popup video-popup"} id="video">
        <span className="close-icon bg-close-icon" >
            <i className="material-icons"  
            onClick={() => setOverlay(false)}
            >close</i>
        </span>
        <div className="popup-container">
            <div className="popup-body">
                    <div className="popup-content">
                        <div className="video-container">
                            <iframe src="https://www.youtube.com/embed/DpETG__a964" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                    </div>
                  
                </div>
        </div>
    </div>
    )
}

const mapStateToProps = state => {
    return {
     language: state.language
    };
  };

export default connect(mapStateToProps)(OverlayVideo);
