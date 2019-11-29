import React, { Component } from 'react';

class Gallary extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             loading:true
        }
    }
    

    componentDidMount(){

    }
    render() {
        return (
            <>
               <div className="gallery-category">
                        <div className="gallery-grid">
                          <h4>maps</h4>
                          <div class="row">
                            <div className="col-sm-4">
                              <figure>
                                <img src="../../../src/img/ccm.png" alt="map" />
                              </figure>
                            </div>
                            <div className="col-sm-4">
                              <figure>
                                <img src="../../../src/img/ccm.png" alt="map" />
                              </figure>
                            </div>
                            <div className="col-sm-4">
                              <figure>
                                <img src="../../../src/img/ccm.png" alt="map" />
                              </figure>
                            </div>

                          </div>
                        </div>
                        <div className="gallery-grid">
                          <h4>Gallery</h4>
                          <div class="row">
                            <div className="col-sm-4">
                              <figure>
                                <img src="../../../src/img/space-2.jpg" alt="map" />
                              </figure>
                            </div>
                            <div className="col-sm-4">
                              <figure>
                                <img src="../../../src/img/space-3.jpg" alt="map" />
                              </figure>
                            </div>
                            <div className="col-sm-4">
                              <figure>
                                <img src="../../../src/img/space-4.jpg" alt="map" />
                              </figure>
                            </div>

                          </div>
                        </div>
                      </div>
            </>
        );
    }
}

export default Gallary;