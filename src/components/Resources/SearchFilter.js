import React, { Component } from 'react'

class SearchFilter extends Component {
    render() {
        return (
            <div>
                  <div className="col-12 col-md-3 col-xl-4">
                            <div className="form-section">
                                {/* <!-- form-search-bar --> */}
                                <form className="form-search">
                                    <div className="form-wrap">
                                        <button className="btn btn-search" type="submit">
                                            <i className="humanitarian-icon-Search search-icon" aria-hidden="true"></i>
                                        </button>
                                        <input className="form-control" type="text" placeholder="Search resources by keyword"
                                        aria-label="Search" />
                                    </div>
                                </form>

                                <div className="dropdown-select">
                                    <div className="categories-dropdown">   
                                        <select className="selectpicker">
                                            <option selected>Categories</option>
                                            <option value="1">Plans & Policies</option>
                                            <option value="2">Research</option>
                                            <option value="3">Multimedia</option>
                                        </select>
                                    </div>

                                    <div className="document-types-dropdown">
                                        <select className="selectpicker">
                                            <option>Document types</option>
                                            <option>Publication</option>
                                            <option>Video</option>
                                            <option>Audio</option>
                                        </select>  
                                    </div>
                                </div>
                            </div>
                        </div>
                
            </div>
        )
    }
}
export default SearchFilter;
