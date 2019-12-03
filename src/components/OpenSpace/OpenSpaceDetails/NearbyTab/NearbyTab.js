import React, { Component } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import HospitalCard from "./HospitalCard";
import FireCard from './FireCard';
import SecurityCard from "./SecurityCard";
import EducationCard from './EducationCard';

class NearbyTab extends Component {

  render() {
 
    
    return (
      <Accordion className="map-accordion" id="accordion">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <i class="humanitarian-icon-Medical-supply"> </i> Health Facilities
             
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <HospitalCard
              id= {this.props.id}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
            <i class="humanitarian-icon-Fire"></i>
              Fire Brigade
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>

              <FireCard
              id= {this.props.id}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
            <i class="humanitarian-icon-Helipad"></i>
              Helipad(Airport)
            </Accordion.Toggle>
            
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>There is no available data at the moment.</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="3">
            <i class="humanitarian-icon-National-army"></i>
              Security Forces
            </Accordion.Toggle>
            
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <SecurityCard
              id= {this.props.id}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="4">
              <i className="humanitarian-icon-Education"></i>
              Educational Facilities
            </Accordion.Toggle>
            
          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>
              <EducationCard
              id= {this.props.id}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

     
    );
  }
}
export default NearbyTab;
