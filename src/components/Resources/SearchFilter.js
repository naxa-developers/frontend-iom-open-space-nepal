import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Select from "react-select";
// React.Bootstrap = require("react-bootstrap");
// import Select from "react-bootstrap-select";

const options = [
  { value: "1", label: "Plans & Policies" },
  { value: "2", label: "Research" },
  { value: "3", label: "Multimedia" }
];

const options1 = [
    { value: "1", label: "Document types" },
    { value: "2", label: "Publication" },
    { value: "3", label: "Video" },
    { value: "3", label: "Audio" }


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
              />
            </div>
          </form>
          </div>
          <br />
          <br />
          <br />

        <div className="dropdown-select">
          <div className="categories-dropdown">
            <Select options={options} />
          </div>
        </div>
        <br />
        <div className="document-types-dropdown">
            <Select options={options1} />
            </div>
      </div>
    );
  }
}
export default SearchFilter;
