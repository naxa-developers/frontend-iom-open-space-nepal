import React, { Component } from "react";
import fa from '../../../../img/school.png';
import Axios from 'axios'



export default class SingleEcard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      calculatedistance: true,
      shortest: null,
      isActive: false,
      Routespaths: [],
      Routes: L.featureGroup(),
      
    }
  }



  

  getshortestdistance = (first, second) => {
    // console.log(first,second,this.props.currentLocation);
    var baseUrl = "https://route.naxa.com.np/route";
    var distances = []
    // console.log(first,seond)
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
        for (var i = 0; i < Response.data.paths.length; i++) {
          //   console.log(Response.data.paths[i])
          distances.push(Response.data.paths[i].distance)
        }
        let shortest = Math.min(...distances)
        this.setState({ shortest: (shortest / 1000).toFixed(2), calculatedistance: false })
      }
      )
  }


  componentDidMount() {

    setTimeout(() => {this.getshortestdistance(this.props.OSlatlng, this.props.latlng)
     

    
    }, 1000)

  }

  render() {
    console.log(this.props.reff,this.props.remove,'asassaasdccax')
    return (
      <li>
        <div class="space">
          <figure>
            {/* <img src={fa} alt="space" /> */}
          </figure>
          <div class="space-content">
            <h5>{this.props.name}</h5>
            <p>
              <span>
                <i class="material-icons">phone</i>01-4250931
            </span>
              <span>
                <i class="material-icons">near_me</i>{this.state.calculatedistance ? '' : this.state.shortest + " km"}  </span>
              <div className={this.props.ActiveRoute==this.props.index?"space-direction active":"space-direction"}onClick={() => {
                if (this.props.ActiveRoute==this.props.index) {
                 
                  this.props.remove()
                  this.props.setActivefalse(null)
                  
                }
                else {
                  this.props.fetchroute(this.props.OSlatlng, this.props.latlng)
                  this.props.setActivefalse(this.props.index)
                }
                let sta = this.state.isActive ? false : true

                this.setState({ isActive: sta })
              }
              }>
                <i className="material-icons">directions</i>
              </div>
            </p>

          </div>
        </div>
      </li>
    );
  }
}
