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
           activeroute:0,
           Routespaths:[]
          
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
            for(var j=0;j<Response.data.paths.length;j++){
                var path=[]
                for(var i=0;i<Response.data.paths[j].points.coordinates.length;i++){
                    
                    path.push(Response.data.paths[j].points.coordinates[i].reverse())
                }
                var polyline=L.polyline(path,{color: j==Response.data.paths.length-1?'blue':'grey'})
                this.state.Routespaths.push({id:j,path:polyline,description:Response.data.paths[j].description[0],distance:Response.data.paths[j].distance})
                
                window.map.addLayer(polyline)
                window.map.fitBounds(polyline.getBounds())

            }

            var legend = L.control({ position: 'bottomright' });

            legend.onAdd = (map) => {
    
                var div = L.DomUtil.create('div', 'routeWrapper')
                this.state.Routespaths.map(e=>{
                    var descCard="<div  class='desccard' name="+ e.id+">"+
                    e.description+'<br/>'+
                    e.distance+" m"
                    "<div>";
                    div.innerHTML += descCard

                })
                // innterhtml
                
            
             
                return div;
            } 
            legend.addTo(window.map)  
            var doc= document.getElementsByClassName('desccard')
            console.log(doc)
            for(var i=0;i<doc.length;i++){
                doc[i].addEventListener('click',(e)=>{
                    console.log(e.target.getAttribute('name'));
                    var value=e.target.getAttribute('name')
                    for(var a=0;a<doc.length;a++){
                        if(doc[a].getAttribute('name')==value){
                            doc[a].classList.add('pathactive')
                            var selected=this.state.Routespaths.filter((a)=>a.id==value)
                            for(var k=0;k<this.state.Routespaths.length;k++){
                                this.state.Routespaths[k].path.setStyle({
                                    color:'grey'
                                })
                            }
                            selected[0].path.setStyle({color:'blue'})
                            
                            selected[0].path.bringToFront()

                        }
                        else{
                            doc[a].classList.remove('pathactive')


                        }
                    }
                    
                 
                }
                )
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