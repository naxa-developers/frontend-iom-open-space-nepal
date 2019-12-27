import React, { Component } from "react";
import Axios from "axios";
import Map from "./Map";

import LoadingSpinner from "../../../Report/LoadingSpinnerBig";
import LightImage from './LightImage';




class Gallary extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       maps:'',
       photos: '',
       loading:'true'
    }
  }
  
  fetchMaps = () => {
    Axios.get(`https://iomapi.naxa.com.np//api/v1/gallery/?id=${localStorage.getItem("OpenspaceID")}&type=map`).then(response => {
      this.setState({
        maps: response.data,
        loading: false
      });
    });
  };
  fetchImages = () => {
    console.log("gal",localStorage.getItem("OpenspaceID"));
    
    Axios.get(`https://iomapi.naxa.com.np/api/v1/gallery/?id=${localStorage.getItem("OpenspaceID")}&type=image`).then(response => {
      this.setState({
        photos: response.data,
        loading: false
      });
    });
  };

  componentDidMount() {
      this.fetchMaps();
      this.fetchImages();
  }
 
  render() {
  


    return (
      <>
        <div className="gallery-category">
          <div className="gallery-grid">
            <h4>maps</h4>
            <div class="row">
              {this.state.loading ? (
                <LoadingSpinner />
              ) : 
             
               this.state.maps&& this.state.maps.map(g => {
                  return <Map   className="toggleModal"  id={g.id} mapImage={g.thumbnail} largeImage={g.image} />;
                })
              }
            </div>
          </div>
          <div className="gallery-grid">
            <h4>Images</h4>
            <div class="row">
            {this.state.loading ? (
                <LoadingSpinner />
              ) : 
             
              this.state.photos&&this.state.photos.map(g => {
                  return <LightImage photo ={g.thumbnail} />
                  
                 
                })  
              } 
            </div>
          
          </div>
        </div>
      </>
    );
  }
}

export default Gallary;
