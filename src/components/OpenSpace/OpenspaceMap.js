import React, { Component ,createRef} from 'react';
import {
    Map as LeafletMap,
     TileLayer,
    LayersControl
} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import Axios from 'axios';
import L from 'leaflet'
import { compose } from 'redux';
require('leaflet.vectorgrid/dist/Leaflet.VectorGrid.bundled');
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

       

    
        navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition((location) => {
            latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
            console.log([location.coords.latitude, location.coords.longitude],"aa")
            this.props.setcurrentLocation([location.coords.latitude, location.coords.longitude])
            L.circleMarker(latlng, { color: 'red', radius: 5 }).addTo(this.props.mapRefss.current.leafletElement);
            console.log("current", this.state.currentLocation)
        })
   
    }
    loadprovince=()=>{
        console.log("province loadig...")
        Axios.get('http://139.59.67.104:8011/api/v1/province_geo_json')
        .then(response=>{console.log(response,"province")
        L.geoJSON(response.data,{
            style:(feature)=>{
                return {
                    color:'red',
                    weight:0.2,
                    fillColor:feature.properties.code%2==0?'blue':'green'
                }

            }
        }).addTo(window.map)
    })
    }

    loadVectortile=()=>{
        console.log("called")
        const url = 'http://dvs.naxa.com.np/api/v1/core/district-tile/{z}/{x}/{y}'
        // var vectorTileOptions = {

        //     vectorTileLayerStyles: {
        //         'test': function () {
        //             return {
        //                 fillColor: "red",
        //                 fillOpacity: 0.02,
        //                 weight: 0.3,
        //                 opacity: 0.0,
        //                 color: 'red',
        //                 fill: true,
        //             }
        //         },
        //         zIndex: 1000

        //     },
        //     tms: true,
        //     // noWrap: true,
        //     interactive: true, // Make sure that this VectorGrid fires mouse/pointer events
        //     // pane: "world_shp",
        //     getFeatureId: function (feature) {

        //         console.log(feature)
        //     }
        // }


        // var district = L.vectorGrid.protobuf(url, vectorTileOptions)
        // district.addTo(this.props.mapRefss.current.leafletElement);


        var vectorTileOptions = {
            tms: true,
            vectorTileLayerStyles: {
                'test': function () {
                    return {
                        fillColor: "blue",
                        fillOpacity: 0.2,
                        weight: 1,
                        opacity: 1,
                        color: '#a3b7e3',
                        fill: true,
                    }
                },
                zIndex: 2000,
               
            },
            interactive: true, 
            noWrap:true,
            pane:'vtile',// Make sure that this VectorGrid fires mouse/pointer events

            getFeatureId: function (feature) {
            //    console.log(feature)
               return feature.properties.id

            }
        }


var dvsurl = "http://139.59.67.104:8060/api/v1/core/district-tile/{z}/{-y}/{x}?province=3";
// var dvsurl="https://apps.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Naxa:final_world@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf"




var district = L.vectorGrid.protobuf(dvsurl,vectorTileOptions);
district.addTo(this.props.mapRefss.current.leafletElement)
// this.props.mapRefss.current.leafletElement.fitBounds(district.getBounds())
    }
 
    
    
     componentDidMount() {
        this.onload(); 
        this.currentLocation()
        // this.fetchroute()
        // this.addnortharrow()
        this.props.mapRefss.current.leafletElement.createPane('vtile');
        this.props.mapRefss.current.leafletElement.getPane('vtile').style.zIndex = 2000;
        // this.loadVectortile()
        this.loadprovince()

    }
    render() {
      
        var bounds = [[31.456782472114312
            , 90.0439453125],
           [
            24.67696979820268
            ,79.0576171875
           ] ];
        
    
        return (
          

            <>
            <LeafletMap
            
                    center={[27, 85]}
                    zoom={10}
                    maxZoom={18}
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
                        <BaseLayer checked={true} name="OpenStreetMap">
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                // noWrap={true}



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
                        </LayersControl>
        </LeafletMap>
            
            </>)}}
                // <div id="map" class="map">
                   
                // </div>
            
        
    

export default OS;