import React, { Component ,createRef} from 'react';
import {
    Map as LeafletMap,
     TileLayer,
    LayersControl
} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import Axios from 'axios';
const { BaseLayer } = LayersControl;



 class OSDetails extends Component {
     constructor(props) {
       super(props)
       this.maps=createRef()
          
       this.state = {
           height: null
          
       };
     };

     onload = () => {
        var windowHeight = window.innerHeight;
        
        var navHeight = document.getElementsByClassName('site-header')[0].clientHeight;
     
        this.setState({
        height: windowHeight-navHeight
        })

     }
     
     componentDidMount() {
        this.onload();
        Axios.get(`https://iomapi.naxa.com.np/api/v1/single_open_geo_json?id=${localStorage.getItem('id')}`)  
        .then(response=>{
            var geo=L.geoJSON(response.data).addTo(this.maps.current.leafletElement)
            this.maps.current.leafletElement.fitBounds(geo.getBounds())

        })   
    }
    render() {
        this.props.id&&localStorage.setItem("id",this.props.id)
      
      
        
    
        return (
          

            <>
            <LeafletMap
                    center={[27, 85]}
                    zoom={4}
                    maxZoom={18}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                    // bounds={this.bounds}
                    ref={this.maps}
                    style={{ height: this.state.height == null ? '80vh': this.state.height,overflow: 'hidden', }}  
                    >
                        <LayersControl position="topright">
                        <BaseLayer checked  name="OpenStreetMap">
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                // noWrap={true}



                            />
                        </BaseLayer>
                        </LayersControl>
        </LeafletMap>
            
            </>)}}
          
            
        
    

export default OSDetails;