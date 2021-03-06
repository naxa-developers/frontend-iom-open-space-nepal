import React, { Component, createRef } from "react";
import { Map as LeafletMap, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Axios from "axios";
import L from "leaflet";
const { BaseLayer } = LayersControl;
import { connect } from 'react-redux'
import healthIcon from '../../../img/icons_Medical.png'


import './Details.css'
import Spinner from '../OpenSpaceDetails/MapLoader'

var geo = null;
class OSDetails extends Component {
  constructor(props) {
    super(props);
    this.maps = createRef();

    this.state = {
      height: null,
      currentLocation: null,
      HealthData: null,
      SecurityData: null,
      HeliData: null,
      dummyNo: 'Not Available',
      myloc: L.control({ position: 'topleft' }),
      legend: L.control({ position: 'bottomright' }),
      allNearby: L.featureGroup(),
      wmsLoading: 'none'
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
      `${process.env.BASE_URL_API}/near_by_me?type=Helipad&count=50&distance=5&id=${localStorage.getItem("OpenspaceID")}`)
      .then(res => {
        console.log("heli map", res.data);

        this.setState({
          HeliData: res.data
        })
        this.plotHeli();
      })


    Axios.get(
      `${process.env.BASE_URL_API}/near_by_me?type=Education%20Facility&count=100&distance=1&id=${localStorage.getItem(
        "OpenspaceID"
      )}`
    ).then(response => {
      this.setState({
        Edudata: response.data
      });

      this.plotEdu();
      Axios.get(
        `${process.env.BASE_URL_API}/near_by_me?type=Health%20Facility&count=100&distance=1&id=${localStorage.getItem(
          "OpenspaceID"
        )}`
      ).then(response => {
        this.setState({
          HealthData: response.data
        });

        this.plotHealth();


        Axios.get(
          `${process.env.BASE_URL_API}/near_by_me?type=Security%20Force&count=100&distance=1&id=${localStorage.getItem(
            "OpenspaceID"
          )}`
        ).then(response => {
          this.setState({
            SecurityData: response.data
          });

          this.plotSecurity();
          var mapRf = this.props.reff.current.leafletElement;

          mapRf.fitBounds(this.state.allNearby.getBounds().extend(this.geo.getBounds()))
          mapRf.setView(new L.LatLng(this.state.OSlatlng[0], this.state.OSlatlng[1]), mapRf.getZoom() + 1)

          // count amenties to set the zoom level, if count> 20, zoom level will be increased by 2
          var totalamenities = this.state.HealthData && this.state.Edudata && this.state.HeliData && this.state.HealthData.facility.length + this.state.Edudata.facility.length
            + this.state.HeliData.facility.length + this.state.SecurityData.facility.length

          totalamenities > 20 && mapRf.setView(new L.LatLng(this.state.OSlatlng[0], this.state.OSlatlng[1]), mapRf.getZoom() + 2)
          totalamenities < 2 && mapRf.setView(new L.LatLng(this.state.OSlatlng[0], this.state.OSlatlng[1]), mapRf.getZoom() - 1)

        });
      });
    });




  };
  plotHealth = () => {
    console.log("i", healthIcon);

    //   var HealthIcon = L.divIcon({
    //     className: 'nearby-div-icon',
    //     html: "<div class='marker-pin'></div><i class='humanitarian-icon-Medical-supply'></i>",
    //     iconSize: [30, 42],
    //     iconAnchor: [15, 42]
    // });
    var HealthIcon = L.divIcon({
      className: 'nearby-div-icon',
      html: "<div class='marker-pin'></div> <i class='humanitarian-icon-Medical-supply'></i>",
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });
    const iconPerson = new L.Icon({

      iconUrl: healthIcon,
      iconSize: [26, 34],
      // iconAnchor: [15, 42],
      popupAnchor: [-5, 5],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null
      // className: 'leaflet-div-icon'
    });


    this.state.HealthData && this.state.HealthData.facility.map(e => {
      var NearbyMarker = L.marker([e.latitude, e.longitude], { icon: HealthIcon }).addTo(this.state.allNearby);

      var popUp =
        "<div class='bind-popup'>" +
        " </div> <div class='bind-header'> <h5>" + e.name + "</h5><p><i class='material-icons'>phone</i>" + this.state.dummyNo + "<i class='material-icons pop-dir'>directions</i></p> </div>";
      NearbyMarker.bindPopup(popUp);
      NearbyMarker.on('click', () => {
        let dir = document.getElementsByClassName('pop-dir')

        for (var i = 0; i < dir.length; i++)
        {
          dir[i].addEventListener('click', () => {
            // console.log("called", i)
            if (dir[0].classList.contains('active'))
            {
              // console.log("calledif", i)

              this.props.remove()
              dir[0].classList.remove('active')

            }
            else
            {
              // console.log("calledelse", i)
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
      html: "<div class='marker-pin'></div><i class='humanitarian-icon-National-army'></i>",
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });
    //   const NearbyIcon = new L.Icon({
    //     // iconUrl: require('../img/marker-pin-person.svg'),
    //     // iconRetinaUrl: require('../img/marker-pin-person.svg'),
    //     iconUrl: securityIcon,
    //     iconSize:  [26, 34],
    //     // iconAnchor: [13, 27],
    //     popupAnchor: [-5, 5],
    //     shadowUrl: null,
    //     shadowSize: null,
    //     shadowAnchor: null
    //     // className: 'leaflet-div-icon'
    // });

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

        for (var i = 0; i < dir.length; i++)
        {
          dir[i].addEventListener('click', () => {
            // console.log("called", i)
            if (dir[0].classList.contains('active'))
            {
              // console.log("calledif", i)

              this.props.remove()
              dir[0].classList.remove('active')

            }
            else
            {
              // console.log("calledelse", i)
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
      className: 'nearby-div-icon',
      html: "<div class='marker-pin'></div><i class='humanitarian-icon-Education'></i>",
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });
    //   const NearbyIcon = new L.Icon({
    //     // iconUrl: require('../img/marker-pin-person.svg'),
    //     // iconRetinaUrl: require('../img/marker-pin-person.svg'),
    //     iconUrl: eduIcon,
    //     iconSize:  [26, 34],
    //     // iconAnchor: [13, 27],
    //     popupAnchor: [-5, 5],
    //     shadowUrl: null,
    //     shadowSize: null,
    //     shadowAnchor: null
    //     // className: 'leaflet-div-icon'
    // });

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

        for (var i = 0; i < dir.length; i++)
        {

          dir[i].addEventListener('click', () => {
            // console.log("called", i)
            if (dir[0].classList.contains('active'))
            {
              // console.log("calledif", i)

              this.props.remove()
              dir[0].classList.remove('active')

            }
            else
            {
              // console.log("calledelse", i)
              this.props.nearbyroute(this.state.OSlatlng, [e.latitude, e.longitude])
              dir[0].classList.add('active')
            }
            // this.toogleactivetoute()








          })
        }
      })
    });
  };
  plotHeli = () => {
    var NearbyIcon = L.divIcon({
      className: 'nearby-div-icon',
      html: "<div class='marker-pin'></div><i class='humanitarian-icon-Helicopter'></i>",
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });
    //   const NearbyIcon = new L.Icon({
    //     // iconUrl: require('../img/marker-pin-person.svg'),
    //     // iconRetinaUrl: require('../img/marker-pin-person.svg'),
    //     iconUrl: heliIcon,
    //     iconSize:   [26, 34],
    //     // iconAnchor: [13, 27],
    //     popupAnchor: [-5, 5],
    //     shadowUrl: null,
    //     shadowSize: null,
    //     shadowAnchor: null
    //     // className: 'leaflet-div-icon'
    // });

    this.state.HeliData && this.state.HeliData.facility.map(e => {
      // console.log("single",e);

      var NearbyMarker = L.marker([e.latitude, e.longitude], {
        icon: NearbyIcon
      }).addTo(this.state.allNearby);

      var popUp =
        "<div class='bind-popup'>" +
        " </div> <div class='bind-header'> <h5>Helipad</h5><p><i class='material-icons'>phone</i>" + this.state.dummyNo + "<i class='material-icons pop-dir'>directions</i></p> </div>";
      NearbyMarker.bindPopup(popUp);
      NearbyMarker.on('click', () => {
        let dir = document.getElementsByClassName('pop-dir')

        for (var i = 0; i < dir.length; i++)
        {
          dir[i].addEventListener('click', () => {
            // console.log("called", i)
            if (dir[0].classList.contains('active'))
            {
              // console.log("calledif", i)

              this.props.remove()
              dir[0].classList.remove('active')

            }
            else
            {
              // console.log("calledelse", i)
              this.props.nearbyroute(this.state.OSlatlng, [e.latitude, e.longitude])
              dir[0].classList.add('active')
            }
            // this.toogleactivetoute()
          })
        }
      })
    });
  };

  addlegend = () => {
    this.state.legend.onAdd = (map) => {

      var div = L.DomUtil.create('div', `leg`)
      div.innerHTML = ''
      div.innerHTML += "<h5>Legend</h6>"
      div.innerHTML += "<h6 style='margin-bottom: 10px'> <span class='legend-div'> <i class='humanitarian-icon-Education'></i> </span><font style='margin-left: 10px'>Education</font></h6>"
      div.innerHTML += "<h6 style='margin-bottom: 10px'> <span class='legend-div'><i class='humanitarian-icon-Medical-supply'></i></span><font style='margin-left: 12px'>Health Facilities</font></h6>"
      div.innerHTML += "<h6 style='margin-bottom: 10px'><span class='legend-div'><i class='humanitarian-icon-Helicopter'></i></span><font style='margin-left: 11px'>Helipad(Airports)</font></h6>"
      div.innerHTML += "<h6 style='margin-bottom: 10px'><span class='legend-div-fire'><i class='humanitarian-icon-Fire'></i></span><font style='margin-left: 12px'>Fire Brigade</font></h6>"
      div.innerHTML += "<h6 style='margin-bottom: 10px'><span class='legend-div'><i class='humanitarian-icon-National-army'></i></span><font style='margin-left: 12px'>Security Forces</font></h6>"
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
      // console.log("con")
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
        // console.log(
        //   [location.coords.latitude, location.coords.longitude],
        //   "aa"
        // );
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
    Axios.get(`${process.env.BASE_URL_API}/open_extra?id=${localStorage.getItem(
      "OpenspaceID"
    )}`)
      .then(response => {
        // console.log(this.state.OSlatlng, "OSLATLNG", response)
        this.setState({ OSlatlng: [response.data.data[0].centroid[1], response.data.data[0].centroid[0]] })
        // console.log(this.state.OSlatlng, "OSLATLNG", response)

        this.zoomTomylocation();




      })
  }

  plotfacilities = () => {
    Axios.get(`${process.env.BASE_URL_API}/alternative_near_by_me?id=${localStorage.getItem(
      "OpenspaceID"
    )}&distance=1`)
      .then(res => {
        // console.log("rr", res)
        // debugger
      })

  }

  componentDidUpdate(prevProps) {

    if (prevProps.wmsIsOpen !== this.props.wmsIsOpen)
    {

      if (this.props.wmsIsOpen == true)
      {
        this.setState({
          wmsLoading: 'block'
        })
      } else
      {
        this.setState({
          wmsLoading: 'none'
        }, () => {

          this.props.dispatch({
            type: 'wmsLoaded',
            loaded: true
          })
        })
      }

      if (this.props.loaded == true)
      {
        this.setState({
          wmsLoading: 'none'
        }

        )
      }
    }


    if (prevProps.loaded !== this.props.loaded)
    {

      if (this.props.loaded == true)
      {
        this.setState({
          wmsLoading: 'none'
        }

        )
      }

      else
      {
        this.setState({
          wmsLoading: 'block'
        }

        )
      }
    }





  }
  componentDidMount() {
    this.onload();
    this.plotNearby();
    this.currentloc();
    this.getOSlatlng();
    this.addlegend();

    this.state.allNearby.addTo(this.props.reff.current.leafletElement);

    Axios.get(
      `${process.env.BASE_URL_API}/single_open_geo_json?id=${localStorage.getItem(
        "OpenspaceID"
      )}`
    ).then(response => {
      // console.log("oop", response.data);

      geo = L.geoJSON(response.data, {
        fillColor: "blue",
        fillOpacity: 0.3,
        color: "green",
        weight: 2
      })
      geo.addTo(this.props.reff.current.leafletElement);



      this.geo = geo
      // this.props.reff.current.leafletElement.fitBounds(geo.getBounds(), {
      //   // padding: [200, 200]
      // });
      // this.props.reff.current.leafletElement.setZoom(
      //   this.props.reff.current.leafletElement.getZoom() - 2
      // );
    });
  }
  render() {

    while (geo !== null)
    {
      this.props.wmsIsOpen && geo && this.props.wmsIsOpen === true ? geo.setStyle({
        fillOpacity: 0
      }) :
        geo.setStyle({
          fillOpacity: 0.3
        })
      if (geo !== null) break;
    }



    // let zoomL = this.props.wmsIsOpen === true ? '30' : '20';
    // console.log("zzom", zoomL);
    let zoomL = 22;

    return (
      <>
        {/* <div onClick={()=>this.props.fetchroute([ 27.70419959812,85.315
         ],[ 27.704199598618246,85.31621932983398
         ])}>Clickme</div> */}

        <div
          // id='Spinner'
          style={{
            display: `${this.state.wmsLoading}`,
            // display: 'block',
            background: 'white',
            opacity: '0.6',
            position: 'absolute',
            zIndex: '500',
            textAlign: 'center',
            left: '50%',
            padding: '8px',
            top: '4px',
            // height: '200px'

          }}
        >
          <Spinner />

        </div>
        <LeafletMap
          center={[27, 85]}
          zoom={7}
          maxZoom={22}
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
                maxZoom={zoomL}
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>
            <BaseLayer name="Google Hybrid">
              <TileLayer
                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                url=".facilityhttp://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                maxZoom={zoomL}
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>
            <BaseLayer name="Google Satellite">
              <TileLayer
                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                maxZoom={zoomL}
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>
            <BaseLayer name="Google Terrain">
              <TileLayer
                attribution='&amp;copy <a href="http://maps.google.com">Google Maps</a> contributors'
                url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                maxZoom={zoomL}
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>

            <BaseLayer name="Mapbox Streets" checked={true}>
              <TileLayer
                attribution='&amp;copy Developer:<a href=" http://naxa.com.np">NAXA</a>'
                // https://api.mapbox.com/styles/v1/upendraoli/cjuvfcfns1q8r1focd0rdlgqn/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidXBlbmRyYW9saSIsImEiOiJjaWYwcnFnNmYwMGY4dGZseWNwOTVtdW1tIn0.uhY72SyqmMJNTKa0bY-Oyw'
                url="https://api.mapbox.com/styles/v1/naxa-np/cka9lr90s0tgp1is4gep38xi3/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmF4YS1ucCIsImEiOiJja2E5bGp0ZDQwdHE4MnJxdnhmcGxsdGpuIn0.kB42E50iZFlFPcQiqQMClw"
                maxZoom={zoomL}
              // subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </BaseLayer>
          </LayersControl>
        </LeafletMap>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    wmsIsOpen: state.wmsIsOpen,
    loaded: state.loaded
  };
};

export default connect(mapStateToProps)(OSDetails);
