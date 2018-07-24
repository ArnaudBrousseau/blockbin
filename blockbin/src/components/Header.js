import React, { Component } from 'react';

import '../App.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <a href="/" className="header-link">
          <h1 className="header-title">Blockbin</h1>
        </a>
      </header>
    );
  }
}

export default Header;
