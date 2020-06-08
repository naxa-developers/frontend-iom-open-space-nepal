import React, { Component, createRef } from 'react';
import {
    Map as LeafletMap,
    TileLayer,
    LayersControl
} from "react-leaflet";


import 'leaflet/dist/leaflet.css';
import Axios from 'axios';
import { connect } from 'react-redux';
const { BaseLayer } = LayersControl;
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

require('leaflet.markercluster')



class RDetailsMap extends Component {
    constructor(props) {
        super(props)
        this.maps = createRef()

        this.state = {
            height: null,
            spacedata: ''

        };
    };

    onload = () => {
        var windowHeight = window.innerHeight;

        var navHeight = document.getElementsByClassName('site-header')[0].clientHeight;

        this.setState({
            height: windowHeight - navHeight
        })

    }

    fetchLatLng = () => {
        Axios.get(`https://iomapi.naxa.com.np/api/v1/open_space/${localStorage.getItem("id")}`)
            .then(r => {

                this.setState({
                    spacedata: r.data
                })

                const reportStyle = {
                    color: "red",
                    fillColor: "red",
                    opacity: 0.3,
                    fillOpacity: 1,
                    weight: 12,
                    radius: 4
                };


                var marker = L.circleMarker(
                    [this.state.spacedata.centroid[1],
                    this.state.spacedata.centroid[0]], reportStyle, {
                    className: 'blinking'
                }
                )

                var popUp = " <div class='bind-popup'> " +
                    "<div class='bind-header'> <h5>" +
                    this.props.title +
                    "</h5>   </div> </div>";
                marker.bindPopup(popUp)
                marker.addTo(this.maps.current.leafletElement)

            })
    }

    componentDidMount() {
        this.onload();
        this.fetchLatLng();
        Axios.get(`https://iomapi.naxa.com.np/api/v1/single_open_geo_json?id=${localStorage.getItem("id")}`)
            .then(response => {
                var geo = L.geoJSON(response.data, { fillColor: 'blue', fillOpacity: 0.3, color: 'green', weight: 2 }).addTo(this.maps.current.leafletElement)
                this.maps.current.leafletElement.fitBounds(geo.getBounds())
                this.maps.current.leafletElement.setZoom(this.maps.current.leafletElement.getZoom() - 2)


            })
    }
    render() {
        this.props.openSpace && localStorage.setItem("id", this.props.openSpace)


        this.props.title && sessionStorage.setItem("title", this.props.title)



        var bounds = [[25.710836919640595, 79.79365377708339],
        [30.798474179567847, 88.54975729270839]];




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
                    // bounds={bounds}
                    ref={this.maps}
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
                                attribution='&amp;copy Developer:<a href="http://maps.google.com">NAXA</a>'

                                // attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                                // https://api.mapbox.com/styles/v1/upendraoli/cjuvfcfns1q8r1focd0rdlgqn/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidXBlbmRyYW9saSIsImEiOiJjaWYwcnFnNmYwMGY4dGZseWNwOTVtdW1tIn0.uhY72SyqmMJNTKa0bY-Oyw'
                                url="https://api.mapbox.com/styles/v1/naxa-np/cka9lr90s0tgp1is4gep38xi3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmF4YS1ucCIsImEiOiJja2E5bGp0ZDQwdHE4MnJxdnhmcGxsdGpuIn0.kB42E50iZFlFPcQiqQMClw"
                                maxZoom={20}
                            // subdomains={["mt0", "mt1", "mt2", "mt3"]}
                            />
                        </BaseLayer>
                    </LayersControl>
                </LeafletMap>

            </>)
    }
}


const mapStateToPros = (state) => {
    return {
        openSpace: state.space,
        title: state.ReportTitle
    }

}


export default connect(mapStateToPros)(RDetailsMap);