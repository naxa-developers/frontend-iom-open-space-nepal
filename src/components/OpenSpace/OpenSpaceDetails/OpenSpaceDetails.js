import React, { Component,createRef } from "react";
import Navbar from "../../Home/NavbarLayout";
import DetailsMap from './DetailsMap';
import DetailsCard from './DetailsCard';
import { connect } from 'react-redux';
// import '../OpenSpaceCSS.css';

class OpenSpaceDetails extends Component {
  constructor(props) {
    super(props)
    this.map=createRef();
    this.childref=createRef()
    // this.content =createRef();/
    this.child = React.createRef();

    this.state = {
       
    };
  };

  routefromanother=(a,b)=>{
    
    this.detail.nearbyref.fetchroute(a,b)
    

  }
  removeroute=()=>{
    this.detail.nearbyref.remove()

  }


  // getRef=(childRef) => {
  //   this.parentRef = childRef
  // }
  // componentDidMount(){
  //   console.log("/////////////.../////",this.detail)
  // }
  

  render() {

  
  
    
    return (
    <>
        <Navbar />
        <main className="main-content" >
          <section className="openSpace-map">
            <div className="container-fluid">
              <div className="map-wrapper">
              <div className="row no-gutters" >
                  <div className="col-md-7 col-lg-8">
                  <DetailsMap remove={this.removeroute} nearbyroute={this.routefromanother }reff={this.map} id={this.props.id} />
                  </div>
                  <div className="col-md-5 col-lg-4" >
                  <DetailsCard  reff={this.map} id = {this.props.id} wrappedComponentRef={connectedComponent =>
            this.detail =
            connectedComponent} />
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
const mapStateToProps = (state) => {
  return {
       
       id: state.spaceID

  }
}
export default connect(mapStateToProps)(OpenSpaceDetails);
