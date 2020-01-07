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
      SecurityData: null,
      dummyNo: ' 01-4250931',
      myloc: L.control({ position: 'topleft' }),
      legend: L.control({ position: 'bottomright' }),
      allNearby:L.featureGroup()
    };
  }

  onload = () => {
    var windowHeight = window.innerHeight;

    var navHeight = document.getElementsByClassName("site-header")[0]
      .clientHeight;

    this.setState({
      height: windowHeight - navHeight
    });
    // this.plotfacilities();
  };
  plotNearby = () => {
    Axios.get(
      `https://iomapi.naxa.com.np/api/v1/near_by_me?type=education%20facility&count=100&distance=1&id=${localStorage.getItem(
        "OpenspaceID"
      )}`
    ).then(response => {
      this.setState({
        Edudata: response.data
      });

      this.plotEdu();
      Axios.get(
        `https://iomapi.naxa.com.np/api/v1/near_by_me?type=health%20facility&count=100&distance=1&id=${localStorage.getItem(
          "OpenspaceID"
        )}`
      ).then(response => {
        this.setState({
          HealthData: response.data
        });

        this.plotHealth();
        Axios.get(
          `https://iomapi.naxa.com.np/api/v1/near_by_me?type=security%20force&count=100&distance=1&id=${localStorage.getItem(
            "OpenspaceID"
          )}`
        ).then(response => {
          this.setState({
            SecurityData: response.data
          });

          this.plotSecurity();
          this.props.reff.current.leafletElement.fitBounds(this.state.allNearby.getBounds().extend(this.geo.getBounds()))

        });
      });
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
      }).addTo(this.state.allNearby);

      var popUp =
        "<div class='bind-popup'>" +
        " </div> <div class='bind-header'> <h5>" + e.name + "</h5><p><i class='material-icons'>phone</i>" + this.state.dummyNo + "<i class='material-icons pop-dir'>directions</i></p> </div>";
      NearbyMarker.bindPopup(popUp);
      NearbyMarker.on('click', () => {
        let dir = document.getElementsByClassName('pop-dir')

        for (var i = 0; i < dir.length; i++) {
          dir[i].addEventListener('click', () => {
            console.log("called", i)
            if (dir[0].classList.contains('active')) {
              console.log("calledif", i)

              this.props.remove()
              dir[0].classList.remove('active')

            }
            else {
              console.log("calledelse", i)
              this.props.nearbyroute(this.state.OSlatlng, [e.latitude, e.longitude])
              dir[0].classList.add('active')
            }
            // this.toogleactivetoute()








          })
        }
      })
    });
  };
  plotSecurity = () => {
    var NearbyIcon = L.divIcon({
      className: "nearby-div-icon",
      html: "<i class='humanitarian-icon-National-army'></i>",

      iconAnchor: [12, 6]
    });
    this.state.SecurityData.facility.map(e => {
      var NearbyMarker = L.marker([e.latitude, e.longitude], {
        icon: NearbyIcon
      }).addTo(this.state.allNearby);

      var popUp =
        "<div class='bind-popup'>" +
        " </div> <div class='bind-header'> <h5>" + e.name + "</h5> <p> <i class='material-icons'>phone</i>" + this.state.dummyNo + "<i class='material-icons pop-dir'>directions</i></p> </div>  ";
      NearbyMarker.bindPopup(popUp);
      NearbyMarker.on('click', () => {
        let dir = document.getElementsByClassName('pop-dir')

        for (var i = 0; i < dir.length; i++) {
          dir[i].addEventListener('click', () => {
            console.log("called", i)
            if (dir[0].classList.contains('active')) {
              console.log("calledif", i)

              this.props.remove()
              dir[0].classList.remove('active')

            }
            else {
              console.log("calledelse", i)
              this.props.nearbyroute(this.state.OSlatlng, [e.latitude, e.longitude])
              dir[0].classList.add('active')
            }
            // this.toogleactivetoute()








          })
        }
      })
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
      }).addTo(this.state.allNearby);

      var popUp =
        "<div class='bind-popup'>" +
        " </div> <div class='bind-header'> <h5>" +
        e.name +
        "</h5>  <p>  <i class='material-icons'>phone</i> " + this.state.dummyNo + " <i class='material-icons pop-dir'>directions</i></p></div> ";
      NearbyMarker.bindPopup(popUp);
      NearbyMarker.on('click', () => {
        let dir = document.getElementsByClassName('pop-dir')

        for (var i = 0; i < dir.length; i++) {
          dir[i].addEventListener('click', () => {
            console.log("called", i)
            if (dir[0].classList.contains('active')) {
              console.log("calledif", i)

              this.props.remove()
              dir[0].classList.remove('active')

            }
            else {
              console.log("calledelse", i)
              this.props.nearbyroute(this.state.OSlatlng, [e.latitude, e.longitude])
              dir[0].classList.add('active')
            }
            // this.toogleactivetoute()








          })
        }
      })
    });
  };

  addlegend=()=>{
    this.state.legend.onAdd = (map) => {

      var div = L.DomUtil.create('div', `leg`)
      div.innerHTML = ''
      div.innerHTML += "<h5>Legend</h6>"
      div.innerHTML += "<h6><i class='humanitarian-icon-Education'></i>Education</h6>"
      div.innerHTML += "<h6><i class='humanitarian-icon-Medical-supply'></i>Health Facilities</h6>"
      div.innerHTML += "<h6><i class='humanitarian-icon-Helipad'></i>Helipad(Airports)</h6>"
      div.innerHTML += "<h6><i class='humanitarian-icon-Fire'></i>Fire Brigade</h6>"
      div.innerHTML += "<h6><i class='humanitarian-icon-National-army'></i>Security Forces</h6>"
      return div

    }
    

    this.state.legend.addTo(this.props.reff.current.leafletElement)
    // var locs = document.getElementsByClassName('loc')[0].addEventListener('click', () => {
    //   console.log("con")
    //   this.props.reff.current.leafletElement.setView(this.state.currentLocation, 14);
    // })

  }

  zoomTomylocation = () => {
    this.state.myloc.onAdd = (map) => {

      var div = L.DomUtil.create('div', `loc`)
      div.innerHTML = ''
      div.innerHTML += "<i class='material-icons' title='My Location'>gps_fixed</i>"
      return div

    }

    this.state.myloc.addTo(this.props.reff.current.leafletElement)
    var locs = document.getElementsByClassName('loc')[0].addEventListener('click', () => {
      console.log("con")
      this.props.reff.current.leafletElement.setView(this.state.currentLocation, 14);
    })
  }

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
        var icon = L.divIcon({
          className: 'custom-div-icon',
          html: "<i class='material-icons' >gps_fixed</i>",
          // iconSize: [4, 4],
          iconAnchor: [12, 6]
        });
        // this.props.mapRefs.current.leafletElement.createPane("GPS").style.zIndex = 300;
        L.marker(latlng, { icon: icon }).addTo(this.props.reff.current.leafletElement);
       
        


      });
  };

  getOSlatlng = () => {
    Axios.get(`https://iomapi.naxa.com.np/api/v1/open_extra?id=${localStorage.getItem(
      "OpenspaceID"
    )}`)
      .then(response => {
        console.log(this.state.OSlatlng, "OSLATLNG", response)
        this.setState({ OSlatlng: [response.data.data[0].centroid[1], response.data.data[0].centroid[0]] })
        console.log(this.state.OSlatlng, "OSLATLNG", response)

        this.zoomTomylocation();




      })
  }

  plotfacilities = () => {
    Axios.get(`http://139.59.67.104:8011/api/v1/alternative_near_by_me?id=${localStorage.getItem(
      "OpenspaceID"
    )}&distance=1`)
      .then(res => {
        console.log("rr", res)
        debugger
      })

  }


  componentDidMount() {
    this.onload();
    this.plotNearby();
    this.currentloc();
    this.getOSlatlng();
    this.addlegend();
    this.state.allNearby.addTo(this.props.reff.current.leafletElement);

    Axios.get(
      `https://iomapi.naxa.com.np/api/v1/single_open_geo_json?id=${localStorage.getItem(
        "OpenspaceID"
      )}`
    ).then(response => {
      console.log("oop", response.data);

      var geo = L.geoJSON(response.data, {
        fillColor: "blue",
        fillOpacity: 0.3,
        color: "green",
        weight: 2
      })
      geo.addTo(this.props.reff.current.leafletElement);
      this.geo=geo
      // this.props.reff.current.leafletElement.fitBounds(geo.getBounds(), {
      //   // padding: [200, 200]
      // });
      // this.props.reff.current.leafletElement.setZoom(
      //   this.props.reff.current.leafletElement.getZoom() - 2
      // );
    });
  }
  render() {
    this.props.id && localStorage.setItem("OpenspaceID", this.props.id);

    return (
      <>
        {/* <div onClick={()=>this.props.fetchroute([ 27.70419959812,85.315
         ],[ 27.704199598618246,85.31621932983398
         ])}>Clickme</div> */}
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
                attribution='&amp;copy Developer:<a href=" http://naxa.com.np">NAXA</a>'
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
