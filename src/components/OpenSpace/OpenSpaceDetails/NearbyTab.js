import React, { Component } from "react";

class NearbyTab extends Component {
  render() {
    return (
      <div>
        <div className="card">
          <div className="card-header">
            <a
              className="card-link btn-link"
              data-toggle="collapse"
              href="#collapseOne"
            >
              <i className="humanitarian-icon-Medical-supply"> </i>
              Health facilities
            </a>
          </div>
          <div id="collapseOne" className="collapse " data-parent="#accordion">
            <div className="card-body">
              <div className="facility-overview flex-between">
                <div className="overview-item">
                  <h6>1</h6>
                  <p>district hospital</p>
                </div>
                <div className="overview-item">
                  <h6>13</h6>
                  <p>government Hospital</p>
                </div>
                <div className="overview-item">
                  <h6>1</h6>
                  <p>private Hospital</p>
                </div>
              </div>
              <div className="space-list nearby-list">
                <ul>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-1.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>Sukraraj Tropical Hospital</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>200 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-2.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>Chhetrapati Free Clinic</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>500 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-3.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>Life Care Hospital</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>750 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-4.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>NORVIC Hospital</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>800 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <a
              className="collapsed card-link btn-link"
              data-toggle="collapse"
              href="#collapseTwo"
            >
              <i className="humanitarian-icon-Fire"></i>
              Fire Brigade
            </a>
          </div>
          <div id="collapseTwo" className="collapse" data-parent="#accordion">
            <div className="card-body">
              <div className="facility-overview flex-between">
                <div className="overview-item ">
                  <h6>1</h6>
                  <p>district hospital</p>
                </div>
                <div className="overview-item">
                  <h6>13</h6>
                  <p>government Hospital</p>
                </div>
                <div className="overview-item">
                  <h6>1</h6>
                  <p>private Hospital</p>
                </div>
              </div>
              <div className="space-list nearby-list">
                <ul>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-1.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>Sukraraj Tropical Hospital</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>200 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-2.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>Chhetrapati Free Clinic</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>500 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-3.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>Life Care Hospital</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>750 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-4.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>NORVIC Hospital</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>800 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <a
              className="collapsed card-link btn-link"
              data-toggle="collapse"
              href="#collapseThree"
            >
              <i className="humanitarian-icon-Helipad"></i>
              Helipad (Airport)
            </a>
          </div>
          <div id="collapseThree" className="collapse" data-parent="#accordion">
            <div className="card-body">
              <div className="facility-overview flex-between">
                <div className="overview-item">
                  <h6>1</h6>
                  <p>district hospital</p>
                </div>
                <div className="overview-item">
                  <h6>13</h6>
                  <p>government Hospital</p>
                </div>
                <div className="overview-item">
                  <h6>1</h6>
                  <p>private Hospital</p>
                </div>
              </div>
              <div className="space-list nearby-list">
                <ul>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-1.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>Sukraraj Tropical Hospital</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>200 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-2.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>Chhetrapati Free Clinic</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>500 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-3.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>Life Care Hospital</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>750 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-4.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>NORVIC Hospital</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>800 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <a
              className="collapsed card-link btn-link"
              data-toggle="collapse"
              href="#collapseFour"
            >
              <i className="humanitarian-icon-National-army"></i>
              Security Forces
            </a>
          </div>
          <div id="collapseFour" className="collapse" data-parent="#accordion">
            <div className="card-body">
              <div className="facility-overview flex-between">
                <div className="overview-item">
                  <h6>1</h6>
                  <p>district hospital</p>
                </div>
                <div className="overview-item">
                  <h6>13</h6>
                  <p>government Hospital</p>
                </div>
                <div className="overview-item">
                  <h6>1</h6>
                  <p>private Hospital</p>
                </div>
              </div>
              <div className="space-list nearby-list">
                <ul>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-1.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>Sukraraj Tropical Hospital</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>200 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-2.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>Chhetrapati Free Clinic</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>500 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-3.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>Life Care Hospital</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>750 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="space">
                      <figure>
                        <img src="images/space-4.jpg" alt="space" />
                      </figure>
                      <div className="space-content">
                        <h5>NORVIC Hospital</h5>
                        <p>
                          <span>
                            <i className="material-icons">phone</i>01-4250931
                          </span>
                          <span>
                            <i className="material-icons">near_me</i>800 m
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NearbyTab;
