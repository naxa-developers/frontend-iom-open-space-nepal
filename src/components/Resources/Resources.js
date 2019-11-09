import React, { Component } from "react";


import Navbar from "../Home/Navbar";
import SearchFilter from "./SearchFilter";
import MainContent from "./MainContent";
import RightSidebar from "./RightSidebar";
import Resourcecard from "./Resourcecard";
// import TestDownload from './TestDownload';

import Axios from 'axios'

var fileDownload = require('js-file-download');




class Resources extends Component {


    constructor(props) {
      super(props)
    
      this.state = {
          loaded:false,
          resources:[],
          slicedResources:[],
          resouceindex:0
         
      };
       this.first=0
       this.second=3
    };

    slicing=()=>{
        var length=this.state.resources.length;
      
        console.log(this.second<length,this.state.resources)
        var array=this.state.resources.slice(this.first,this.second<length?this.second:length)
        this.state.slicedResources.push(array)
        console.log(this.state.slicedResources,"SLICED",array);
        
        this.first=this.first+3
        this.second=this.second+3
        if(this.second<length){
            this.slicing()
        }




    }

fileDownload =() => {
    console.log("clicked");
    
Axios("http://139.59.67.104:8011/api/v1/resource/",
        { 
            method: "POST",
            headers: { "Content-Type": "application/json",'Authorization': 'Bearer ' + window.localStorage["Access_Token"]}
           
        }).then(response => response.blob()).then(data => 
            console.log("success!"),
            fileDownload(this.state.resources[1].image, 'download_1.png'),
            
        )
       
        }


    componentDidMount(){
        Axios.get('http://139.59.67.104:8011/api/v1/resource/')
        .then(response=>{
            this.setState({resources:response.data})

            this.slicing()
            this.setState({loaded:true})

        })

    }
    


    render() {

        return (
            <div>
                <Navbar />
                <div className="page-wrap">
                    {/* <!-- main-content --> */}
                    <main className="main-content">
                        <div className="container">
                            <div className="row-wrap mt-150">
                                <div className="row">
                                    {/* <!-- form-section --> */}
                                    <div className="col-12 col-md-3 col-xl-4">
                                        <SearchFilter />
                                        {/* <TestDownload /> */}
                        
                                    </div>

                                    {/* <!--  content-section --> */}
                                    <div className="col-12 col-md-9 col-xl-8">
                                        <div className="content-section">
                                            
                                            {this.state.loaded&&this.state.slicedResources[this.state.resouceindex].map((e)=><Resourcecard title={e.title} description={e.description} date={e.date} categories={e.categories} document_type={e.document_type} />)}
                                           
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                    </main>

                    {/* <!-- pagination --> */}
                    <div className="pagination">
                        <div className="container">
                            <div className="pagination-link-wrap">
                                <div className="pagination-center">
                                    <a >&laquo;</a>
                                    <a  className={this.state.resouceindex==0?"active":""} onClick={()=>this.setState({resouceindex:0})}>1</a>
                                    <a className={this.state.resouceindex==1?"active":""} onClick={()=>this.setState({resouceindex:1})}>2</a>
                                    <a >&raquo;</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


        );
    }
}
export default Resources;
