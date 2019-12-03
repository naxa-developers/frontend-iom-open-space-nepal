import React, { Component, createRef } from "react";
import { Map as LeafletMap, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Axios from "axios";
const { BaseLayer } = LayersControl;
import L from 'leaflet'

class ReportMap extends Component {
  constructor(props) {
    super(props);
    // this.RmapRefss = createRef();

    this.state = {
      height: null,
      
     
    };
  }

  onload = () => {
    var windowHeight = window.innerHeight;

    var navHeight = document.getElementsByClassName("site-header")[0]
      .clientHeight;

    this.setState({
      height: windowHeight - navHeight
    });
  };

 

//   displayLegends = () => {
//     var map=this.props.mapR.current.leafletElement;
//     var reportLegend = L.DomUtil.create('div', 'info legend'),
//     grades = [0, 5, 10, 20, 50, 100];
// // labels = [];
// div.innerHTML += "<h6>Legend</h6>"
// div.innerHTML += "<h7>No. of Projects</h7><br>"
// div.innerHTML +=
//     '<i style="background:' + this.getColor('red') + '; border:1px solid #d5d5d5"></i> ' +
//     '0' + '<br>'
// // loop through our density intervals and generate a label with a colored square for each interval
// for (var i = 0; i < grades.length - 1; i++) {
//     div.innerHTML +=
//         '<i style="background:' + this.getColor(grades[i + 1]) + '"></i> ' +
//         grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
// }
// div.innerHTML +=
//     '<i style="background:' + this.getColor(200) + '"></i> ' +
//     '100+' + '<br>'
// return div;
// };
  
//   }

  componentDidMount() {
    this.onload();
    // this.loadReports();
    // this.displayLegends();
  }
  render() {
   
    
    var bounds =[ [ 25.710836919640595, 79.79365377708339],
        [ 30.798474179567847 , 88.54975729270839]];

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
          bounds={bounds}
          ref={this.props.mapR}
          style={{
            height: this.state.height == null ? "80vh" : this.state.height,
            overflow: "hidden"
          }}
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

                                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                                url="https://api.mapbox.com/styles/v1/rowheat02/ck3h10kz80mnq1cmz5v34i1wi/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoicm93aGVhdDAyIiwiYSI6ImNqeGQwZWNybjA5NXIzb21zZ3NzN290encifQ.51qM62lMBZUj2cBeykTG6g"
                                maxZoom={20}
                                // subdomains={["mt0", "mt1", "mt2", "mt3"]}
                            />
                        </BaseLayer>
                        </LayersControl>
        </LeafletMap>
      </>
    );
  }
}

export default ReportMap;
