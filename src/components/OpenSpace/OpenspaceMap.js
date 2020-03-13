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
import { connect } from 'react-redux';
const { BaseLayer } = LayersControl;
import Spinner from './OpenSpaceDetails/MapLoader'
import 'leaflet-ajax'
// import './openspace_gp_np.geojson';




let MAP;
let munLayer;
var province;
class OS extends Component {
    constructor(props) {
        super(props)

        this.state = {
            height: null,
            activeroute: 0,
            Routespaths: [],
            currentLocation: null,
            myloc: L.control({ position: 'topleft' }),
            provinceLoading: 'block',
            munCounts: ''


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
                html: "<span class='current-location'><i class='material-icons'>gps_fixed</i> </span>",
                // iconSize: [4, 4],
                iconAnchor: [12, 6]
            });
            L.marker(latlng, { icon: icon }).addTo(this.props.mapRefss.current.leafletElement);
            this.props.dispatch({ type: "Setcurrentloc" })


        })
        sessionStorage.Openspaces==undefined&&this.notify()
        navigator.permissions.query({ name: 'geolocation' }).then((PermissionStatus) => {
            if (PermissionStatus.state == 'granted') {
                // this.notify()


            } else {
                // this.notify()


            }
        })

    }
    loadprovince = () => {
        var colors = ["#0489B1", "#045FB4", "purple", "#0404B4", "#3104B4", "#5F04B4", "#1B0A2A"]
        
        Axios.get('https://iomapi.naxa.com.np/api/v1/province_geo_json')
            .then(response => {
             
                var province = L.geoJSON(response.data, {
                    style: (feature) => {
                        return {
                            color: 'green',
                            weight: 0.8,
                            fillColor: colors[feature.properties.code - 1],
                            fillOpacity: 0.0
                        }

                    }
                })
                // .addTo(this.props.mapRefss.current.leafletElement)
                this.props.setProvince(province)
            })
           
    }
    zoomTomylocation = () => {
        this.state.myloc.onAdd = (map) => {

            var div = L.DomUtil.create('div', `loc`)
            div.innerHTML = ''
            div.innerHTML += "<i class='material-icons' title='My Location'>gps_fixed</i>"
            return div

        }

        this.state.myloc.addTo(this.props.mapRefss.current.leafletElement)
        var locs = document.getElementsByClassName('loc')[0].addEventListener('click', () => {
         
            this.props.mapRefss.current.leafletElement.setView(this.state.currentLocation, 14);
        })
    }

    loadVectortile = () => {
    //    let munCounts =  this.state.munCounts;
       var vectorTileOptions = {
        tms: true,
        vectorTileLayerStyles: {
            // 'District': function () {
            //     return {
            //         fillColor: "blue",
            //         fillOpacity: 0,
            //         weight: 1,
            //         opacity: 1,
            //         color: '#a3b7e3',
            //         fill: true,
            //     }
            // },
            'Province': function () {
                return {
                    fillColor: "blue",
                    fillOpacity: 0,
                    weight: 1,
                    opacity: 1,
                    color: '#4f76c9',
                    fill: true,
                }
            },
        
            // 'Municipality':  function (properties, zoom) {
       
            //   return {
            //        fillColor: "yellow",
            //        fillOpacity: 0,
            //        weight: 2,
            //        opacity: 1,
            //        color: 'red',
            //        fill: true,
            //    }
        
         
            
            // },
        },
        interactive: true, // Make sure that this VectorGrid fires mouse/pointer events
        // pane: "wmsPane",
        getFeatureId: function (feature, layer) {
      
            
            // label_Vector_Tiles(feature);
            let hlcit = feature.properties.HLCIT_CODE &&  parseInt(feature.properties.HLCIT_CODE.toString().replace(/\s/g, ''))  
         
            // setTimeout(() => {
            
            // municipality.setFeatureStyle(hlcit, {
            //     fillColor: "yellow",
            //     fillOpacity: 0,
            //     weight: 1,
            //     opacity: 0,
            //     color: 'green',
            //     fill: true,
            //     })
            // })
            return hlcit;
           
        }
    }
    var provinceUrl = 'https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Province@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf';
    // var districtUrl = 'https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:District@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf';
    //    var municipalityUrl = 'https://apps.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Naxa:Municipality@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf';
    // var municipalityUrl = 'https://geoserver.naxa.com.np/geoserver/gwc/service/tms/1.0.0/Bipad:Municipality@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf';
       province = L.vectorGrid.protobuf(provinceUrl, vectorTileOptions);
        // municipality = L.vectorGrid.protobuf(municipalityUrl, vectorTileOptions)

       province.addTo(this.props.mapRefss.current.leafletElement);
    //    municipality.addTo(this.props.mapRefss.current.leafletElement);
       this.setState({provinceLoading: 'none'})
      
           province.bringToFront();
          munLayer = new L.geoJSON.ajax('src/json/openspace_gp_np.geojson', {
              color: '#5ACE52',
              fillColor: '#fff',
              weight: '1.5'
          }
            )
         
            munLayer.addTo(MAP);
       
   
        //   munLayer.addTo(this.props.mapRefss.current.leafletElement);
          munLayer.bringToFront();
    //    setTimeout(() => {
    //        munCounts.map((m) => {

    //            municipality.setFeatureStyle(m, {fillColor:'red', color:'green', opacity: '1',weight: '2'})
    //        })
          
    //        municipality.bringToFront();
    //     }, 1500) 

      
    //     MAP.on('zoomend moveend', function() {
    //         setTimeout(() => {
    //             munCounts.map((m) => {
    //                 municipality.setFeatureStyle(m, {fillColor:'red', color:'green', opacity: '1',weight: '2'})
    //             })
    //         }, 1500)
           
    //     })
     
       
   
    //   municipality.setFeatureStyle({
    //       color: 'yellow'
    //   });
    //  var  district = L.vectorGrid.protobuf(districtUrl, vectorTileOptions);

   
      
    // municipality.resetFeatureStyle();

    }



    componentDidMount() {
   
        MAP = this.props.mapRefss.current.leafletElement;
            Axios.get(`https://iomapi.naxa.com.np/api/v1/glimpse_of_open_space`)
            .then(res => {
            
                const counts =  res.data.data.municipality_list
                
                
                let hlcitArr = [];
                counts.map((m) => {
                    let str = Object.values(m).toString().replace(/\s/g, '')
                    hlcitArr.push(str)
                    
                }) 
                this.setState({munCounts: hlcitArr}, () => {
                    this.loadVectortile()
                })
                
    
               
                
            })



        this.onload();
        // this.loadprovince()
        this.currentLocation();
        this.zoomTomylocation();
     
     
        sessionStorage.Openspaces==undefined&&toast.info("If current location is not in correct position, disconnect and reconnect your wifi network", { autoClose: false, position: "bottom-right" })


        this.props.mapRefss.current.leafletElement.createPane("userloc").style.zIndex = 800;
        // this.fetchroute()
        // this.addnortharrow()

        this.props.mapRefss.current.leafletElement.createPane('vectortile').style.zIndex = 200;
       
        

    }
    notify = () => toast.info("Turn your location service ON for better experience", {
        autoClose: 3000, position: "bottom-right"
    });
    render() {

        if(this.props.deleteAll===true) {
            MAP.removeLayer(province)
         MAP.removeLayer(munLayer)
        }
    //  MAP &&  MAP.on('zoomend', function() {

    
    //     })  
        
        var bounds = [[25.710836919640595, 79.79365377708339],
        [30.798474179567847, 88.54975729270839]];
        lat: 28.541100228636036
        lng: 85.00671386718751

        return (


            <>
      <div
            // id='Spinner'
            style={{
              display: `${this.state.provinceLoading}`,
              background: 'white',
              opacity: '0.6',
              position: 'absolute',
              zIndex: '500',
              textAlign: 'center',
              left: '50%',
              padding: '8px',
              top: '4px',
          
            }}
          >
           <Spinner />
           
          </div>

                <ToastContainer newestOnTop={true} enableMultiContainer />
       
          

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

                                attribution='&amp;copy Developer:<a href=" http://naxa.com.np">NAXA</a>'
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

const mapStateToProps = (state) => {
    return {
      ...state,
      deleteLayers: state.deleteAll
    }
  }


export default connect(mapStateToProps)(OS);