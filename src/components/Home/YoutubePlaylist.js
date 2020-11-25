import React from 'react'

function YoutubePlaylist() {
    return (
        <section className="video-section ptb-150">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="video">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLZC4OhC8yztAG9A2_oJeYWvCnHudVl3ue" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default YoutubePlaylist;
