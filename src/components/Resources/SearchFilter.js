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
  render() {
    return (
      <div>
          <div className="form-section">
          {/* <!-- form-search-bar --> */}
          <form className="form-search">
            <div className="form-wrap">
              <button className="btn btn-search" type="submit">
              <i class="humanitarian-icon-Search search-icon" aria-hidden="true"></i>
                {/* <i className="material-icons" aria-hidden="true">
                  search
                </i> */}
              </button>
              <MaterialIcon />
              <input
                className="form-control"
                type="text"
                placeholder="Search resources by keyword"
                aria-label="Search"
                onInput={(e)=>this.props.setKeywords(e.target.value)}
              />
            </div>
          </form>
          </div>
          <br />
          <br />
          <br />

        <div className="dropdown-select">
          <div className="categories-dropdown">
            <Select options={options} onChange={(e)=>this.props.selectFilter(0,e)} placeholder='Category' />
          </div>
        </div>
        <br />
        <div className="document-types-dropdown">
            <Select options={options1} onChange={(e)=>this.props.selectFilter(1,e)} placeholder="Document Type" />
            </div>
      </div>
    );
  }
}
export default SearchFilter;
