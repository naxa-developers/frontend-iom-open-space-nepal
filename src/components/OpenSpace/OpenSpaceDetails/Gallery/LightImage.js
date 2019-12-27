import React, { Component } from 'react'
import Lightbox from "react-image-lightbox-rotate";

// import Lightbox from './lib/components/Lightbox'



class LightImage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            photoIndex: 0,
            isOpen: false
        }
    }

    render() {

        const { photoIndex, isOpen } = this.state;
        return (
            <div className="col-sm-4" >
                <figure>

                    <img src={this.props.photo} onClick={() => this.setState({ isOpen: true })} alt="space" />
                </figure>
                <div style={{zIndex:99999}} >
                {
                    isOpen && (
                      
                            <Lightbox
                                mainSrc={this.props.photo}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                                imageCaption="Title"
                                // reactModalStyle={{ 'zIndex': '9999' }}

                            />
                     

                    )
                }
   </div>
            </div>
        )
    }
}

export default LightImage;
