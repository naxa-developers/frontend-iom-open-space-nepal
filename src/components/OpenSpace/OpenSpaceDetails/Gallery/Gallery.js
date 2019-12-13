import React, { Component } from "react";
import Axios from "axios";
import Map from "./Map";
import Photo from './Photo'
import LoadingSpinner from "../../../Report/LoadingSpinnerBig";

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
    Axios.get(`https://iomapi.naxa.com.np//api/v1/gallery/?id=${this.props.id}&type=map`).then(response => {
      this.setState({
        maps: response.data,
        loading: false
      });
    });
  };
  fetchImages = () => {
    Axios.get(`https://iomapi.naxa.com.np/api/v1/gallery/?id=${this.props.id}&type=image`).then(response => {
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
                  return <Map id={g.id} mapImage={g.image} />;
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
                  return <Photo id={g.id} photo={g.image} />;
                })  
              }
              <div class="gallery-btn">
                  <button>See More</button>
              </div>
              
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Gallary;
