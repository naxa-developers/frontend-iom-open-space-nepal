import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Tent from '../../../img/tento.png'
import LoaderSmall from '../../Report/LoadingSpinner';

class DetailsHeader extends Component {
  render() {
    
    return (
      <div className="space-details">
        <div className="space">
          <div className="space-content">
            <h5>{this.props.title ? this.props.title: <LoaderSmall /> }</h5>
            <p>
              <span>
                <i className="material-icons">room</i>
                {this.props.address}
              </span>
              <span>
                <MaterialIcon icon="near_me"></MaterialIcon>200 m
              </span>
            </p>
          </div>
          <div className="space-direction">
            <i className="material-icons">directions</i>
          </div>
        </div>
        <figure>
          <img src={this.props.image?this.props.image:Tent} alt="open space " />
        </figure>
      </div>
    );
  }
}
export default DetailsHeader;
