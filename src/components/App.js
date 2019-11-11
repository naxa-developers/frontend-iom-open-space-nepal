import React, { Component } from "react";
import { Switch, Route, HashRouter as Router } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import '../css/slick.css';

import "../scss/style.scss";
// import '../css/humanitarian-fonts.css';



import Home from "./Home/Home";
import Resources from "./Resources/Resources";
import Report from "./Report/Report";
import OpenSpace from "../components/OpenSpace/Openspace"
import AboutApp from "./AboutApp/AboutApp";


// import {Provider } from 'react-redux';
// import store from '../store';



class App extends Component {
  render() {
    return (
     
      <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Home {...props}/>
              }
            ></Route>

            <Route
              exact
              path="/resources"
              render={props => <Resources {...props}/>
              }
            ></Route>
            <Route
              exact
              path="/report"
              render={props => <Report {...props}/>}
            ></Route>
            <Route
              exact
              path="/openspace"
              render={props => 
                <OpenSpace {...props}/>}
            ></Route>
            <Route
              exact
              path="/aboutapp"
              render={props => 
                <AboutApp {...props}/>
              }
            ></Route>

          </Switch>
      
      </Router>
    );
  }
}

export default App;
