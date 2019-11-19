import React, { Component ,createRef} from 'react';
import {
    Map as LeafletMap,
     TileLayer,
    LayersControl
} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import Axios from 'axios';
const { BaseLayer } = LayersControl;



 class OS extends Component {
     constructor(props) {
       super(props)
          
       this.state = {
           height: null,
           activeroute:0
          
       };
     };

     onload = () => {
        var windowHeight = window.innerHeight;
        
        var navHeight = document.getElementsByClassName('site-header')[0].clientHeight;
     
        this.setState({
        height: windowHeight-navHeight
        })

     }
     currentLocation=()=>{
     navigator.geolocation.getCurrentPosition(function(location) {
        var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
        L.circleMarker(latlng,{color:'red',radius:5}).addTo(window.map);
     })}
     fetchroute=()=>{
        var baseUrl = "http://3.91.5.231:8989/route";
        var url =
            `${baseUrl}?point= 27.63487379134253,85.352783203125`+
            "&point=27.751607687549384,85.242919921875"+
            "&points_encoded=false"+
            "&ch.disable=true"+
            "&alternative_route.max_paths=3"+
            "&algorithm=alternative_route";
        var colors=["red",'green','black']
        Axios.get(url)
        .then(Response=>{
            // console.log(Response)
            // console.log(Response.data.paths[0].points.coordinates,"patharray",Response.data.paths.length);
            for(var j=0;j<Response.data.paths.length;j++){
                var path=[]
                for(var i=0;i<Response.data.paths[j].points.coordinates.length;i++){
                   
                    
                    path.push(Response.data.paths[j].points.coordinates[i].reverse())
                }
                var polyline=L.polyline(path,{color: colors[j],opacity:this.state.activeroute==j?0.7:0.5})
                window.map.addLayer(polyline)
                window.map.fitBounds(polyline.getBounds())

            }
        }
        )
     }
     componentDidMount() {
        this.onload();    
        this.currentLocation() 
        this.fetchroute()
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
                // <div id="map" class="map">
                   
                // </div>
            
        
    

export default OS;