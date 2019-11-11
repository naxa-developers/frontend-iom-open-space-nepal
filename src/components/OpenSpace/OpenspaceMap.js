import React, { Component,createRef } from 'react'
import {
    Map as LeafletMap,
    GeoJSON,
    Marker,
    Popup,
    TileLayer,
    LayersControl,
    BaseLayer
} from "react-leaflet";


// require('../../js/map')

class Map extends Component {

    constructor(props) {
      super(props)
      this.mapRef = createRef();
      this.baseLayer = createRef();
    
      this.state = {
         
      };
    };
    
    render() {
        return (
          

            <>
                <LeafletMap
                    center={[27, 85]}
                    zoom={1.4}
                    maxZoom={15}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                    ref={this.mapRef}
                    style={{ height: 500, width: '99.8vw', marginLeft: -22, overflow: 'hidden', }}

                    // onClick={this.handleClick}
                >
                    <LayersControl position="topright">
                        <BaseLayer  name="OpenStreetMap">
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                // noWrap={true}



                            />
                        </BaseLayer>
                        </LayersControl>
        </LeafletMap>
            
            </>)}}
               
  

export default Map;
