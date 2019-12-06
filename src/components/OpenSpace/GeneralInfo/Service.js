import React, { Component } from "react";

class Service extends Component {
  render() {
    console.log(this.props.icon);

    var yes = "check_circle";
    var no = "cancel";

    var str = this.props.desc;
    // var str1 = 'yes it is '
    // var regex = RegExp('yes')
    var result = /y(?:es)?|1/i.test(str);

    return (
      <li>
        <img src={this.props.icon} style={{maxWidth:22, marginRight:'.5rem'}} /> 
        {this.props.name + " "}
        <i class={result ? "material-icons check" : "material-icons cross"}>
          {result ? yes : no}
        </i>
      </li>
    );
  }
}
export default Service;
