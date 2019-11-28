import React, { Component } from 'react'
import QuestionOne from './QuestionOne'

export default class Question extends Component {
  
    render() {
     
     console.log(this.props.question_data);
     
        
        
        return (
          
        <>
               {this.props.question_data&&this.props.question_data.map((que) => {
                  
                   
                    return <QuestionOne question={que.que} ans = {que.ans}/>
               
                      
               
                 } )} 
         </>   
        )
    }
}
