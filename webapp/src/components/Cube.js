import React, { Component } from 'react';
import Web3 from 'web3';
import { createBlockbinContract } from '../util/ethereum';

/**
 * hash is in the form '0x....'
 * This returns a promise
 */
const getCubeContent = function(hash) {
  var web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
  var contractInstance = createBlockbinContract(web3);
  return contractInstance.methods.readCube(hash).call();
};

class Cube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'Retrieving...',
      contentAscii: 'Retrieving...',
      hash: this.props.match.params.cubeId,
      error: ''
    };

    getCubeContent(this.state.hash)
      .then(function(result) {
        if(result !== null) {
          this.setState({
            'content': result,
            'contentAscii': Web3.utils.hexToAscii(result)
          });
        } else {
          this.setState({
            'content': 'Empty!',
            'contentAscii': 'Empty!',
            'error': 'This cube does not exist. Maybe it\'s still being mined?'
        });
        }
      }.bind(this))
      .catch(function(error) {
        this.setState({
          'content': 'Error while fetching this cube',
          'contentAscii': 'Error while fetching this cube',
          'error': error.toString()
        });
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
          <div className="cube-display-error">{this.state.error}</div>
      </div>
    )
  }
}

export default Cube;
