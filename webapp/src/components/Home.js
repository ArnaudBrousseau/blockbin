import React, { Component } from 'react';

import NewCubeForm from './NewCubeForm';


class Home extends Component {
  render() {
    return (
      <div className="app-pagecontainer">
        <NewCubeForm />
      </div>
    );
  }
 }

export default Home;
