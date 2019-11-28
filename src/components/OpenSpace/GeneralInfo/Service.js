import React, { Component } from 'react'

 class Service extends Component {



    render() {


        var yes = "check_circle"
        var no = "cancel"

        var str = this.props.desc;
        // var str1 = 'yes it is '
        // var regex = RegExp('yes')
        var result = /y(?:es)?|1/i.test(str);




        return (
            <li>{this.props.name+ ' ' }  
         <i class="material-icons check">{result? yes :no  }</i> 
            </li>

        )
    }
}
export default Service;
