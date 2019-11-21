import React, { Component } from 'react';


import './OpenSpaceCSS.css'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';

class OpenSpaceCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentLocation: null
        }
    }


    currentLocation =  () => {
     
        let latlng

        if(window.chrome){
            console.log("chrome")

            Axios.get('http://ip-api.com/json')
            .then(Response=>{
                latlng = new L.LatLng(Response.data.lat, Response.data.lon);
                this.setState({ currentLocation: [Response.data.lat, Response.data.lon] })
                L.circleMarker(this.state.currentLocation, { color: 'red', radius: 5 }).addTo(window.map);


            })
            


        }
      
else{
    console.log("not chrome")
        navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition((location) => {
            latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
            this.setState({ currentLocation: [location.coords.latitude, location.coords.longitude] })
            L.circleMarker(latlng, { color: 'red', radius: 5 }).addTo(window.map);
            // console.log("current", this.state.currentLocation)
        })
    }
    }
    componentDidMount() {
        this.currentLocation()

    }
    render() {

        return (
            <>
                <li>
                    <div className="space">
                        <figure>
                            <img
                                src={`http://139.59.67.104:8011${this.props.image}`}
                                alt="space"
                            />
                        </figure>
                        <div className="space-content" onClick={() => {
                            this.props.dispatch({ type: "spaceClicked", id: this.props.id })
                            this.props.history.push('/OpenSpaceDetails');

                        }
                        }>
                            <h5  >{this.props.name}</h5>
                            <p>
                                <span>
                                    <i className="material-icons">room</i>{this.props.address}
                                </span>
                                {/* <span>
                                    <i className="material-icons">near_me</i>200 m
                          </span> */}
                            </p>
                        </div>
                    </div>
                    <div className="space-direction" onClick={() => {
                        this.props.routing(this.props.latlng, this.state.currentLocation)
                        console.log("consoled");

                    }}>
                        <i className="material-icons">directions</i>
                    </div>
                </li>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export default withRouter(connect(mapStateToProps)(OpenSpaceCard));