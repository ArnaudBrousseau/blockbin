import React, { Component } from 'react';

import ShowCubeForm from './ShowCubeForm';
import MetamaskStatus from './MetamaskStatus';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-container">
          <a href="/" className="header-link">
            <h1 className="header-title">Blockbin</h1>
          </a>
          <ShowCubeForm />
        </div>
        <div className="metamask-status-container">
          <MetamaskStatus />
        </div>
      </header>
    );
  }
}

export default Header;
