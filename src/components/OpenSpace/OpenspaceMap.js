import React, { Component, createRef } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { BaseLayer } = LayersControl;



class OS extends Component {
    constructor(props) {
        super(props)

        this.state = {
            height: null,
            activeroute: 0,
            Routespaths: [],
            currentLocation: null,
            myloc: L.control({ position: 'topleft' })


        };
    };
    addnortharrow = () => {
        var north = L.control({ position: "topleft" });
        north.onAdd = (map) => {
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
            height: windowHeight - navHeight
        })

    }
    currentLocation = () => {

        let latlng




        navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition((location) => {
            latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
            console.log([location.coords.latitude, location.coords.longitude], "aa")
            this.props.setcurrentLocation([location.coords.latitude, location.coords.longitude])
            this.setState({ currentLocation: [location.coords.latitude, location.coords.longitude] })
            // L.circleMarker(latlng, { radius: 6, fillColor: 'red', fillOpacity: 1, weight: 15, opacity: 0.3, color: 'red', }).addTo(this.props.mapRefss.current.leafletElement);
            // console.log("current", this.state.currentLocation)
            var icon = L.divIcon({
                className: 'custom-div-icon',
                html: "<i class='material-icons'>gps_fixed</i>",
                // iconSize: [4, 4],
                iconAnchor: [12, 6]
            });
            L.marker(latlng, { icon: icon }).addTo(this.props.mapRefss.current.leafletElement);
           
        
        })
         this.notify()
        navigator.permissions.query({name: 'geolocation'}).then((PermissionStatus)=> {
            if(PermissionStatus.state == 'granted'){
                // this.notify()

                
            }else{
                // this.notify()

                 
            }
        })

    }
    loadprovince = () => {
        var colors = ["#0489B1", "#045FB4", "purple", "#0404B4", "#3104B4", "#5F04B4", "#1B0A2A"]
        console.log("province loadig...")
        Axios.get('https://iomapi.naxa.com.np/api/v1/province_geo_json')
            .then(response => {
                console.log(response, "province")
                var province = L.geoJSON(response.data, {
                    style: (feature) => {
                        return {
                            color: 'black',
                            weight: 0.8,
                            fillColor: colors[feature.properties.code - 1],
                            fillOpacity: 0.7
                        }

                    }
                }).addTo(window.map)
                this.props.setProvince(province)
            })
    }
    zoomTomylocation = () => {
        this.state.myloc.onAdd = (map) => {

            var div = L.DomUtil.create('div', `loc`)
            div.innerHTML = ''
            div.innerHTML += "<i class='material-icons'>gps_fixed</i>"
            return div

        }

        this.state.myloc.addTo(this.props.mapRefss.current.leafletElement)
        var locs = document.getElementsByClassName('loc')[0].addEventListener('click', () => {
            console.log("con")
            this.props.mapRefss.current.leafletElement.setView(this.state.currentLocation, 14);
        })
    }

    loadVectortile = () => {

        var url = 'https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Province@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf'

        var vectorTileOptions = {

            vectorTileLayerStyles: {
                'province': function () {
                    return {
                        fillColor: "red",
                        fillOpacity: 0.02,
                        weight: 0.3,
                        opacity: 0.0,
                        color: 'red',
                        fill: true,
                    }
                },
                zIndex: 1000

            },
            tms: true,
            noWrap: true,
            interactive: true, // Make sure that this VectorGrid fires mouse/pointer events
            pane: "vectortile",
            getFeatureId: function (feature) {

                return feature.properties.id;
            }
        }


        var world = L.vectorGrid.protobuf(url, vectorTileOptions)
        var colors = ['#0B6D11', '#2A7F2F', '#48924D', '#67A46A', '#85B688', '#A4C8A6', '#C2DAC4']
        for (var i = 1; i <= 7; i++) {
            world.setFeatureStyle(i, {
                fillColor: colors[i - 1],
                fillOpacity: 0.03,
                fill: true,
                opacity: 1,
                color: 'green',
                weight: 0.8

            })
        }

        world.addTo(this.props.mapRefss.current.leafletElement)
    }



    componentDidMount() {
        this.onload();
        this.currentLocation();
        this.zoomTomylocation();
        

        this.props.mapRefss.current.leafletElement.createPane("userloc").style.zIndex = 800;
        // this.fetchroute()
        // this.addnortharrow()

        this.props.mapRefss.current.leafletElement.createPane('vectortile').style.zIndex = 200;
        // this.loadVectortile()
        // this.loadprovince()

    }
    notify = () => toast.info("Turn your location service ON for better experience",{autoClose: false,containerId:'B'});
    render() {

        var bounds = [[25.710836919640595, 79.79365377708339],
        [30.798474179567847, 88.54975729270839]];


        return (


            <>
                <div>
                    
                    <ToastContainer enableMultiContainer containerId={'B'} position={toast.POSITION.BOTTOM_RIGHT}  />
                </div>
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
                    style={{ height: this.state.height == null ? '80vh' : this.state.height, overflow: 'hidden', }}
                >
                    <LayersControl position="topright">
                        <BaseLayer checked={this.state.baselayer ? true : false} ref={this.baseLayer} name="OpenStreetMap">
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

                                // attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                                // https://api.mapbox.com/styles/v1/upendraoli/cjuvfcfns1q8r1focd0rdlgqn/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidXBlbmRyYW9saSIsImEiOiJjaWYwcnFnNmYwMGY4dGZseWNwOTVtdW1tIn0.uhY72SyqmMJNTKa0bY-Oyw'
                                url="https://api.mapbox.com/styles/v1/upendraoli/cjuvfcfns1q8r1focd0rdlgqn/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidXBlbmRyYW9saSIsImEiOiJjaWYwcnFnNmYwMGY4dGZseWNwOTVtdW1tIn0.uhY72SyqmMJNTKa0bY-Oyw"
                                maxZoom={20}
                            // subdomains={["mt0", "mt1", "mt2", "mt3"]}
                            />
                        </BaseLayer>
                    </LayersControl>
                </LeafletMap>

            </>)
    }
}
// <div id="map" class="map">

// </div>




export default OS;