import React, { Component, createRef } from "react";
import { Map as LeafletMap, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Axios from "axios";
import L from "leaflet";
const { BaseLayer } = LayersControl;
import EduImage from "../../../img/educationMarker.svg";
import FireImage from "../../../img/fireMarker.png";

class OSDetails extends Component {
  constructor(props) {
    super(props);
    this.maps = createRef();

    this.state = {
      height: null,
      currentLocation: null,
      HealthData: null,
      dummyNo:' 01-4250931'
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
  plotNearby = () => {
    Axios.get(
      `https://iomapi.naxa.com.np/api/v1/near_by_me?type=education%20facility&count=100&distance=1&id=${localStorage.getItem(
        "id"
      )}`
    ).then(response => {
      this.setState({
        Edudata: response.data
      });

      this.plotEdu();
    });
    Axios.get(
      `https://iomapi.naxa.com.np/api/v1/near_by_me?type=health%20facility&count=100&distance=1&id=${localStorage.getItem(
        "id"
      )}`
    ).then(response => {
      this.setState({
        HealthData: response.data
      });

      this.plotHealth();
    });
  };
  plotHealth = () => {
    var NearbyIcon = L.divIcon({
      className: "nearby-div-icon",
      html: "<i class='humanitarian-icon-Medical-supply'></i>",
      
      iconAnchor: [12, 6]
    });
    this.state.HealthData.facility.map(e => {
      var NearbyMarker = L.marker([e.latitude, e.longitude], {
        icon: NearbyIcon
      }).addTo(this.props.reff.current.leafletElement);

      var popUp =
        "<div class='bind-popup'>" +
        " </div> <div class='bind-header'> <h5>" +e.name+"</h5> <p>"+this.state.dummyNo+"</p> </div>  ";
      NearbyMarker.bindPopup(popUp);
    });
  };

  plotEdu = () => {
    var NearbyIcon = L.divIcon({
      className: "nearby-div-icon",
      html: "<i class='humanitarian-icon-Education success'></i>",
      
      iconAnchor: [12, 6]
    });
    this.state.Edudata.facility.map(e => {
      var NearbyMarker = L.marker([e.latitude, e.longitude], {
        icon: NearbyIcon
      }).addTo(this.props.reff.current.leafletElement);

      var popUp =
        "<div class='bind-popup'>" +
        " </div> <div class='bind-header'> <h5>" +
        e.name +
        "</h5> <p>"+this.state.dummyNo+"</p></div> ";
      NearbyMarker.bindPopup(popUp);
    });
  };
  currentloc = () => {
    navigator &&
      navigator.geolocation &&
      navigator.geolocation.getCurrentPosition(location => {
        var latlng = new L.LatLng(
          location.coords.latitude,
          location.coords.longitude
        );
        console.log(
          [location.coords.latitude, location.coords.longitude],
          "aa"
        );
        // this.props.setcurrentLocation([location.coords.latitude, location.coords.longitude])
        this.setState({
          currentLocation: [location.coords.latitude, location.coords.longitude]
        });
        L.circleMarker(latlng, {
          radius: 6,
          fillColor: "red",
          fillOpacity: 1,
          weight: 15,
          opacity: 0.3,
          color: "red"
        }).addTo(this.props.reff.current.leafletElement);
        console.log("current", this.state.currentLocation);
      });
  };

  componentDidMount() {
    this.onload();
    this.plotNearby();
    this.currentloc();
    Axios.get(
      `https://iomapi.naxa.com.np/api/v1/single_open_geo_json?id=${localStorage.getItem(
        "id"
      )}`
    ).then(response => {
      var geo = L.geoJSON(response.data, {
        fillColor: "blue",
        fillOpacity: 0.3,
        color: "green",
        weight: 2
      }).addTo(this.props.reff.current.leafletElement);
      this.props.reff.current.leafletElement.fitBounds(geo.getBounds(), {
        padding: [200, 200]
      });
      this.props.reff.current.leafletElement.setZoom(
        this.props.reff.current.leafletElement.getZoom() - 2
      );
    });
  }
  render() {
    this.props.id && localStorage.setItem("id", this.props.id);

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
          style={{
            height: this.state.height == null ? "80vh" : this.state.height,
            overflow: "hidden"
          }}
        >
          <LayersControl position="topright">
            <BaseLayer ref={this.baseLayer} name="OpenStreetMap">
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
                url=".facilityhttp://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
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

            <BaseLayer name="Mapbox Streets" checked={true}>
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
      </>
    );
  }
}

export default OSDetails;
