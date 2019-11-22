import React, { Component } from "react";

import Navbar from "../Home/Navbar";
import SearchFilter from "./SearchFilter";
import Resourcecard from "./Resourcecard";

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
    let Filtered = this.state.resources.filter(i =>
      i.title.toUpperCase().includes(this.state.keywords.toUpperCase())
    );
    this.setState({ resouceindex: 0 });
    !Filtered.length == 0 ? this.chunkArray(Filtered, 3) : alert("Not Found");
  };

  selectFilter = (state, e) => {
    
    var Filtered = this.state.resources.filter(i => {
      var a = state == 0 ? i.category : i.document_type;
      return a == e.value;
    });

    !Filtered.length == 0 && this.chunkArray(Filtered, 3);
  };

  componentDidMount() {
    Axios.get("http://139.59.67.104:8011/api/v1/resource/").then(response => {
      this.setState({ resources: response.data });

      this.chunkArray(this.state.resources, 3);
    
    });
  }

  render() {
    console.log(this.state.resources);
    
    return (
      <div>
        <Navbar />
        <div className="page-wrap">
          <main className="main-content">
            <div className="container">
              <div className="row-wrap mt-150">
                <div className="row">
                  <div className="col-12 col-md-3 col-xl-4">
                    <SearchFilter
                      selectFilter={this.selectFilter}
                      setKeywords={this.setKeywords}
                      onApply={this.onApply}
                      initialData = {this.state.resources}
                      displayInitial = {this.chunkArray}
                    />
                  </div>

                  <div className="col-12 col-md-9 col-xl-8">
                    <div className="content-section">
                      {this.state.loaded &&
                        this.state.slicedResources[
                          this.state.resouceindex
                        ].map(e => (
                          
                          <Resourcecard
                         
                          id= {e.id}
                            title={e.title}
                            description={e.description}
                            image={e.image}
                            audio ={e.audio}
                            video = {e.video}
                            publication = {e.publication}
                            date={e.date}
                            categories={e.category}
                            document_type={e.document_type}
                           
                          />
                          
                        )
                        
                        
                        )}
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
                    style={{}}
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
