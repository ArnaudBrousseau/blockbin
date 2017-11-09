import React, { Component } from 'react';

import '../App.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <a href="https://www.blockbin.io">
          <h1 className="header-title">Blockbin</h1>
        </a>
        <a href="about">
          <h1 className="header-title header-right">About</h1>
        </a>
      </header>
    );
  }
}

export default Header;
