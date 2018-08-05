import React, { Component } from 'react';

import Header from './Header';
import InputForm from './InputForm';


class Home extends Component {
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

export default Home;
