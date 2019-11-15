import React, { Component } from 'react'
import MaterialIcon from 'material-icons-react';
import Axios from 'axios';
import ReportCard from './ReportCard';
import ReportFilter from './ReportFilter';

class ReportSidebar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             reports: [],
             reportsToShow: [],
             keywords: '',
             filteredReports: [],

             isFocused: false        }
    }
    

    onload = () => {
        var windowHeight = window.innerHeight;
        
        var navHeight = document.getElementsByClassName('site-header')[0].clientHeight;
        
        document.getElementsByClassName('sidebar-wrapper')[0].style.height= `${windowHeight-navHeight}px`
       
    
     }
     fetchReports= () => {
         Axios.get("http://139.59.67.104:8011/api/v1/report/")
         .then(response => {
            
             this.setState({reports: response.data, reportsToShow: response.data})
            
             
             
         })
     }
     setKeywords = (e) => {
         this.setState({keywords: e})
        //  console.log(this.state.keywords);
         
         
     }
     searchNow = () => {
        
         
         
         let filteredReports = this.state.reports.filter((report) =>  report.title.toLowerCase().includes(this.state.keywords.toLowerCase()) )
       console.log(filteredReports);
       
          this.setState({reportsToShow:filteredReports})
   



     }
     componentDidMount() {
         this.onload();
         this.fetchReports();
     }
    render() {
        return (
            <div>
                
                      <div className="map-sidebar">
                        <span className="sidebar-toggle">
                        <MaterialIcon icon="keyboard_arrow_right" />
                        </span>
                        
                        <div className="sidebar-wrapper">
                            <div className="card">
                                <div className="card-body">
                                   <ReportFilter />
                                    <div className="report-count">
        <h5>Reports: <span>{this.state.reports.length}</span></h5>
                                    </div>
                                    <div className="report-list">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">  <MaterialIcon icon="search" /></span>
                                            </div>
                                            <input type="text" className="form-control" aria-label="" placeholder="Search reports" 
                                            onInput ={(e) => this.setKeywords(e.target.value)}
                                            onFocus = {() => this.setState({isFocused: true})}
                                            onBlur = {() => {
                                                setTimeout(()=>this.setState({isFocused: false}),100)
                                                
                                            }}
                                            onKeyDown = {(e) => {
                                                if(e.key ==='Enter') {
                                                  this.searchNow() 
                                                  // this.setState({focused: false})
                                                }
                                              } } 
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    {this.state.isFocused &&<i
                                                        className="material-icons" onClick={() =>this.searchNow()}>keyboard_backspace</i> }
                                                   </span>
                                            </div>
                                        </div>

                                        <ul>
                                            {this.state.reports&&this.state.reportsToShow.map( (e) => {
                                               return   <ReportCard id = {e.id} title = {e.title} location = {e.name} urgency= {e.urgency} date = {e.date} ReportLocation={e.location} />
                                                
                                               
                                            }) 

                                        }
                                               
                                        </ul>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
        )
    }
}
export default ReportSidebar;
