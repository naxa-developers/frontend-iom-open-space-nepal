import React, {useState} from 'react'

const OverlayVideo = () => {
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
                            <iframe src="https://www.youtube.com/embed/659CESxEb5U" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    )
}

export default OverlayVideo;
