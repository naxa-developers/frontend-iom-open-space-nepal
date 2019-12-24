import React, { Component } from "react";
import Select from "react-select";
import OpenSpaceCard from "./OpenSpaceCard";
import Loader from '../Report/LoadingSpinner';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoaderBig from '../Report/LoadingSpinnerBig';


import "./OpenSpaceCSS.css";
import "react-perfect-scrollbar/dist/css/styles.css";

import L from "leaflet";
import 'leaflet.markercluster'

import MaterialIcon from "material-icons-react";
import Axios from "axios";
import mrk from '../../img/mrk.png'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import LoadingSpinner from "../Report/LoadingSpinner";
import { ToastContainer, toast } from 'react-toastify';

require('leaflet.markercluster')



class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.fetched=false

    this.sidebarToggle = this.sidebarToggle.bind(this);
    this.state = {
      Openspaces: null,
      showContent: true,
      province: null,
      district: null,
      municipality: null,
      SelectedProvince: null,
      SelectedDistrict: null,
      SelectedMunicipality: null,
      nearbyOS: null,
      Allos: [],
      handlingindex: 0,
      focused: false,
      loading: true,
      nearbytoogle: false,
      district_muni: L.featureGroup(),
      Routespaths: [],
      Routes: L.featureGroup(),
      nearbyGroup: L.featureGroup(),
      legend: L.control({ position: 'bottomleft' }),
      div: L.DomUtil.create('div', 'routeWrapper'),
      OSmarkers: L.markerClusterGroup({ disableClusteringAtZoom: 14 }),
      markersLegend: L.control({ position: 'bottomright' }),
      ActiveRouteindex: null

    };
  }

  setActivefalse = (e) => {
    this.setState({ ActiveRouteindex: e })
  }

  sidebarToggle = event => {
    event.preventDefault();
    this.setState({
      showContent: !this.state.showContent
    });
  };

  fetchingForDropdown = name => {
    var key =
      name == "province"
        ? "province_api"
        : name == "district"
          ? "district_api"
          : name == "municipality"
            ? "municipality_api"
            : "";
    var url = `https://iomapi.naxa.com.np/api/v1/${key}`;
    var prvnc_dist =
      name == "district"
        ? "province"
        : name == "municipality"
          ? "district"
          : "";

    Axios.get(url).then(response => {
      var array = [];
      // console.log(response.data.data[0][prvnc_dist.toString()],"..a.a.a.")
      response.data.data.map(e => {
        let object = {
          value: e.id,
          label: e.name,
          [prvnc_dist]: e[prvnc_dist.toString()]
        };
        array.push(object);
      });
      this.setState({ [name]: array, [name + "tofilter"]: array });
    });
  };
  fetchOS = () => {
    Axios.get("https://iomapi.naxa.com.np/api/v1/open_space_landing").then(
      response => {
        this.setState({
          Allos: response.data.data,
          Openspaces: response.data.data,
          loading: !this.state.loading
        });
        sessionStorage.setItem('Openspaces', JSON.stringify(response.data.data))
        sessionStorage.setItem('stored', true)
        // this.fetched=true


        // this.state.Allos.map(e => {
        //   console.log(this.props.mapRefs);
        // });
        this.displayOS();
      }
    );
  };

  onload = () => {
    var windowHeight = window.innerHeight;

    var navHeight = document.getElementsByClassName("site-header")[0]
      .clientHeight;

    document.getElementsByClassName(
      "sidebar-wrapper"
    )[0].style.height = `${windowHeight - navHeight}px`;
  };
  handleprovince = e => {
    this.setState({ SelectedProvince: e });

    let FilteredDistrict = this.state.districttofilter.filter(i => {
      return i.province == e.label;
    });
    this.setState({
      district: FilteredDistrict,
      handlingindex: 1,
      SelectedDistrict: null,
      SelectedMunicipality: null
    });
  };

  handledistrict = e => {
    this.setState({ SelectedDistrict: e });
    this.setState({ handlingindex: 2 });
    // this.props.mapRefs.current.leafletElement = this.props.mapRefs.current.leafletElement;
    // this.state.district_muni.eachLayer(e =>
    //   this.state.district_muni.removeLayer(e)
    // );

    let FilteredMunicipality = this.state.municipalitytofilter.filter(i => {
      return i.district == e.label;
    });
    this.setState({ municipality: FilteredMunicipality, handlingindex: 2 });

    // Axios.get(
    //   `https://iomapi.naxa.com.np/api/v1/district_geo_json?id=${e.value}`
    // ).then(response => {
    //   var district = L.geoJSON(response.data);
    //   district.addTo(this.state.district_muni);
    //   this.props.mapRefs.current.leafletElement.fitBounds(
    //     this.state.district_muni.getBounds()
    //   );
    //   // console.log(this.state.district_muni.getBounds())
    //   // var zoom=this.props.mapRefs.current.leafletElement.getZoom()

    //   // this.props.mapRefs.current.leafletElement.setZoom(zoom-3)
    // });
    this.setState({ SelectedMunicipality: null });
  };

  handlemunicipality = e => {
    this.setState({ SelectedMunicipality: e });
    // this.props.mapRefs.current.leafletElement = this.props.mapRefs.current.leafletElement;
    // this.state.district_muni.eachLayer(e =>
    //   this.state.district_muni.removeLayer(e)
    // );

    // Axios.get(
    //   `https://iomapi.naxa.com.np/api/v1/municipality_geo_json?id=${e.value}`
    // ).then(response => {
    //   var municipality = L.geoJSON(response.data);
    //   municipality.addTo(this.state.district_muni);
    //   this.props.mapRefs.current.leafletElement.fitBounds(
    //     this.state.district_muni.getBounds()
    //   );

    //   // var zoom = this.props.mapRefs.current.leafletElement.getZoom();
    // });


  };

  addlegend = () => {
    this.state.markersLegend.onAdd = (map) => {

      var div = L.DomUtil.create('div', `markersLegend`)
      div.innerHTML = ''



      // console.log(activeroute)

      var class1 = 'desccard';
      // var activeclass=class1

      var descCard = "<ul id='mrk-lg'><h6>Legend</h6><li><span class='legend blue'></span><p>Openspace</p></li></ul>";



      div.innerHTML += descCard







      return div;
    }
    this.state.markersLegend.addTo(this.props.mapRefs.current.leafletElement)


  }

  onApply = () => {
    this.setState({ loading: true })
    this.props.mapRefs.current.leafletElement = this.props.mapRefs.current.leafletElement;
    this.state.district_muni.eachLayer(e =>
      this.state.district_muni.removeLayer(e)
    );
    // console.log("apply",this.state.SelectedProvince,this.state.SelectedDistrict,this.state.SelectedMunicipality)
    if (this.state.SelectedProvince && this.state.SelectedDistrict && this.state.SelectedMunicipality) {
      Axios.get(
        `https://iomapi.naxa.com.np/api/v1/municipality_geo_json?id=${this.state.SelectedMunicipality.value}`
      ).then(response => {
        var municipality = L.geoJSON(response.data, {
          style: () => {
            return {
              color: '#174BDD',
              fillColor: '#174BDD',
              fillOpacity: 0.1,
              weight: 1
            }
          }
        });
        let FilteredOS = this.state.Openspaces.filter((e) => e.municipality == this.state.SelectedMunicipality.value)
        console.log(FilteredOS)
        this.setState({ Allos: FilteredOS, loading: false })
        this.displayOS()
        municipality.addTo(this.state.district_muni);
        this.props.mapRefs.current.leafletElement.fitBounds(
          this.state.district_muni.getBounds()
        );
      })
    }
    else if (this.state.SelectedProvince && this.state.SelectedDistrict) {
      this.props.mapRefs.current.leafletElement = this.props.mapRefs.current.leafletElement;
      this.state.district_muni.eachLayer(e =>
        this.state.district_muni.removeLayer(e)
      );
      Axios.get(
        `https://iomapi.naxa.com.np/api/v1/district_geo_json?id=${this.state.SelectedDistrict.value}`
      ).then(response => {
        var municipality = L.geoJSON(response.data, {
          style: () => {
            return {
              color: '#174BDD',
              fillColor: '#174BDD',
              fillOpacity: 0.1,
              weight: 1
            }
          }
        });
        let FilteredOS = this.state.Openspaces.filter((e) => e.district == this.state.SelectedDistrict.value)
        console.log(FilteredOS)
        this.setState({ Allos: FilteredOS, loading: false })
        this.displayOS()

        municipality.addTo(this.state.district_muni);
        this.props.mapRefs.current.leafletElement.fitBounds(
          this.state.district_muni.getBounds()
        );
      })
    }
    else if (this.state.SelectedProvince) {
      // let FilteredOS = this.state.Openspaces.filter((e) => e.province == this.state.SelectedProvince.value)
    
      // this.setState({ Allos: FilteredOS, loading: false })
      // this.displayOS()

      Axios.get(
        `https://iomapi.naxa.com.np/api/v1/province_geo_json?id=${this.state.SelectedProvince.value}`
      ).then(response => {
        console.log(response,'re')
        var Province = L.geoJSON(response.data, {
          style: () => {
            return {
              color: '#174BDD',
              fillColor: '#174BDD',
              fillOpacity: 0.1,
              weight: 1
            }
          }
        });
        let FilteredOS = this.state.Openspaces.filter((e) => e.province == this.state.SelectedProvince.value)
        console.log(FilteredOS)
        this.setState({ Allos: FilteredOS, loading: false })
        this.displayOS()
        Province.addTo(this.state.district_muni);
        this.props.mapRefs.current.leafletElement.fitBounds(
          this.state.district_muni.getBounds()
        );
      })


      // this.props.mapRefs.current.leafletElement.fitBounds(
      //   this.state.district_muni.getBounds()
      // );


    }




  }
  searchOs = () => {



    var Filtered = this.state.Openspaces.filter(e =>
      e.title.toUpperCase().includes(this.state.search_keyword.toUpperCase())
    )


    this.state.OSmarkers.clearLayers()
    this.setState({ Allos: Filtered })


    setTimeout(() => {
      this.displayOS()
      this.props.mapRefs.current.leafletElement.fitBounds(this.state.OSmarkers.getBounds())
    }, 100)
  };

  nearbymeOS = () => {
    Axios.get(`https://iomapi.naxa.com.np/api/v1/near_by_openspace?count=100&distance=2&latitude=${this.props.currentLocation[0]}&longitude=${this.props.currentLocation[1]}`)
      .then(response => {
        this.setState({ nearbyOS: response.data.open_space })
        if (response.data.open_space.length != 0) {
          this.props.mapRefs.current.leafletElement.removeLayer(this.state.OSmarkers)
          this.setState({ Allos: response.data.open_space })
          this.displaynearbyOs()
        }
        else {
          this.notify()
        }
        console.log(response.data.open_space ,this.state.Openspaces)



      })

  }

  displaynearbyOs = () => {
    this.state.nearbyGroup.eachLayer(e => this.state.nearbyGroup.removeLayer(e))

    this.state.nearbyOS.map(e => {
      var icon = L.divIcon({
        className: 'nearbymarker',
        html: "<i class='OSmarker'></i>",
        // iconSize: [4, 4],
        // iconAnchor: [12, 6]
      });
      var htmlmrk = L.marker([e.centroid[1], e.centroid[0]], { icon: icon });
      var mrk = new L.circleMarker([e.centroid[1], e.centroid[0]], { radius: 6, fillColor: 'green', fillOpacity: 1, weight: 15, opacity: 0.3, color: 'green', pane: 'nearby' })
      var popup = "<h5>" + e.title + "</h5>" +
        "<h6>" + e.municipality + "</h6>"
      var pop = "<div class='bind-popup'> <div class='bind-header'><h5>" + e.title + "</h5><p><i class='material-icons' style='font-size:16px'>room</i>" + e.address + "<i class='material-icons pop-dir'>directions</i></p><a  class='openSpace_btn' href='/#/OpenSpaceDetails'>View Details</a></div></div>"

      htmlmrk.bindPopup(pop)
      htmlmrk.on('click', () => {
        var classes = document.getElementsByClassName('openSpace_btn')
        for (var i = 0; i < classes.length; i++) {
          classes[i].addEventListener('click', () => {
            this.props.dispatch({ type: "spaceClicked", id: e.id })
            this.props.history.push('/OpenSpaceDetails');

          })
        }
        let dir=document.getElementsByClassName('pop-dir')
          
          for(var i=0;i<dir.length; i++){
            dir[i].addEventListener('click',()=>{
             
              const newData = [
                this.state.Allos.find(item => item.id === e.id),
                ...this.state.Allos.filter(item => item.id != e.id),
              ]
              this.setState({Allos:newData})
              if(this.state.ActiveRouteindex==e.id){
                console.log(dir)
                dir[0].classList.remove('active')
                this.removeRoutes();
                this.setActivefalse(null)

            }
            else{
              console.log(i,dir)
                
                this.fetchroute([e.centroid[1], e.centroid[0]], this.props.currentLocation)
                this.setActivefalse(e.id)
                dir[0].classList.add('active')

                

            }


          })
          }

      })


      htmlmrk.addTo(this.state.nearbyGroup)

    })
    document.getElementById('mrk-lg').innerHTML+="<li id='nearbylegend' ><span class='legend green'></span><p>Nearby OS</p></li>"
    this.state.nearbyGroup.bringToFront()
    this.props.mapRefs.current.leafletElement.fitBounds(this.state.nearbyGroup.getBounds())



  }

  tooglenearby = () => {
    if (this.state.nearbytoogle) {
      this.state.nearbyGroup.eachLayer(e => this.state.nearbyGroup.removeLayer(e))
      document.getElementById('mrk-lg').removeChild(document.getElementById('nearbylegend'))
      this.setState({ Allos: this.state.Openspaces })
      this.props.mapRefs.current.leafletElement.addLayer(this.state.OSmarkers)

      document.getElementsByClassName("openspace-button")[1].classList.remove("active");





    }
    else {
      this.nearbymeOS()
      document.getElementsByClassName("openspace-button")[1].classList.add("active");
      // console.log( document.getElementsByClassName("openspace-button"))
      // 

    }
    this.state.nearbytoogle = !this.state.nearbytoogle
    console.log(this.state.nearbytoogle)
  }


  displayOS = () => {
    this.state.OSmarkers.eachLayer((e) => this.state.OSmarkers.removeLayer(e))


    this.state.Allos.map(e => {
      console.log(e, 'data')
      if (e.centroid != null) {
        var map = this.props.mapRefs.current.leafletElement;
        // new L.circleMarker([e.latitude, e.longitude]).addTo(map)
        var icon = L.divIcon({
          className: 'OSmarkers',
          html: "<i class='OSmarker'></i>",
          // iconSize: [4, 4],
          // iconAnchor: [12, 6]
        });


        var htmlmrk = L.marker([e.centroid[1], e.centroid[0]], { icon: icon });

        var mrk = new L.circleMarker([e.centroid[1], e.centroid[0]], { radius: 6, fillColor: '#174BDD', fillOpacity: 1, weight: 15, opacity: 0.3, pane: 'Oslanding' })
        let address = e.address == null ? 'Nepal' : e.address
        var popup = "<h5>" + e.title + "</h5>" +
          "<h6>" + e.municipality + "</h6>"
         
        var pop = "<div class='bind-popup'> <div class='bind-header'><h5>" + e.title + "</h5> <p><i class='material-icons ' style='font-size:16px'>room</i>" + address + "<i class='material-icons pop-dir'>directions</i></p><a  class='openSpace_btn' href='/#/OpenSpaceDetails'>View Details</a></div></div>"

        htmlmrk.bindPopup(pop)
        htmlmrk.on('click', () => {
          var classes = document.getElementsByClassName('openSpace_btn')
          for (var i = 0; i < classes.length; i++) {
            classes[i].addEventListener('click', () => {
              this.props.dispatch({ type: "spaceClicked", id: e.id })
              this.props.history.push('/OpenSpaceDetails');

            })
          }
          let dir=document.getElementsByClassName('pop-dir')
          
          for(var i=0;i<dir.length; i++){
            dir[i].addEventListener('click',()=>{
             
              const newData = [
                this.state.Allos.find(item => item.id === e.id),
                ...this.state.Allos.filter(item => item.id != e.id),
              ]
              this.setState({Allos:newData})
              if(this.state.ActiveRouteindex==e.id){
                console.log(dir)
                dir[0].classList.remove('active')
                this.removeRoutes();
                this.setActivefalse(null)

            }
            else{
              console.log(i,dir)
                
                this.fetchroute([e.centroid[1], e.centroid[0]], this.props.currentLocation)
                this.setActivefalse(e.id)
                dir[0].classList.add('active')

                

            }


          })
          }
          
        })


        htmlmrk.addTo(this.state.OSmarkers)
      }

    });
    this.props.mapRefs.current.leafletElement.fitBounds(this.state.OSmarkers.getBounds())

  };

  removeRoutes = () => {
    this.state.Routes.eachLayer((e => this.state.Routes.removeLayer(e)))
    this.props.mapRefs.current.leafletElement.removeControl(this.state.legend)
  }

  fetchroute = (first, second) => {
    // L.tooltip().setLatLng(first).setContent('<h6></h6>').addTo(this.props.mapRefs.current.leafletElement)
    // map.closeTooltip();
    console.log(first,second)

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

console.log(url)
    Axios.get(url)
      .then(Response => {
        console.log(this.state.Routespaths)


        for (var j = 0; j < Response.data.paths.length; j++) {
          var path = []
          for (var i = 0; i < Response.data.paths[j].points.coordinates.length; i++) {

            path.push(Response.data.paths[j].points.coordinates[i].reverse())
          }
          // console.log(Response.data.paths[j].description)
          var polyline = L.polyline(path, { color: j == 0 ? '#174BDD' : 'grey' })
          this.state.Routespaths.push({ id: j, path: polyline, description: Response.data.paths[j].description == undefined ? "No Descrption" : Response.data.paths[j].description[0], distance: Response.data.paths[j].distance })

          this.state.Routes.addLayer(polyline)
          this.props.mapRefs.current.leafletElement.fitBounds(polyline.getBounds())

        }
        this.state.Routespaths[0].path.bringToFront()
        var activeroute = 0
        this.state.Routespaths.map((e) => {
          e.path.on('click', () => {
            this.state.Routespaths.map((i) => {
              i.path.setStyle({ color: 'grey' })
            })
            this.state.Routespaths[e.id].path.setStyle({ color: '#174BDD' })
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

          div.innerHTML += "<h6 id='legendtitle'>Routes</h6>"
          console.log(this.state.Routespaths)
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
          this.state.Routespaths=newData
          


          this.state.Routespaths.map((e) => {
            console.log('activeroute',e,this.state.Routespaths)

            var class1 = 'desccard';
            // var activeclass=class1
            var Shortest = min == e.distance ? "Shortest" : ""

            var descCard = `<div  class=${class1} name=` + e.id + ">" +
              "<h6>" + e.description + "<span>" + Shortest + "</span>" + "</h6>" +
              "<p><i class='material-icons'>near_me</i>" +
              "<span>" + e.distance + " m" + "</p" +
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


        this.state.legend.addTo(this.props.mapRefs.current.leafletElement)
        // console.log(this.state.Routespaths)
        let dom=document.getElementsByClassName('routeWrapper')
        L.DomEvent.on(dom[0], 'mousewheel', L.DomEvent.stopPropagation);

        var divss = document.getElementsByClassName('routeWrapper');






        var doc = document.getElementsByClassName('desccard')
        doc[0].classList.add('pathactive')

        for (var i = 0; i < doc.length; i++) {
          doc[i].addEventListener('click', (e) => {
            console.log(e.target.parentElement.getAttribute('name'));
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



  componentDidMount() {


    var nearby = this.props.mapRefs.current.leafletElement.createPane('nearby');
    var Oslanding = this.props.mapRefs.current.leafletElement.createPane('Oslanding');
    this.props.mapRefs.current.leafletElement.createPane("cluster").style.zIndex = 100;




    window.map = this.props.mapRefs.current.leafletElement;
    this.props.mapRefs.current.leafletElement.getPane('nearby').style.zIndex = 300;
    this.props.mapRefs.current.leafletElement.getPane('Oslanding').style.zIndex = 250;

    // var cluster = L.markerClusterGroup({ disableClusteringAtZoom: 14 })
    // this.setState({ OSmarkers: cluster })

    this.props.mapRefs.current.leafletElement.addLayer(this.state.district_muni);
    this.props.mapRefs.current.leafletElement.addLayer(this.state.Routes);
    setTimeout(() => this.props.mapRefs.current.leafletElement.addLayer(this.state.OSmarkers), 500)
    this.props.mapRefs.current.leafletElement.addLayer(this.state.nearbyGroup);


    this.fetchingForDropdown("province");
    this.fetchingForDropdown("district");
    this.fetchingForDropdown("municipality");
    console.log(sessionStorage.Openspaces,"session",JSON.parse(sessionStorage.getItem('stored')));
    if(JSON.parse(sessionStorage.getItem('stored'))!=true){
      
      this.fetchOS();

    }
    else{
     

      this.state.Openspaces=JSON.parse(sessionStorage.getItem('Openspaces'));
      this.state.Allos=JSON.parse(sessionStorage.getItem('Openspaces'));
      this.setState({loading: !this.state.loading})
      console.log(this.state.Allos,"al",JSON.parse(sessionStorage.getItem('Openspaces')),sessionStorage.getItem('stored'),sessionStorage)
     
      this.displayOS();
      
    }
    this.addlegend()
    this.onload();
    // this.nearbymeOS();

    // this.props.mapRefs.current.leafletElement1=this.props.mapRefs.current.leafletElement
  }
  notify = () => toast.info("NO Openspace Found", { containerId: 'A', autoClose: false, });


  render() {




    // var toggleClass = this.props.isClick ? 'rotated' : 'sidebar-toggle';
    const { showContent } = this.state;
    return (
      <>
        <div>

          <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.BOTTOM_RIGHT} />
        </div>
        <div className="map-sidebar">


          <div className="sidebar-wrapper">
            <div className="card">
              <div className="card-body">
                <div className="map-filter">
                  <div className="filter-option">
                    <Select
                      options={this.state.province}
                      placeholder="Province"
                      onChange={e => this.handleprovince(e)}
                      value={this.state.SelectedProvince}
                    />
                    <Select
                      options={this.state.district}
                      placeholder="District"
                      onChange={e => this.handledistrict(e)}
                      isDisabled={this.state.handlingindex < 1 ? true : false}
                      value={this.state.SelectedDistrict}
                    />
                    <Select
                      options={this.state.municipality}
                      placeholder="Municipality"
                      onChange={e => this.handlemunicipality(e)}
                      isDisabled={this.state.handlingindex < 2 ? true : false}
                      value={this.state.SelectedMunicipality}
                    />

                  </div>
                  <div className="reset-btns">

                    <div className="reset">
                      {/* <MaterialIcon icon="refresh"></MaterialIcon> */}
                      <span
                        onClick={() => {
                          this.setState({
                            SelectedProvince: null,
                            SelectedDistrict: null,
                            SelectedMunicipality: null,
                            district: null,
                            municipality: null,
                            handlingindex: 0,
                            Allos: this.state.Openspaces
                          },()=>this.displayOS())
                          var bounds = [[25.710836919640595, 79.79365377708339],
                          [30.798474179567847, 88.54975729270839]];
                          this.props.mapRefs.current.leafletElement.fitBounds(bounds)
                          this.state.Routes.eachLayer((e) => this.state.Routes.removeLayer(e))
                          


                          this.state.district_muni.eachLayer(e =>
                            this.state.district_muni.removeLayer(e)
                          );


                          this.props.mapRefs.current.leafletElement.removeControl(this.state.legend);
                          

                        }

                        }
                      >
                        clear all
                      </span>
                    </div>
                    <button onClick={() => this.onApply()} className="openspace-button">
                      Apply
                    </button>
                  </div>
                </div>

                <div onClick={this.tooglenearby} className="nearme-btn">
                  <a className="openspace-button">
                    <i
                      className="material-icons"
                      style={{ textDecoration: "none" }}
                    >
                      near_me
                    </i>
                    Nearby me
                  </a>
                </div>
                <div className="report-count">
                  <h5>
                    {/* Open spaces: <span> 83 </span> */}
                    Open spaces: <span> {this.state.Allos.length} </span>
                  </h5>
                </div>
                <div className="space-list" >
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="humanitarian-icon-Search"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      aria-label=""
                      placeholder="Search Open Space"
                      onInput={e =>
                        this.setState({ search_keyword: e.target.value })
                      }
                      onFocus={() => this.setState({ focused: true })}
                      onKeyDown={e => {
                        if (e.key == "Enter") this.searchOs();
                      }}

                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        {this.state.focused && (
                          <i
                            className="material-icons"
                            onClick={() => this.searchOs()}
                          >
                            keyboard_backspace
                          </i>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="loader" style={{ textAlign: "center" }}>
                    {this.state.loading && <LoaderBig />}
                  </div>


                  <ul>


                    {this.state.Allos &&
                      this.state.Allos.map((e, i) => {
                        // console.log(this.props.currentLocation,"cur",[e.latitude, e.longitude]);



                        return (
                          <OpenSpaceCard
                            currentLocation={this.props.currentLocation}
                            latlng={[e.centroid[1], e.centroid[0]]}
                            routing={this.fetchroute}
                            key={e.id}
                            name={e.title}
                            address={e.address}
                            image={e.image}
                            id={e.id}
                            removeRoutes={this.removeRoutes}
                            setActivefalse={this.setActivefalse}
                            ActiveRoute={this.state.ActiveRouteindex}
                            index={e.id}
                          />
                        );
                      })}


                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
    id: state.id
  }
}

export default withRouter(connect(mapStateToProps)(Sidebar));