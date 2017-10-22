import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a href="https://www.blockbin.io">
            <h1 className="App-title">Blockbin</h1>
          </a>
          <a href="about">
            <h1 className="App-title App-right">About</h1>
          </a>
        </header>
        <div className="App-pagecontainer">
          <form>
            <h3>
              Paste content below to post to Blockbin:
            </h3>
            <textarea 
              className="App-textarea" 
              rows={10}
            />
            <button className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
