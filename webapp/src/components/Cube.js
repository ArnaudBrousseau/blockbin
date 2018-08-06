import React, { Component } from 'react';
import { createBlockbinContract } from '../util/ethereum';

/**
 * hash is in the form '0x....'
 * This returns a promise
 */
const getCubeContent = function(hash) {
  return new Promise((resolve, reject) => {
    if (typeof window.web3 !== 'undefined') {
      var web3 = new window.Web3(window.web3.currentProvider);
      var contractInstance = createBlockbinContract(web3);
    } else {
      alert('cannot access web3. Did you install/enable Metamask?')
      return;
    }
    contractInstance.readCube.call(
      hash,
      function(error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

class Cube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'Retrieving...',
      hash: this.props.match.params.cubeId,
      error: ''
    };

    getCubeContent(this.state.hash)
      .then(function(result) {
        this.setState({'content': result });
      }.bind(this))
      .catch(function(error) {
        this.setState({'error': error});
      }.bind(this));
  }

  render() {
    return (
      <div className="app-pagecontainer">
          <h3 className="app-title nerdy">@{this.state.hash}</h3>
          <div className="cube-display nerdy">
            {window.web3.toAscii(this.state.content)}
          </div>
          <div className="cube-display nerdy faded">
            {this.state.content}
          </div>
          <div className="cube-error">{this.state.error}</div>
      </div>
    )
  }
}

export default Cube;
