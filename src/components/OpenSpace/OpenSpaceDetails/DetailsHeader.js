import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Tent from '../../../img/tento.png'
import LoaderSmall from '../../Report/LoadingSpinner';

class DetailsHeader extends Component {


  constructor(props) {
    super(props)

    this.state = {
      isActive: false
    }
  }



  render() {
   
    
    return (
      <div className="space-details">
        <div className="space">
          <div className="space-content">
            <h5>{this.props.title ? this.props.title : <LoaderSmall />}</h5>
            <p>
              <span>
                <i className="material-icons">room</i>
                {this.props.address}
              </span>
              <span>
                <MaterialIcon icon="near_me"></MaterialIcon>{this.props.shortest && this.props.shortest + " km"}
              </span>
            </p>
          </div>
          <div className={this.props.isActive ? "space-direction active" : "space-direction"} onClick={() => {
            if (this.props.isActive) {
              this.props.removeRoute()

            }
            else{
              this.props.Routing()
            }
            this.props.toogleactivetoute()
           
          }
          }>
            <i className="material-icons">directions</i>
          </div>
        </div>
        {/* style={{ height: 300, width:300,backgroundImage: `url('${Tent}')`}} */}
        <figure 
        style={{justifyContent:'center',alignItems:'center'}}
            >
          <img style={{objectFit:'cover',width:'100%',height:150,textAlign:'center'}} src={this.props.image?this.props.image:Tent} alt="open space " />
        </figure>
      </div>
    );
  }
}
export default DetailsHeader;
