import React, { Component } from 'react'
import MaterialIcon from 'material-icons-react';
import Axios from 'axios';
import ReportCard from './ReportCard';

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
                
                      <div class="map-sidebar">
                        <span class="sidebar-toggle">
                        <MaterialIcon icon="keyboard_arrow_right" />
                        </span>
                        
                        <div class="sidebar-wrapper">
                            <div class="card">
                                <div class="card-body">
                                    <div class="map-filter">
                                        <div class="filter-option">
                                            <select class="selectpicker">
                                                <option>Last 7 days</option>
                                            </select>
                                            <select class="selectpicker">
                                                <option>status</option>
                                            </select>
                                            <select class="selectpicker">
                                                <option>Urgency</option>
                                            </select>
                                        </div>
                                        <div class="reset-btns">
                                            <div class="reset">
                                            <MaterialIcon icon="refresh" />
                                                
                                                <span>clear all</span>
                                            </div>
                                            <a href="#" class="openspace-button">Apply</a>
                                        </div>
                                    </div>
                                    <div class="report-count">
        <h5>Reports: <span>{this.state.reports.length}</span></h5>
                                    </div>
                                    <div class="report-list">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">  <MaterialIcon icon="search" /></span>
                                            </div>
                                            <input type="text" class="form-control" aria-label="" placeholder="Search reports" 
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
                                            <div class="input-group-append">
                                                <span class="input-group-text">
                                                    {this.state.isFocused &&<i
                                                        class="material-icons" onClick={() =>this.searchNow()}>keyboard_backspace</i> }
                                                   </span>
                                            </div>
                                        </div>

                                        <ul>
                                            {this.state.reports&&this.state.reportsToShow.map( (e) => {
                                               return   <ReportCard title = {e.title} location = {e.name} urgency= {e.urgency} date = {e.date} ReportLocation={e.location} />
                                                
                                               
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
