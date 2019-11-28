import React, { Component } from 'react'

 class QuestionOne extends Component {
    
    
    render() {
      var yes = "check_circle"
      var no = "cancel"

        
        return (
            <li>
                 <span>{this.props.question}</span>  
        <i class="material-icons check">{this.props.ans=="Yes" ? no :yes  }</i> 
                 </li>
        )
    }
}
export default QuestionOne;
