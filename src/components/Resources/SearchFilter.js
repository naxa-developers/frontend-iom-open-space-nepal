import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Select from "react-select";
// React.Bootstrap = require("react-bootstrap");
// import Select from "react-bootstrap-select";

const options = [
  { value: 0, label: "Plans & Policies" },
  { value: 1, label: "Research" },
  { value: 2, label: "Multimedia" }
];

const options1 = [
    { value: 0, label: "Publication" },
    { value: 1, label: "Video" },
    { value: 2, label: "Audio" }


]

class SearchFilter extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       focused: false,
       value1: null,
       value2: null,
       categorySelect: null,
       documentSelect: null,
       resources:null
    }
  }

  // onCategoryChange = (e) => this.setState({categorySelect: e }) 

  applyFilter = () => {
    this.props.selectFilter(this.state.value1, this.state.value2);
    // this.props.selectFilter(1,this.state.value2);

  }

  onClear = () => {
    
    
    this.setState({value1: '', value2: ''})
    this.props.displayInitial(this.props.initialData,3)
  }
  
  render() {
    console.log(this.props.initialData);
    
    return (
      <div>
          <div className="form-section">
          {/* <!-- form-search-bar --> */}
          <form className="form-search">
            <div className="form-wrap">
              <button className="btn btn-search" type="submit">
              <i class="humanitarian-icon-Search search-icon" aria-hidden="true"></i>
             
                {/* <MaterialIcon className="material-icons" aria-hidden="true">
                  search
                </MaterialIcon> */}
              </button>
           
              <input
                className="form-control"
                type="text"
                placeholder="Search resources by keyword"
                aria-label="Search"
                onInput={(e)=>this.props.setKeywords(e.target.value)}
                onFocus = {() => this.setState({focused: true})}
                onBlur = {() => {
                  setTimeout(()=>this.setState({focused: false}),100)
                  
              }}
              onKeyDown = {(e) => {
                if(e.key ==='Enter') {
                  this.props.onApply() 
                  // this.setState({focused: false})
                }
              } } 

              />
  {this.state.focused && <MaterialIcon icon="arrow_right_alt" onClick={() =>this.props.onApply()} ></MaterialIcon> }
            </div>
            
          </form>
       
          </div>
          <br />
          <br />
          <br />

        <div className="dropdown-select">
          <div className="categories-dropdown">
           
            <Select options={options} onChange={(e)=>this.setState({value1: e})} value={this.state.value1} placeholder='Category' />
          </div>
        </div>
        <br />
        <div className="document-types-dropdown">
  
            <Select options={options1} onChange={(e)=>this.setState({value2:e })} value={this.state.value2} placeholder="Document Type" />
            </div>
<br/>
<div className="map-filter">
            <div className="reset-btns">
          <div className="reset"  >
            <MaterialIcon icon="refresh" />

            <span onClick={() => this.onClear()} className="btn" style={{cursor:"pointer"}}>Clear all </span>
           
          </div> <br/>
          <a className="openspace-button" onClick={() => this.applyFilter()}>
            Apply
          </a>
        </div>
        </div>

      </div>
    );
  }
}
export default SearchFilter;
