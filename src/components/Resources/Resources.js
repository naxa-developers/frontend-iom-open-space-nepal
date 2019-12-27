import React, { Component } from "react";

import Navbar from "../Home/Navbar";
import SearchFilter from "./SearchFilter";
import Resourcecard from "./Resourcecard";
import LoadingSpinnerBig from '../Report/LoadingSpinnerBig';

import Axios from "axios";

class Resources extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      resources: [],
      slicedResources: [],
      resouceindex: 0,
      keywords: ""
    };
    this.first = 0;
    this.second = 3;
  }

  chunkArray = (myArray, chunk_size) => {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      var myChunk = myArray.slice(index, index + chunk_size);
      tempArray.push(myChunk);
    }

    this.setState({ slicedResources: tempArray, loaded: true });
  };
  setKeywords = e => {
    this.setState({ keywords: e });
  };
  onApply = () => {
    ;
    

    let Filtered = this.state.resources.filter(i =>
      i.title.toUpperCase().includes(this.state.keywords.toUpperCase())
    );
   
    this.setState({ resouceindex: 0 });
    
    
    !Filtered.length ==0 ? this.chunkArray(Filtered, 3) : this.chunkArray([],3);
  };

  selectFilterNew = (category, dtype) => {


    var Filtered1 = this.state.resources.filter(i => {
      if (category != null && dtype != null) {
        return (
          category.value == i.category && dtype.value == i.document_type


        )
      }
      else if (category != null && dtype == null) {


        return category.value == i.category
      }
      else if (category == null && dtype != null) {


        return dtype.value == i.document_type
      }
     
    })
    Filtered1.length != 0 ? this.chunkArray(Filtered1, 3) : this.chunkArray([],3);

  }


  componentDidMount() {
    Axios.get("https://iomapi.naxa.com.np/api/v1/resource/").then(response => {
      this.setState({ resources: response.data });


      this.chunkArray(this.state.resources, 3);

    });
  }

  render() {


    return (
      <div>
        <Navbar />
        <div className="page-wrap">
          <main className="main-content">

            <div className="container">

              <div className="row-wrap">  

                <div className="row">

                  <div className="col-12 col-md-3 col-xl-4">
                    <SearchFilter
                      selectFilter={this.selectFilterNew}
                      setKeywords={this.setKeywords}
                      onApply={this.onApply}
                      initialData = {this.state.resources}
                      displayInitial = {this.chunkArray}
                    />
                    
                  </div>
               


                  <div className="col-12 col-md-9 col-xl-8">

                    <div className="content-section">
                      <div className="loader" style={{ textAlign: "center" }}>
                        {this.state.loaded == false && <LoadingSpinnerBig />}
                      </div>
                     {  this.state.slicedResources.length!=0 ?
                        this.state.loaded && this.state.slicedResources.length!=0&&
                        this.state.slicedResources[
                          this.state.resouceindex
                          
                        ].map(e => (

                          <Resourcecard

                            id={e.id}
                            title={e.title}
                            description={e.description}
                            image={e.image}
                            audio={e.audio}
                            video={e.video}
                            publication={e.publication}
                            date={e.date}
                            categories={e.category}
                            document_type={e.document_type}

                          />

                        )


                        )
                      : <div style={{textAlign:"center"}}><h6>No resources found</h6></div>
                      }
                      
                     
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
                  <a
                  style={{cursor:' pointer'}}
                    onClick={() => {

                      this.setState({
                        resouceindex: this.state.resouceindex - 1
                      });
                      
                      
                    }}
                  >
                    &laquo;
                  </a>
                  {this.state.slicedResources.map((e, i) => {
                    return (
                      <a
                        className={this.state.resouceindex == i ? "active" : ""}
                        onClick={() => this.setState({ resouceindex: i })}
                      >
                        {i + 1}
                      </a>
                    );
                  })}
                  <a
                  
                    style={{cursor:' pointer'}}
                    onClick={() => {
                      this.setState({
                        resouceindex: this.state.resouceindex + 1
                      });
                    }}
                  >
                    &raquo;
                  </a>
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
