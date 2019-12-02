import React, { Component } from 'react';


import './OpenSpaceCSS.css'
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import LoadingSpinner from '../Report/LoadingSpinner';

class OpenSpaceCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            calculatedistance:true,
            shortest:null
            
        }
    }

    getshortestdistance=(first,second)=>{
        // console.log(first,second,this.props.currentLocation);
        var baseUrl = "https://route.naxa.com.np/route";
        var distances=[]
        // console.log(first,second)
        var url =
          `${baseUrl}?point= ${first[0]},${first[1]},` +
          `&point=${second[0]},${second[1]}` +
          "&points_encoded=false" +
          "&ch.disable=true" +
          "&alternative_route.max_paths=4" +
          "&algorithm=alternative_route";
          Axios.get(url)
          .then(Response => {
            //   console.log(Response.data.paths)
              for(var i=0; i<Response.data.paths.length;i++ ){
                //   console.log(Response.data.paths[i])
                  distances.push(Response.data.paths[i].distance)
              }
              let shortest=Math.min(...distances)
              this.setState({shortest:(shortest/1000).toFixed(2),calculatedistance:false})
          }
            )
    }
   
    componentDidMount() {
        
        this.props.currentLocation!=null&&this.getshortestdistance(this.props.latlng, this.props.currentLocation)
     

    }
    render() {
        var image="https://api.adorable.io/avatars/226/abott@adorable.png"
        // console.log(this.props.image)

        return (
            <>
                <li>
                    <div className="space">
                        <figure>
                            <img
                                // src={this.props.image!=null?`https://iomapi.naxa.com.np${this.props.image}`:image}
                                src='../../src/img/tento.png'
                                // src={image}
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
                                {!this.state.calculatedistance?<span>
                                    <i className="material-icons">near_me</i>{this.state.shortest}  km
                                </span>:<span>
                                    {/* <i className="material-icons">near_me</i>200 m */}
                                    <LoadingSpinner/>
                                </span>}
                                
                            </p>
                        </div>
                    </div>
                    <div className="space-direction active" onClick={() => {
                        
                        this.props.routing(this.props.latlng, this.props.currentLocation)
                        

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