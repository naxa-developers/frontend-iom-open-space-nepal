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



 class OSDetails extends Component {
     constructor(props) {
       super(props)
       this.maps=createRef()
          
       this.state = {
           height: null,
           currentLocation:null
          
       };
     };

     onload = () => {
        var windowHeight = window.innerHeight;
        
        var navHeight = document.getElementsByClassName('site-header')[0].clientHeight;
     
        this.setState({
        height: windowHeight-navHeight
        })

     }
     currentloc=()=>{
         
        navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition((location) => {
            var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
            console.log([location.coords.latitude, location.coords.longitude], "aa")
            // this.props.setcurrentLocation([location.coords.latitude, location.coords.longitude])
            this.setState({ currentLocation: [location.coords.latitude, location.coords.longitude] })
            L.circleMarker(latlng, { radius: 6, fillColor: 'red', fillOpacity: 1, weight: 15, opacity: 0.3, color: 'red', }).addTo(this.props.reff.current.leafletElement);
            console.log("current", this.state.currentLocation)
           
        
        })
     }
     
     componentDidMount() {
        this.onload();
        this.currentloc()
        Axios.get(`https://iomapi.naxa.com.np/api/v1/single_open_geo_json?id=${localStorage.getItem('id')}`)  
        .then(response=>{
            var geo=L.geoJSON(response.data,{fillColor:'blue',fillOpacity:0.3,color:'green',weight:2}).addTo(this.props.reff.current.leafletElement)
            this.props.reff.current.leafletElement.fitBounds(geo.getBounds(),{padding: [200,200]})

        })   
    }
    render() {
        this.props.id&&localStorage.setItem("id",this.props.id)
      
      
        
    
        return (
          

            <>
            <LeafletMap
                    center={[27, 85]}
                    zoom={4}
                    // maxZoom={18}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                    // bounds={this.bounds}
                    ref={this.props.reff}
                    style={{ height: this.state.height == null ? '80vh': this.state.height,overflow: 'hidden', }}  
                    >
                         <LayersControl position="topright">
                        <BaseLayer  ref={this.baseLayer} name="OpenStreetMap">
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                noWrap={true}



                            />
                        </BaseLayer>
                        <BaseLayer name="Google Streets">
                            <TileLayer
                                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                                url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                maxZoom={20}
                                subdomains={["mt0", "mt1", "mt2", "mt3"]}
                            />
                        </BaseLayer>
                        <BaseLayer name="Google Hybrid">
                            <TileLayer
                                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                                url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                                maxZoom={20}
                                subdomains={["mt0", "mt1", "mt2", "mt3"]}
                            />
                        </BaseLayer>
                        <BaseLayer name="Google Satellite">
                            <TileLayer
                                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                                url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                                maxZoom={20}
                                subdomains={["mt0", "mt1", "mt2", "mt3"]}
                            />
                        </BaseLayer>
                        <BaseLayer name="Google Terrain">
                            <TileLayer
                                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                                url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                                maxZoom={20}
                                subdomains={["mt0", "mt1", "mt2", "mt3"]}
                            />
                        </BaseLayer>
                      
                        <BaseLayer name="Mapbox Streets" checked={true}  >
                        <TileLayer

                                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                                url="https://api.mapbox.com/styles/v1/rowheat02/ck3h10kz80mnq1cmz5v34i1wi/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoicm93aGVhdDAyIiwiYSI6ImNqeGQwZWNybjA5NXIzb21zZ3NzN290encifQ.51qM62lMBZUj2cBeykTG6g"
                                maxZoom={20}
                                // subdomains={["mt0", "mt1", "mt2", "mt3"]}
                            />
                        </BaseLayer>
                        </LayersControl>
        </LeafletMap>
            
            </>)}}
          
            
        
    

export default OSDetails;