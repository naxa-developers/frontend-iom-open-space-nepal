import React, { Component } from "react";

import Home from './Home/Home'
import Resources from './Resources/Resources';
import Report from './Report/Report';
import OpenSpace from './OpenSpace/OpenSpace';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

// import {Provider } from 'react-redux';
// import store from '../store';

import "../scss/style.scss";
import "../css/style.css";



class App extends Component {
  render() {
    return (
      <BrowserRouter>
      
      <div className="">
       <Switch>
       <Route exact path='/' component={Home}></Route>
        <Route exact path='/resources' component = {Resources}></Route>
        <Route exact path='/report' component ={Report}></Route>
        <Route exact path='/openspace' component={OpenSpace}></Route>
       </Switch>

      </div>
      </BrowserRouter>
    );
  }
}

export default App;
