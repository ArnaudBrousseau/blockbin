import React, { Component } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
