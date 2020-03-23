import React, { Component,createRef } from "react";
import { Button, Modal } from 'react-bootstrap'
import NavbarLayout from "../Home/NavbarLayout";
import OpenspaceMap from './OpenspaceMap';
import Sidebar from './Sidebar';
import './OpenSpaceCSS.css';

class OpenSpace extends Component {
  constructor(props) {
    super(props)
    this.mapRefs=createRef();
    this.state = {
      currentLocation: null,
      nepalProvince:null,
      openModal: false,
      // nullOpenspace: false
       
    };
  };
  setcurrentlocation=(loc)=>{
    this.setState({currentLocation:loc})
    
  }
  setProvince=(a)=>{
    // this.setState({nepalProvince:a})
  }

  openPop = () => {
    this.setState({ openModal: true})
  }
  componentDidMount(){

    var map=this.mapRefs.current.leafletElement

    var initialdis=[]
    sessionStorage.Distances==undefined&&sessionStorage.setItem('Distances', JSON.stringify(initialdis))

  }
  

  render() {
    // console.log("render",this.state.currentLocation)
    return (
    <>
        <NavbarLayout />
       
      <Modal show={this.state.openModal} centered="false" size="lg">
                <Modal.Header><strong>OPEN SPACES MAPPING FOR
HUMANITARIAN
ASSISTANCE</strong>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={()=> this.setState({openModal: !this.state.openModal})}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div class="modal-body">
   <span style={{fontSize:'0.9rem', color:'gray'}}>No open space identification survey has been carried in this location</span>
                    </div>
                </Modal.Body>
                {/* <Button style={{width:'200px', align: 'center'}}>Okay</Button> */}

            </Modal>
        <main className="main-content">
          <section className="openSpace-map">
            <div className="container-fluid">
              <div className ="map-wrapper">
                <div className="row no-gutters">
                  <div className="col-md-7 col-lg-8">
                  <OpenspaceMap setProvince={this.setProvince} setcurrentLocation={this.setcurrentlocation} currentLocation={this.state.currentLocation} mapRefss={this.mapRefs} />
                  </div>
                  <div className="col-md-5 col-lg-4">
                  <Sidebar mapRefs={this.mapRefs}  currentLocation={this.state.currentLocation} openPop = {this.openPop} />
                  </div>
                </div>
                
                
              </div>
              
            </div>
          </section>
        </main>
        </>
    );
  }
}
export default OpenSpace;
