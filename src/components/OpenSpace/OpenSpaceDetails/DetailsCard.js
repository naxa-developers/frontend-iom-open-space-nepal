import React, { Component } from "react";
import Axios from "axios";

import DetailsHeader from "./DetailsHeader";
import TabNavbar from "./TabNavbar";
import GeneralInfo from "../GeneralInfo/GeneralInfo";
import ReportTab from "./ReportTab/ReportTab";
import NearbyTab from "./NearbyTab/NearbyTab";
import { withRouter } from 'react-router-dom';
import L from 'leaflet'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PerfectScrollbarPS from 'perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import droneIcon from '../../../img/drone-icon1.png'
import '../OpenSpaceCSS.css'
import { connect } from "react-redux";
import Gallery from "./Gallery/Gallery";


class DetailsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spaceInfo: "",
      tabid: 1,
      shortest: null,
      calculatedistance: true,
      Routespaths: null,
      Routes: L.featureGroup(),
      legend: L.control({ position: 'bottomleft' }),
      wmsToggle: L.control({ position: 'topright' }),
      isActive: false,
      wms: false



    };
  }


  onload = () => {
    var windowHeight = window.innerHeight;

    var navHeight = document.getElementsByClassName("site-header")[0]
      .clientHeight;

    document.getElementsByClassName(
      "sidebar-wrapper"
    )[0].style.height = `${windowHeight - navHeight}px`;
  };

  fetchDetails = () => {
    Axios.get(
      `https://iomapi.naxa.com.np/api/v1/open_space/${localStorage.getItem("OpenspaceID")}`
    ).then(response => {

console.log("for geojson", response.data);




      this.setState({ spaceInfo: response.data })
      this.currentloc()
      var mrk = new L.circleMarker([response.data.centroid[1], response.data.centroid[0]], { radius: 6, fillColor: '#095c05', fillOpacity: 1, weight: 15, opacity: 0.3 })
      let address = response.data.address == null ? "Nepal" : response.data.address
      // var shortest=this.getshortestdistance(this.state.spaceInfo.centroid.reverse(),this.state.currentLocation)
      var pop = "<div class='bind-popup'> <div class='bind-header'><h5>" + response.data.title + "</h5> <p><i class='material-icons' style='font-size:16px'>room</i>" + address + "<i class='material-icons pop-dir'>directions</i></p></div></div>"

      mrk.bindPopup(pop)
      mrk.addTo(this.props.reff.current.leafletElement)

      mrk.on('click', () => {
        let dir = document.getElementsByClassName('pop-dir')

        for (var i = 0; i < dir.length; i++) {
          dir[i].addEventListener('click', () => {
            if (this.state.isActive) {
              this.removeRoute()
              dir[0].classList.remove('active')

            }
            else {
              this.Routing()
              dir[0].classList.add('active')
            }
            this.toogleactivetoute()








          })
        }
      })
      mrk.fire('click')







    });
  };

  removeRoute = () => {
    this.state.Routes.eachLayer((e => this.state.Routes.removeLayer(e)))
    this.props.reff.current.leafletElement.removeControl(this.state.legend)

  }

  addWms = () => {


    this.state.wmsToggle.onAdd = (w) => {

      var div = L.DomUtil.create('div', `wms`)
      div.innerHTML = ''

      div.innerHTML += `<h6> <span class='wms-div'> </span ><img class='droneimage' src=${droneIcon} > </img></h6>`

      return div

    }
    this.state.wmsToggle.addTo(this.props.reff.current.leafletElement)

    let wmsLayer = null;
    if (this.state.spaceInfo.geoserver_url!==null) {
   
      document.getElementsByClassName('wms')[0].addEventListener('click', () => {
  
        this.setState({ wms: !this.state.wms }, () => {
          {
            if (this.state.wms == true) {
  
              wmsLayer = L.tileLayer.wms(this.state.spaceInfo.geoserver_url, {
                layers: this.state.spaceInfo.workspace + ':' + this.state.spaceInfo.layername
              })
  
  
  console.log("add");
  
              wmsLayer.addTo(this.props.reff.current.leafletElement);
              wmsLayer.bringToFront();
            } else {
  
  
              this.props.reff.current.leafletElement.removeLayer(wmsLayer)
  
  
  
            }
  
  
          }
  
  
        })
      }
      )
    }

  }

  componentDidMount() {



    const map = this.props.reff.current.leafletElement;
    map.createPane("tilePane").style.zIndex = 200;
    map.createPane("baseLayerPane").style.zIndex = 250;
    map.createPane("wmsPane").style.zIndex = 300;
    map.createPane("overlayPane").style.zIndex = 400;
    map.createPane("polygonsPane").style.zIndex = 450;
    map.createPane("linesPane").style.zIndex = 460;
    map.createPane("shadowPane").style.zIndex = 500;
    map.createPane("markerPane").style.zIndex = 600;
    map.createPane("pointsPane").style.zIndex = 600;
    map.createPane("tooltipPane").style.zIndex = 650;
    map.createPane("popupPane").style.zIndex = 700;
    map.createPane("maskPane").style.zIndex = 700;
    map.createPane("topPane").style.zIndex = 701;



    this.onload();
    this.fetchDetails();
    this.props.reff.current.leafletElement.addLayer(this.state.Routes)
    this.addWms();



  }
  changetabid = e => {
    this.setState({ tabid: e });
  };
  currentloc = () => {

    navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition((location) => {
      var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
      // console.log([location.coords.latitude, location.coords.longitude], "aa")
      // this.props.setcurrentLocation([location.coords.latitude, location.coords.longitude])
      this.setState({ currentLocation: [location.coords.latitude, location.coords.longitude] })
      // L.circleMarker(latlng, { radius: 6, fillColor: 'red', fillOpacity: 1, weight: 15, opacity: 0.3, color: 'red', }).addTo(this.props.reff.current.leafletElement);
      // console.log("current", this.state.currentLocation)
      this.getshortestdistance(this.state.spaceInfo.centroid.reverse(), this.state.currentLocation)


    })
  }
  Routing = () => {
    this.fetchroute(this.state.spaceInfo.centroid, this.state.currentLocation)
  }

  fetchroute = (first, second) => {
    // L.tooltip().setLatLng(first).setContent('<h6>latlng</h6>').addTo(this.props.mapRefs.current.leafletElement)
    // map.closeTooltip();



    this.state.Routespaths = []
    this.state.Routes.eachLayer((r) => this.state.Routes.removeLayer(r))
    var baseUrl = "https://route.naxa.com.np/route";
    var url =
      `${baseUrl}?point= ${first[0]},${first[1]},` +
      `&point=${second[0]},${second[1]}` +
      "&points_encoded=false" +
      "&ch.disable=true" +
      "&alternative_route.max_paths=4" +
      "&algorithm=alternative_route";
    var colors = ["red", 'green', 'black']


    Axios.get(url)
      .then(Response => {
        // console.log(Response.data)


        for (var j = 0; j < Response.data.paths.length; j++) {
          var path = []
          for (var i = 0; i < Response.data.paths[j].points.coordinates.length; i++) {

            path.push(Response.data.paths[j].points.coordinates[i].reverse())
          }
          // console.log(Response.data.paths[j].description)
          var polyline = L.polyline(path, { color: j == 0 ? 'blue' : 'grey' })
          this.state.Routespaths.push({ id: j, path: polyline, description: Response.data.paths[j].description == undefined ? "No Description" : Response.data.paths[j].description[0], distance: Response.data.paths[j].distance })

          this.state.Routes.addLayer(polyline)
          this.props.reff.current.leafletElement.fitBounds(polyline.getBounds())

        }
        this.state.Routespaths[0].path.bringToFront()
        var activeroute = 0
        this.state.Routespaths.map((e) => {
          e.path.on('click', () => {
            this.state.Routespaths.map((i) => {
              i.path.setStyle({ color: 'grey' })
            })
            this.state.Routespaths[e.id].path.setStyle({ color: 'blue' })
            this.state.Routespaths[e.id].path.bringToFront();
            var doac = document.getElementsByClassName('desccard')
            // console.log(doac,doc.length)
            // doac.map((a)=>{
            //   console.log(a)
            // })
            for (var i = 0; i < doac.length; i++) {
              // console.log(doac[i],doac[i].getAttribute('name'))
              // var selectindex=doac[i].getAttribute('name')
              // var filtered=this.state.Routespaths.filter((d)=>d.id==selectindex)
              doac[i].classList.contains('pathactive') && doac[i].classList.remove('pathactive')
              console.log(doac[i].getAttribute('name') == e.id)
              doac[i].getAttribute('name') == e.id && doac[i].classList.add('pathactive')


            }








          })

        })











        // var legend = L.control({ position: 'bottomright' })
        this.state.legend.onAdd = (map) => {

          var div = L.DomUtil.create('div', `routeWrapper`)
          div.innerHTML = ''
          // div.innerHTML += "<img src='../../src/img/close.png' id='close-bt-route'></img>"

          div.innerHTML += "<h6 id='legendtitle'>Routes<span> <i id ='close-routeD' class='material-icons'>close</i></span></h6>"
          // console.log(this.state.Routespaths)
          var distances = []
          this.state.Routespaths.forEach((a) => {
            distances.push(a.distance)

          })
          var min = Math.min(...distances)
          // this.state.Routespaths.filter((e)=>{
          //   return e.distance==min
          // })
          const newData = [
            this.state.Routespaths.find(item => item.distance === min),
            ...this.state.Routespaths.filter(item => item.distance != min),
          ]
          this.state.Routespaths = newData


          this.state.Routespaths.map(e => {
            // console.log(activeroute)

            var class1 = 'desccard';
            // var activeclass=class1
            var Shortest = min == e.distance ? "Shortest" : ""

            var descCard = `<div  class=${class1} name=` + e.id + ">" +
              "<h6>" + e.description + "<span>" + Shortest + "</span>" + "</h6>" +
              "<p><i class='material-icons'>near_me</i>" +
              "<span>" + e.distance + " m" + "</p>"
            "<div>";



            div.innerHTML += descCard
            activeroute++

          })
          setTimeout(() => {
            const ps = new PerfectScrollbarPS('.routeWrapper', {
              wheelSpeed: 2,
              wheelPropagation: true,
              minScrollbarLength: 20
            });

          }, 1000)



          return div;

        }




        // if(divss!=0){
        //   for(var i=0;i<divss.length;i++){


        //     divss[i].innerHTML='<h1>a</h1>'



        //   }
        // }



        this.state.legend.addTo(this.props.reff.current.leafletElement)
        let dom = document.getElementsByClassName('routeWrapper')
        L.DomEvent.on(dom[0], 'mousewheel', L.DomEvent.stopPropagation);
        // console.log(this.state.Routespaths)

        var divss = document.getElementsByClassName('routeWrapper');


        var divss = document.getElementById('close-routeD');
        divss.addEventListener("click", () => {
          this.removeRoute()
          document.getElementsByClassName("space-direction active")[0].classList.remove("active")
          this.toogleactivetoute()


        })




        var doc = document.getElementsByClassName('desccard')
        doc[0].classList.add('pathactive')

        for (var i = 0; i < doc.length; i++) {
          doc[i].addEventListener('click', (e) => {
            // console.log(e.target.getAttribute('name'));
            var value = e.target.closest(".desccard").getAttribute('name')
            var selected = this.state.Routespaths.filter((a) => {
              return a.id == value
            })

            for (var a = 0; a < doc.length; a++) {
              if (doc[a].getAttribute('name') == value) {
                doc[a].classList.add('pathactive')
                for (var k = 0; k < this.state.Routespaths.length; k++) {
                  this.state.Routespaths[k].path.setStyle({
                    color: 'grey'
                  })
                }

                selected[0].path.setStyle({ color: 'blue' })

                selected[0].path.bringToFront()

              }
              else {
                doc[a].classList.remove('pathactive')


              }
            }


          }
          )
        }





      }
      )

  }


  getshortestdistance = (first, second) => {
    // console.log(first,second,this.props.currentLocation);
    var baseUrl = "https://route.naxa.com.np/route";
    var distances = [];
    // console.log(first,second)
    var url =
      `${baseUrl}?point= ${first[0]},${first[1]},` +
      `&point=${second[0]},${second[1]}` +
      "&points_encoded=false" +
      "&ch.disable=true" +
      "&alternative_route.max_paths=4" +
      "&algorithm=alternative_route";
    Axios.get(url).then(Response => {
      //   console.log(Response.data.paths)
      for (var i = 0; i < Response.data.paths.length; i++) {
        //   console.log(Response.data.paths[i])
        distances.push(Response.data.paths[i].distance);
      }
      let shortest = Math.min(...distances);
      this.setState({
        shortest: (shortest / 1000).toFixed(2),
        calculatedistance: false
      });
      return shortest
    });
  };

  toogleactivetoute = () => {
    let sta = this.state.isActive ? false : true

    this.setState({ isActive: sta })
  }

  // componentDidUpdate() {
  //   console.log("didupdate",this.nearbyref)

  // }

  render() {

    this.props.id && localStorage.setItem("OpenspaceID", this.props.id);
    return (
      <div >
        <PerfectScrollbar>
          <div className="map-sidebar">
            <div className="sidebar-wrapper">
              <span
                onClick={() => this.props.history.push("/openspace")}
                class="sidebar-close material-icons"
              >
                close
            </span>

              <div className="card">
                <div className="card-body">
                  <DetailsHeader

                    title={this.state.spaceInfo && this.state.spaceInfo.title}
                    address={this.state.spaceInfo.address}
                    image={this.state.spaceInfo.image}
                    shortest={this.state.shortest}
                    Routing={this.Routing}
                    reff={this.props.reff}
                    removeRoute={this.removeRoute}
                    isActive={this.state.isActive}
                    toogleactivetoute={this.toogleactivetoute}
                  />
                  <TabNavbar
                    tabid={this.state.tabid}
                    changetabid={this.changetabid}
                  />

                  <div className="tab-wrapper">
                    <div className="tab-content" id="myTabContent">
                      <div
                        className={
                          this.state.tabid == 1
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                        id="general"
                        role="tabpanel"
                        aria-labelledby="general_tab"
                      >
                        <GeneralInfo
                          id={this.props.id}
                          capacity={this.state.spaceInfo.capacity}
                          total_area={this.state.spaceInfo.total_area}
                          usable_area={this.state.spaceInfo.usable_area}
                          suggested_use={this.state.spaceInfo.suggested_use}
                          services={this.state.spaceInfo.services}
                          title={this.state.spaceInfo.title}
                          question_data={this.state.spaceInfo.question_data}
                          description={this.state.spaceInfo.description}
                          province={this.state.spaceInfo.province_name}
                          municipality={this.state.spaceInfo.municipality_name}
                          ward={this.state.spaceInfo.ward}
                          ownership={this.state.spaceInfo.ownership}
                          special_feature={this.state.spaceInfo.special_feature}
                          access={this.state.spaceInfo.access_to_site}
                          elevation={this.state.spaceInfo.elevation}
                        />
                      </div>
                      <div
                        className={
                          this.state.tabid == 2
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                        id="images"
                        role="tabpanel"
                        aria-labelledby="images_tab"
                      >
                        <Gallery id={this.props.id} />
                      </div>
                      <div
                        className={
                          this.state.tabid == 3
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                        id="reports"
                        role="tabpanel"
                        aria-labelledby="report_tab"
                      >
                        <ReportTab id={this.props.id} />
                      </div>
                      <div
                        className={
                          this.state.tabid == 4
                            ? "tab-pane fade show active"
                            : "tab-pane fade"
                        }
                        id="nearby"
                        role="tabpanel"
                        aria-labelledby="nearby_tab"
                      >
                        <NearbyTab reff={this.props.reff} ref={comp =>
                          this.nearbyref =
                          comp} fetchroute={this.fetchroute} reff={this.props.reff} OSlatlng={this.state.spaceInfo.centroid} id={this.props.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    spaceID: state.spaceID
  };
};


export default withRouter(connect(mapStateToProps, null, null, { forwardRef: true })(DetailsCard));
