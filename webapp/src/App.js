import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Cube from "./components/Cube";
import NotFound from "./components/NotFound";
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cube/:cubeId" component={Cube} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App;
