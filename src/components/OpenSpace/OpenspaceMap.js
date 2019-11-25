import React, { Component ,createRef} from 'react';
import {
    Map as LeafletMap,
     TileLayer,
    LayersControl
} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import Axios from 'axios';
import L from 'leaflet'
const { BaseLayer } = LayersControl;



 class OS extends Component {
     constructor(props) {
       super(props)
          
       this.state = {
           height: null,
           activeroute:0,
           Routespaths:[],
           currentLocation: null
          
       };
     };
     addnortharrow=()=>{
        var north = L.control({position: "topleft"});
        north.onAdd = (map) =>{
            var div = L.DomUtil.create("div", "info legend");
            div.innerHTML = '<img id="north" src="../../src/img/n.png">';
            return div;
        }
        north.addTo(this.props.mapRefss.current.leafletElement);
     }

     onload = () => {
        var windowHeight = window.innerHeight;
        
        var navHeight = document.getElementsByClassName('site-header')[0].clientHeight;
     
        this.setState({
        height: windowHeight-navHeight
        })

     }
     currentLocation =  () => {
     
        let latlng

        // if(window.chrome){
        //     console.log("chrome")

        //     Axios.get('http://ip-api.com/json')
        //     .then(Response=>{
        //         this.props.setcurrentLocation([Response.data.lat, Response.data.lon])
        //         // this.setState({ currentLocation: [Response.data.lat, Response.data.lon] })
        //         L.circleMarker(this.props.currentLocation, { color: 'red', radius: 5 }).addTo(window.map);


        //     })
            


        // }
      
// else{
    
        navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition((location) => {
            latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
            console.log([location.coords.latitude, location.coords.longitude])
            this.props.setcurrentLocation([location.coords.latitude, location.coords.longitude])
            L.circleMarker(latlng, { color: 'red', radius: 5 }).addTo(window.map);
            console.log("current", this.state.currentLocation)
        })
    // }
    }
 
    
    
     componentDidMount() {
        this.onload(); 
        this.currentLocation()
        // this.fetchroute()
        this.addnortharrow()
    }
    render() {
      
        var bounds = [[30.86924662953735,
            100.29542704344739],
           [
             26.7211025368031,
      79.2016770434474
           ] ];
        
    
        return (
          

            <>
            <LeafletMap
                    center={[27, 85]}
                    zoom={4}
                    maxZoom={15}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                    bounds={bounds}
                    ref={this.props.mapRefss}
                    style={{ height: this.state.height == null ? '80vh': this.state.height,overflow: 'hidden', }}  
                    >
                        <LayersControl position="topleft">
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
                // <div id="map" class="map">
                   
                // </div>
            
        
    

export default OS;