import React, { Component } from 'react'

 class SingleSecurity extends Component {
    render() {
      console.log("single", this.props.name);
      
        return (
            <li>
            <div class="space">
              
              <div class="space-content">
                <h5>{this.props.name}</h5>
                <p>
                  <span>
                    <i class="material-icons">phone</i>00-0000000
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
        )
    }
}
export default SingleSecurity;
