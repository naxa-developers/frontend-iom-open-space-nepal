import React, { Component } from "react";



class Service extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //      amenities: [
  //       'Trees & Vegetation',
  //       'Electricity Line',
  //       'Boundary Wall',
  //       'Wi-Fi',
  //      ' WASH Facilities'



  //     ]
  //   }
  // }

  render() {



    var yes = "check_circle";
    var no = "cancel";
    let avaibility = this.props.isAvailable;
    // var str = this.props.desc;
    // var str1 = 'yes it is '
    // var regex = RegExp('yes')
    // var result = /y(?:es)?|1/i.test(str);
    let r = this.props.name.split(' ').join('')


    return (
      <>
        {


          r !== "Trees&Vegetation" &&


          <li>
            <img src={this.props.icon} style={{ maxWidth: 22, marginRight: '.5rem' }} />
            {/* {  this.state.amenities.map((a) =>  a  )} */}

            {this.props.name + " "}
            <i class={avaibility.trim()=='YES' ? "material-icons check" : "material-icons cross"}>
              {avaibility==='YES' ? yes : no}
            </i>
          </li>
        }

      </>
    );
  }
}
export default Service;
