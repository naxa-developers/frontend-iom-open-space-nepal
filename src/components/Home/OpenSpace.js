import React, { Component } from 'react';
import video from '../../img/video.jpg';
import play from '../../img/play.png'
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import Axios from 'axios';
class OpenSpace extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Opendata: '',
             loader:false
           
             
        }
    }
    getData() {
      Axios.get(`${process.env.BASE_URL}/open_space_def/`)
        .then( res => {
            const data1 = res.data;
            
            this.setState({ 
                Opendata: data1,
                loader:true
        
             })
        })
       
    }
    componentDidMount() {
        this.getData();
    
        
    }
    VideoonReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

    render() {
         const videoUrl = this.state.loader && this.state.Opendata[0].video ? this.state.Opendata[0].video : '';
        
        
        const opts = {
            height: '500px',
            height: '700px',
            playersVars : {
                
                autoplay: 1
            }
        };
        // const {videoId} = this.props
        return (
            <section className="video-section ptb-150">
            <div className="container">
                <div className="row">
                <div className="col-lg-12 col-md-12">
                     <div className="video">
                     
                         <YouTube
                                videoId= {videoUrl}
                                opts = {opts}
                                onReady = {this.videoOnReady}
                                
                               
                                /> 

                                
                             {/* <div className="overlay"></div> */}
                          
                        </div> 
                    </div>
                    {/* <div className="col-lg-4 col-md-4">
                        <div className="video-content flexvr">
                          
                            <h3 className="openspace-title"> {this.props.language == '0' ? this.state.loader && this.state.Opendata[0].title : this.state.loader && this.state.Opendata[0].title_nep  }</h3>
                            <p>{this.props.language == '0' ? this.state.loader && this.state.Opendata[0].description : this.state.loader && this.state.Opendata[0].description_nep  }</p>
                        </div>
                    </div> */}
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
