import React, { Component } from 'react'
import Axios from 'axios'
import SingleReport from './SingleReport'


 class ReportTab extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              Reports: ''
         }
     }
     


    getReports = () => {
        Axios.get(`https://iomapi.naxa.com.np/api/v1/report/?id=${this.props.id}&fbclid=IwAR2--o41VqMZ-5H9HhqgZegN8YXbtI9oHTCmhofE4vWB_BNQSDtkRGD_I-U`)
        .then(response => {
         
            
            this.setState({Reports: response.data})

        })
    }
    componentDidMount() {
        this.getReports();
    }



    render() {
       
        
        return (
            <div className="report-list">
           

            <ul>
               
                  
           
                 {   this.state.Reports&&this.state.Reports.map(e => {
                 return  <li><SingleReport id={this.props.id} title={e.title}/> </li>
                 })
                 
                }
          
            </ul>

        </div>
        )
    }
}
export default ReportTab;
