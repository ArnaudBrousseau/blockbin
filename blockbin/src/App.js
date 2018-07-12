import React, { Component } from 'react';

import Header from './components/Header';
import InputForm from './components/InputForm';

import './App.css';
// TODO(arnaud): fix me! We shouldn't import things directly from node_modules
// Also: do we really want to use bootstrap? :[
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="app-pagecontainer">
          <InputForm />
        </div>
      </div>
    );
  }
}

export default App;
