import React, { Component } from 'react'
import fh from '../../../../img/hospital.png';

 class SingleHealthCard extends Component {
 
     
    render() {


        return (
            <>
        <li>
        <div class="space">
        
          <div class="space-content">
            <h5>{this.props.name}</h5>
            <p>
              <span>
                <i class="material-icons">phone</i>01-4250931
            </span>
              <span>
                <i class="material-icons">near_me</i> </span>
              <div className="space-direction">
                <i className="material-icons">directions</i>
              </div>
            </p>

          </div>
        </div>
      </li>
        </>
        )
    }
}
export default SingleHealthCard;
