import React, { Component } from 'react'
import QuestionOne from './QuestionOne'

export default class Question extends Component {
  
    render() {
     
        
        
        return (
            <li>
         return <QuestionOne questions={this.props} />
                 {/* {this.state.questions&&this.state.questions.question_data.map((que) => {
                     return (
                     <>
                     <span>{this.props.que.que}</span>  
                     <i class="material-icons check">check_circle</i> 
               
                    </>      
                     )
                 } )} */}
            </li>
        )
    }
}
