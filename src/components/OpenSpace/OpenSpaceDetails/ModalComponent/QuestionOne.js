import React, { Component } from 'react'

 class QuestionOne extends Component {
    
    
    render() {
      var yes = "check_circle"
      var no = "cancel"

        
        return (
            <li>
                 <span>{this.props.question}</span>  
        <i class={this.props.ans=="Yes" ? "material-icons check": "material-icons cross"}>{this.props.ans=="Yes" ? yes :no  }</i> 
                 </li>
        )
    }
}
export default QuestionOne;
