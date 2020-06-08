import React, { Component } from 'react';


import './OpenSpaceCSS.css'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import LoadingSpinner from '../Report/LoadingSpinner';
import tent from '../../img/tento.png'

class OpenSpaceCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            calculatedistance: true,
            shortest: null,
            distancecall: true,


        }
    }

    getshortestdistance = (first, second) => {
        this.setState({ calculatedistance: false })


        var baseUrl = "http://35.188.73.141:8989/route";
        var distances = []


        var url =
            `${baseUrl}?point= ${first[0]},${first[1]},` +
            `&point=${second != null ? second[0] : ''},${second != null ? second[1] : ''}` +
            "&points_encoded=false" +
            "&ch.disable=true" +
            "&alternative_route.max_paths=4" +
            "&algorithm=alternative_route";

        second != null && Axios.get(url)
            .then(Response => {
                //   console.log(Response.data.paths)
                for (var i = 0; i < Response.data.paths.length; i++)
                {
                    //   console.log(Response.data.paths[i])
                    distances.push(Response.data.paths[i].distance)
                }
                let shortest = Math.min(...distances)
                this.setState({ shortest: (shortest / 1000).toFixed(2) })

                // console.log(sessionStorage.getItem('Distances'), "ASDADWGYVj")










                this.props.distances.push({ id: this.props.id, sdist: shortest })
                sessionStorage.setItem('Distances', JSON.stringify(this.props.distances))









                //   console.log(this.props.distances,"D")

            }
            )
    }

    componentDidMount() {


        // this.props.currentLocation!=null&&this.getshortestdistance(this.props.latlng, this.props.currentLocation)

        // this.state.calculatedistance==true&&this.props.currentLocation!=null&&this.getshortestdistance(this.props.latlng, this.props.currentLocation)
        // this.getshortestdistance(this.props.latlng, this.props.currentLocation)
    }
    componentWillUpdate() {
        // this.state.calculatedistance==true&&this.props.currentLocation!=null
        // debugger
        // Console.log(JSON.parse(sessionStorage.getItem('Distances').length != this.props.Arraylength),JSON.parse(sessionStorage.getItem('Distances')).length,this.props.Arraylength )
        // if (JSON.parse(sessionStorage.getItem('Distances').length != this.props.Arraylength)) {
        //     // debugger
        //     if (this.state.calculatedistance == true && this.props.currentLocation != null) {
        //         this.getshortestdistance(this.props.latlng, this.props.currentLocation)

        //     }

        // }
        // else {
        //     var sessto = JSON.parse(sessionStorage.getItem('Distances'))


        //     var dis = sessto.filter((w) => {
        //         w.id == this.props.id
        //     })
        //     if (dis.length != 0) {
        //         this.setState({ shortest: dis[0].sdist })
        //     }

        // }



        // if (sessionStorage.getItem('stored')) {
        //     if (this.state.calculatedistance == true && this.props.currentLocation != null) {
        //         this.getshortestdistance(this.props.latlng, this.props.currentLocation)

        //     }
        // }
        // else {
        //     if (JSON.parse(sessionStorage.getItem('Distances').length != this.props.Arraylength)) {
        //         this.getshortestdistance(this.props.latlng, this.props.currentLocation)
        //     }
        //     else {
        //         var sessto = JSON.parse(sessionStorage.getItem('Distances'))


        //         var dis = sessto.filter((w) => {
        //             w.id == this.props.id
        //         })
        //         if (dis.length != 0) {
        //             this.setState({ shortest: dis[0].sdist })
        //         }
        //     }









        // }
    }

    setdistance = () => {
        var dis = JSON.parse(sessionStorage.getItem('Distances')).filter(w => w.id == this.props.id)
        // debugger


        dis.length == 0 ? this.getshortestdistance(this.props.latlng, this.props.currentLocation) : this.setState({ shortest: (dis[0].sdist / 1000).toFixed(2), calculatedistance: false })
        this.state.distancecall = false
    }

    render() {
        this.props.currcalculated && this.state.distancecall && this.setdistance();





        // var image="https://api.adorable.io/avatars/226/abott@adorable.png"
        // console.log(this.props.image)
        // console.log("card",this.props);

        return (
            <>
                <li>
                    <div className="space">
                        <figure>
                            <img
                                src={this.props.thumbnail != null ? `https://iomapi.naxa.com.np${this.props.thumbnail}` : tent}
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
                                    <i className="material-icons">room</i><p>{this.props.address}</p>
                                </span>
                                {!this.state.calculatedistance ? <span>
                                    <i className="material-icons">near_me</i>{this.state.shortest}  ...km
                                </span> : <span>
                                        {/* <i className="material-icons">near_me</i>200 m */}
                                        <LoadingSpinner />
                                    </span>}

                            </p>
                        </div>
                    </div>
                    <div className={this.props.ActiveRoute == this.props.index ? "space-direction active" : "space-direction"} onClick={() => {
                        // console.log(this.props.ActiveRoute==this.props.index,this.props.ActiveRoute,this.props.index)
                        if (this.props.ActiveRoute == this.props.index)
                        {
                            this.props.removeRoutes();
                            this.props.setActivefalse(null)

                        }
                        else
                        {

                            this.props.routing(this.props.latlng, this.props.currentLocation)
                            this.props.setActivefalse(this.props.index)


                        }



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
        ...state,
        currcalculated: state.currentloccalculated
    }
}

export default withRouter(connect(mapStateToProps, null, null, { forwardRef: true })(OpenSpaceCard));