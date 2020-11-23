import React, {useState} from 'react'
import { connect } from 'react-redux';

const OverlayVideo = ({language}) => {
const[overlay, setOverlay] = useState(true)

    return (
        <div class={overlay ? "popup open video-popup" : "popup video-popup"} id="video">
        <span class="close-icon bg-close-icon" >
            <i class="material-icons"  
            onClick={() => setOverlay(false)}
            >close</i>
        </span>
        <div class="popup-container">
            <div class="popup-body">
                    <div class="popup-content">
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/DpETG__a964" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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
