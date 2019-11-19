import React, { Component } from "react";
import { Card, Accordion, Button } from "react-bootstrap";

class NearbyTab extends Component {
  render() {
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Health Facilities
             
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
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
              <span>Here goes individual hospitals now </span>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Fire Brigade
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Goes Fire Bridge info from API</Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Helipad(Airport)
            </Accordion.Toggle>
            
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>Goes Helipad info from API</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      /*   <div className="card">
          <div className="card-header">
            <a
              className="collapsed card-link btn-link"
              data-toggle="collapse"
              // href="#collapseThree"
          

            >
              <i className="humanitarian-icon-Helipad"></i>
              Helipad (Airport)
            </a>
          </div>
          <div id="collapseThree" className= "collapse show collapse" data-parent="#accordion">
   
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <a
              className="collapsed card-link btn-link"
              data-toggle="collapse"
              // href="#collapseFour"
           

            >
              <i className="humanitarian-icon-National-army"></i>
              Security Forces
            </a>
          </div>
          <div id="collapseFour" className= "collapse show collapse" data-parent="#accordion">
           
          </div>
        </div> */
      // </Accordion>
    );
  }
}
export default NearbyTab;
