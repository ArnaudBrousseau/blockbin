import React, { Component } from 'react';
import Web3 from 'web3';
import { createBlockbinContract } from '../util/ethereum';

/**
 * hash is in the form '0x....'
 * This returns a promise
 */
const getCubeContent = function(hash) {
  return new Promise((resolve, reject) => {
    var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    var contractInstance = createBlockbinContract(web3);
    contractInstance.methods.readCube(hash).call(
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
      contextAscii: 'Retrieving...',
      hash: this.props.match.params.cubeId,
      error: ''
    };

    getCubeContent(this.state.hash)
      .then(function(result) {
        this.setState({
          'content': result,
          'contentAscii': Web3.utils.hexToAscii(result)
        });
      }.bind(this))
      .catch(function(error) {
        this.setState({'error': error.toString()});
      }.bind(this));
  }

  render() {
    return (
      <div className="app-pagecontainer">
          <h3 className="app-title nerdy">@{this.state.hash}</h3>
          <div className="cube-display nerdy">
            <span className="cube-display-codec faded">Bytes</span>
            {this.state.content}
          </div>
          <div className="cube-display nerdy">
            <span className="cube-display-codec faded">ASCII</span>
            {this.state.contentAscii}
          </div>
          <div className="cube-error">{this.state.error}</div>
      </div>
    )
  }
}

export default Cube;
