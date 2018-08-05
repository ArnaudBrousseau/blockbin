import React, { Component } from 'react';

import Header from './Header';
import NewCubeForm from './NewCubeForm';


class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="app-pagecontainer">
          <NewCubeForm />
        </div>
      </div>
    );
  }
 }

export default Home;
