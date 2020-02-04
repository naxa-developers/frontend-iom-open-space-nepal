import React, { Component } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import HospitalCard from "./HospitalCard";
import FireCard from './FireCard';
import SecurityCard from "./SecurityCard";
import EducationCard from './EducationCard';
import Axios from 'axios'
import HelipadCard from "./HelipadCard";
import PerfectScrollbarPS from 'perfect-scrollbar';
      

class NearbyTab extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      legend: L.control({ position: 'bottomleft' }),
      Routespaths: [],
      Routes: L.featureGroup(),
    }
  }
  componentDidMount(){
    this.state.Routes.addTo(this.props.reff.current.leafletElement)
  }
  remove=()=>{
    this.props.reff.current.leafletElement.removeControl(this.state.legend)
    this.state.Routes.eachLayer(e=>this.state.Routes.removeLayer(e))
  }

  fetchroute = (first, second) => {
    // console.log("fs",first, second);
    
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
          this.state.Routespaths.push({ id: j, path: polyline, description: Response.data.paths[j].description == undefined ? "No Descrption" : Response.data.paths[j].description[0], distance: Response.data.paths[j].distance })
  
          this.state.Routes.addLayer(polyline)
          this.props.reff.current.leafletElement.fitBounds(polyline.getBounds())
  
        }
        this.state.Routespaths[0].path.bringToFront()
        var activeroute = 0
        this.state.Routespaths.map((e)=>{
          e.path.on('click',()=>{
            this.state.Routespaths.map((i)=>{
              i.path.setStyle({color:'grey'})
            })
            this.state.Routespaths[e.id].path.setStyle({color:'blue'})
            this.state.Routespaths[e.id].path.bringToFront();
            var doac = document.getElementsByClassName('desccard')
            // console.log(doac,doc.length)
            // doac.map((a)=>{
            //   console.log(a)
            // })
            for(var i=0;i<doac.length;i++){
              // console.log(doac[i],doac[i].getAttribute('name'))
              // var selectindex=doac[i].getAttribute('name')
              // var filtered=this.state.Routespaths.filter((d)=>d.id==selectindex)
              doac[i].classList.contains('pathactive')&&doac[i].classList.remove('pathactive')
              console.log(doac[i].getAttribute('name')==e.id)
              doac[i].getAttribute('name')==e.id&&doac[i].classList.add('pathactive')
              
  
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
          var distances=[]
          this.state.Routespaths.forEach((a)=>{
            distances.push(a.distance)
  
          })
          var min=Math.min(...distances)
          // this.state.Routespaths.filter((e)=>{
          //   return e.distance==min
          // })
          const newData = [
            this.state.Routespaths.find(item => item.distance === min),
            ...this.state.Routespaths.filter(item => item.distance != min),
          ]
          this.state.Routespaths=newData
          
  
  
          this.state.Routespaths.map(e => {
            // console.log(activeroute)
  
            var class1 = 'desccard';
            // var activeclass=class1
            var Shortest= min==e.distance?"Shortest":""
  
            var descCard = `<div  class=${class1} name=` + e.id + ">" +
              "<h6>" + e.description + "<span>" + Shortest+ "</span>"+"</h6>" +
              "<p><i class='material-icons'>near_me</i>"+
              "<span>" + e.distance + " m" +"</p>"
            "<div>";
  
  
  
            div.innerHTML += descCard
            activeroute++
  
          })
          // innterhtml
          setTimeout(()=>{
            const ps = new PerfectScrollbarPS('.routeWrapper', {
              wheelSpeed: 2,
              wheelPropagation: true,
              minScrollbarLength: 20
            });
  
          },2000)
  
  
  
  
          return div;
        }
  
  
  
  
        // if(divss!=0){
        //   for(var i=0;i<divss.length;i++){
  
  
        //     divss[i].innerHTML='<h1>a</h1>'
  
  
  
        //   }
        // }
  
  
        this.state.legend.addTo(this.props.reff.current.leafletElement)
        let dom=document.getElementsByClassName('routeWrapper')
        L.DomEvent.on(dom[0], 'mousewheel', L.DomEvent.stopPropagation);
        // console.log(this.state.Routespaths)
  
        
        // var divss = document.getElementById('close-routeN');
        //      divss.addEventListener("click",()=>{
        //       this.remove()
              
               
     
        //      })
  
  
  
  
  
  
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
  

  render() {
 
    
    return (
      <Accordion className="map-accordion" id="accordion">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <i className="humanitarian-icon-Medical-supply"> </i> Health Facilities
             
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <HospitalCard
               reff={this.props.reff}
              OSlatlng={this.props.OSlatlng}
              id= {this.props.id}
              legend={this.state.legend}

              reff={this.props.reff}
              fetchroute={this.fetchroute}
              remove={this.remove}

              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
            <i className="humanitarian-icon-Fire"></i>
              Fire Brigade
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>

              <FireCard
               reff={this.props.reff}
              OSlatlng={this.props.OSlatlng}
              legend={this.state.legend}


              id= {this.props.id}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
            <i className="humanitarian-icon-Helipad"></i>
              Helipad(Airport)
            </Accordion.Toggle>
            
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <HelipadCard 
              legend={this.state.legend}
              reff={this.props.reff}

              id= {this.props.id}
              OSlatlng={this.props.OSlatlng}
              reff={this.props.reff}
              fetchroute={this.fetchroute}
              remove={this.remove}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="3">
            <i className="humanitarian-icon-National-army"></i>
              Security Forces
            </Accordion.Toggle>
            
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <SecurityCard
               reff={this.props.reff}
              legend={this.state.legend}

              id= {this.props.id}
              OSlatlng={this.props.OSlatlng}
              reff={this.props.reff}
              fetchroute={this.fetchroute}
              remove={this.remove}

              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="4">
              <i className="humanitarian-icon-Education"></i>
              Educational Facilities
            </Accordion.Toggle>
            
          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>
              <EducationCard
               reff={this.props.reff}
              legend={this.state.legend}

              id= {this.props.id}
              OSlatlng={this.props.OSlatlng}
              reff={this.props.reff}
              fetchroute={this.fetchroute}
              remove={this.remove}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

     
    );
  }
}
export default NearbyTab;
