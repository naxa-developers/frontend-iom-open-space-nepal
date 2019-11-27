import React, { Component } from 'react'

 class QuestionOne extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             questions:this.props
        }
    }
    
    render() {
        return (
            <>
                 <span>{this.state.questions_data}</span>  
                 <i class="material-icons check">check_circle</i> 
            </>
        )
    }
}
export default QuestionOne;
