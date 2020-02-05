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
        Axios.get(`https://iomapi.naxa.com.np/api/v1/report/?id=${localStorage.getItem("id")}&fbclid=IwAR2--o41VqMZ-5H9HhqgZegN8YXbtI9oHTCmhofE4vWB_BNQSDtkRGD_I-U`)
        .then(response => {
         
          
            

            
            this.setState({Reports: response.data})

        })
    }
    componentDidMount() {
        this.getReports();
    }



    render() {
       
    localStorage.setItem("id", this.props.id)
     
        
        return (
            <div className="report-list">
           

            <ul>
               
                  
           
                 { 
                 this.state.Reports!=null&& this.state.Reports.length == 0 ? 
<h6>Users have not reported any issues related to this open space.</h6>  :

                    this.state.Reports.map(e => {   return  <li><SingleReport reportid={e.id} title={e.title} days = {e.count} name ={e.name}/> </li>  }) 
                    
                 
                }




        
          
            </ul>

        </div>
        )
    }
}
export default ReportTab;
