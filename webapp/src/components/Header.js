import React, { Component } from 'react';

import '../App.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-container">
          <a href="/" className="header-link">
            <h1 className="header-title">Blockbin</h1>
          </a>
          <form className="header-form">
            <label>
              Cube SHA
              <input type="text" name="sha" className="header-input" />
            </label>
            <button className="header-submit-button">Show</button>
          </form>
        </div>
      </header>
    );
  }
}

export default Header;
