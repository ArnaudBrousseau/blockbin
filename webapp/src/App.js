import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home";
import Cube from "./components/Cube";
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Home} />
          <Route path="/cube/:cubeId" component={Cube} />
        </div>
      </Router>
    )
  }
}

export default App;
