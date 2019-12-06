import React, { Component } from "react";
import Axios from "axios";

import DetailsHeader from "./DetailsHeader";
import TabNavbar from "./TabNavbar";
import GeneralInfo from "../GeneralInfo/GeneralInfo";
import ReportTab from "./ReportTab/ReportTab";
import NearbyTab from "./NearbyTab/NearbyTab";
import { withRouter } from 'react-router-dom';
import L from 'leaflet'


import { connect } from "react-redux";
import Gallery from "./Gallery/Gallery";

class DetailsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spaceInfo: "",
      tabid: 1,
      shortest:null,
      calculatedistance:true,
      Routespaths:null,
      Routes: L.featureGroup(),
      legend: L.control({ position: 'bottomleft' }),

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
    ).then(response =>  {
      
      this.setState({ spaceInfo: response.data })
      this.currentloc()
     




    });
  };

  removeRoute=()=>{
    this.state.Routes.eachLayer((e=>this.state.Routes.removeLayer(e)))
    this.props.reff.current.leafletElement.removeControl(this.state.legend)

  }
  componentDidMount() {
    this.onload();
    this.fetchDetails();
    this.props.reff.current.leafletElement.addLayer(this.state.Routes)
  }
  changetabid = e => {
    this.setState({ tabid: e });
  };
  currentloc=()=>{
         
    navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition((location) => {
        var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
        console.log([location.coords.latitude, location.coords.longitude], "aa")
        // this.props.setcurrentLocation([location.coords.latitude, location.coords.longitude])
        this.setState({ currentLocation: [location.coords.latitude, location.coords.longitude] })
        L.circleMarker(latlng, { radius: 6, fillColor: 'red', fillOpacity: 1, weight: 15, opacity: 0.3, color: 'red', }).addTo(this.props.reff.current.leafletElement);
        console.log("current", this.state.currentLocation)
      this.getshortestdistance(this.state.spaceInfo.centroid.reverse(),this.state.currentLocation)

    
    })
 }
 Routing=()=>{
   this.fetchroute(this.state.spaceInfo.centroid,this.state.currentLocation)
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
        var polyline = L.polyline(path, { color: j == 0 ? '#174BDD' : 'grey' })
        this.state.Routespaths.push({ id: j, path: polyline, description: Response.data.paths[j].description == undefined ? "No Descrption" : Response.data.paths[j].description[0], distance: Response.data.paths[j].distance })

        this.state.Routes.addLayer(polyline)
        this.props.reff.current.leafletElement.fitBounds(polyline.getBounds())

      }
      this.state.Routespaths[0].path.bringToFront()
      var activeroute = 0











      // var legend = L.control({ position: 'bottomright' })
      this.state.legend.onAdd = (map) => {

        var div = L.DomUtil.create('div', `routeWrapper`)
        div.innerHTML = ''
        // div.innerHTML += "<img src='../../src/img/close.png' id='close-bt-route'></img>"

        div.innerHTML += "<h6 id='legendtitle'>Routes</h6>"
        console.log(this.state.Routespaths)
        var distances=[]
        this.state.Routespaths.forEach((a)=>{
          distances.push(a.distance)

        })
        var min=Math.min(...distances)
        // this.state.Routespaths.filter((e)=>{
        //   return e.distance==min
        // })


        this.state.Routespaths.map(e => {
          // console.log(activeroute)

          var class1 = 'desccard';
          // var activeclass=class1
          var Shortest= min==e.distance?"Shortest":""

          var descCard = `<div  class=${class1} name=` + e.id + ">" +
            "<h6>" + e.description + "<span>" + Shortest+ "</span>"+"</h6>" +
            "<i class='material-icons'>near_me</i>"+
            "<span>" + e.distance + " m" +
          "<div>";



          div.innerHTML += descCard
          activeroute++

        })
        // innterhtml




        return div;
      }




      // if(divss!=0){
      //   for(var i=0;i<divss.length;i++){


      //     divss[i].innerHTML='<h1>a</h1>'



      //   }
      // }


      this.state.legend.addTo(this.props.reff.current.leafletElement)
      // console.log(this.state.Routespaths)

      var divss = document.getElementsByClassName('routeWrapper');






      var doc = document.getElementsByClassName('desccard')
      doc[0].classList.add('pathactive')

      for (var i = 0; i < doc.length; i++) {
        doc[i].addEventListener('click', (e) => {
          // console.log(e.target.getAttribute('name'));
          var value = e.target.getAttribute('name')
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

              selected[0].path.setStyle({ color: '#174BDD' })

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
    });
  };

  render() {
    this.props.id && localStorage.setItem("OpenspaceID", this.props.id);

    return (
      <div>
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
                      <NearbyTab id={this.props.id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    spaceID: state.spaceID
  };
};
export default withRouter(connect(mapStateToProps)(DetailsCard));
