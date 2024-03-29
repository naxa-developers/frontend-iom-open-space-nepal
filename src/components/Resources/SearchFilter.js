import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Select from "react-select";
import { connect } from "react-redux";
// React.Bootstrap = require("react-bootstrap");
// import Select from "react-bootstrap-select";

const options = [
  { value: 0, label: "Plans & Policies" },
  { value: 1, label: "Research" },
  { value: 2, label: "Multimedia" },
  { value: 3, label: "Report" },
  { value: 4, label: "Study Report" },
  { value: 5, label: "Atlas Mapbook" },
  { value: 6, label: "Summary Report" }
];

const options1 = [
  { value: 1, label: "Publication" },
  { value: 0, label: "Audio" },
  { value: 2, label: "Video" }


]
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    
    indicatorSeparator: false
  }) }
class SearchFilter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      focused: false,
      value1: null,
      value2: null,
      categorySelect: null,
      documentSelect: null,
      resources: null
    }
  }

  // onCategoryChange = (e) => this.setState({categorySelect: e }) 

  applyFilter = () => {
    this.props.selectFilter(this.state.value1, this.state.value2);
    // this.props.selectFilter(1,this.state.value2);

  }

  onClear = () => {


    this.setState({ value1: '', value2: '' })
    this.props.displayInitial(this.props.initialData, 3)
  }

  render() {


    return (
      <div>
        <div className="form-section">

          <form className="form-search">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i
                  class="humanitarian-icon-Search search-icon"></i></span>
              </div>
              <input type="text" class="form-control" aria-label="Search"
                placeholder={this.props.language=='0' ? "Search resources" : "स्रोतहरू खोज्नुहोस्"} onInput={(e) => this.props.setKeywords(e.target.value)}
                onFocus={() => this.setState({ focused: true })}
                // onBlur={() => {
                //   setTimeout(() => this.setState({ focused: false }), 100)

                // }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    this.props.onApply()

                  }
                }} />
              <div class="input-group-append">
                <span class="input-group-text">{this.state.focused && <MaterialIcon icon="arrow_right_alt" onClick={() => this.props.onApply()} ></MaterialIcon>}</span>
              </div>
            </div>
           

          </form>

        </div>

        <div className="dropdown-select">
          <div className="categories-dropdown">

            <Select options={options} onChange={(e) => this.setState({ value1: e })} value={this.state.value1} placeholder={this.props.language=='0' ? "Category" : "वर्ग"} />
          </div>
        </div>
        <br />
        <div className="document-types-dropdown">

          <Select styles={customStyles} options={options1} onChange={(e) => this.setState({ value2: e })} value={this.state.value2} placeholder={this.props.language=='0' ? "Document Type" : "कागजात प्रकार"} />
        </div>
        <br />
        <div className="map-filter">
          <div className="reset-btns">
            <div className="reset flex-start">
              <MaterialIcon icon="refresh" />

              <span onClick={() => this.onClear()} className="btn" style={{ cursor: "pointer" }}>{this.props.language=='0' ? "Clear all" : "सबै हटाउनुहोस्"}</span>

            </div> 
            <button className="btn openspace-button" onClick={() => {
              this.applyFilter()
            }
            }>
            {this.props.language=='0' ? "Apply" : "निवेदन गर्नु"}
          </button>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reportData: state.reportData,
    language: state.language
  };
};

export default connect(mapStateToProps)(SearchFilter);
