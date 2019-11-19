import React, { Component } from "react";
import { Card, Accordion, Button } from 'react-bootstrap';

class NearbyTab extends Component {
  render() {
 
    return (
      <Accordion defaultActiveKey="0">
        <Card className="card">
          <div className="card-header">
            <Accordion.Toggle eventKey="0" as = {Button } className="btn-link" >
            <i className="humanitarian-icon-Medical-supply"> </i>
              Health facilities
            </Accordion.Toggle>
             
           
              
          
          </div>
          <div id="collapseOne" className= "collapse show collapse"data-parent="#accordion">
            
          </div>
        </Card>

       <div className="card">
          <div className="card-header">
            <a
              className="collapsed card-link btn-link"
              data-toggle="collapse"
              // href="#collapseTwo"
            


            >
              <i className="humanitarian-icon-Fire"></i>
              Fire Brigade
            </a>
          </div>
          <div id="collapseTwo" className= "collapse show collapse" data-parent="#accordion">
            
          </div>
        </div>
        <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link"  eventKey="0">
        Click me!
      </Accordion.Toggle>
      
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Hello! I'm the body</Card.Body>
    </Accordion.Collapse>
  </Card>
  
       {/*   <div className="card">
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
        </div> */}
      </Accordion>
    );
  }
}
export default NearbyTab;
