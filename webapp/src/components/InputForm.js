import React, { Component } from 'react';
import { createBlockbinContract } from '../util/ethereum';

import '../App.css';


function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Persisting content to the blockchain requires the use of Metamask to fuel the transaction with some ethereum. Go to https://metamask.io/ to install it then refresh this page.
    </div>
  );
}

class InputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: 'What would you like to put on the ~blockchain~?',
    };

    if (typeof window.web3 !== 'undefined') {
      // TODO: replace this with an imported version of web3
      // e.g. import 'Web3' from 'web3'; new Web3(...)
      // For some reason webpack makes this hard?
      this.web3 = new window.Web3(window.web3.currentProvider);
    } else {
      this.web3 = undefined;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ content: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    const cubeBytes = this.web3.fromAscii(this.state.content);
    const contentHash = this.web3.sha3(cubeBytes);
    const contractInstance = createBlockbinContract(this.web3);

    function submitTx(gasEstimate) {
      // Metamask uses accounts[0] to pass the preferred account
      contractInstance.dumpCube.sendTransaction(
        cubeBytes,
        contentHash,
        {
          from: this.web3.eth.accounts[0],
          gas: gasEstimate,
        },
        function(error, result){
          if (!error) {
            alert('Saved!\nYour lookup hash is: ' + contentHash + '\nYour transaction id is: ' + result);
          } else {
            console.error(error);
            alert('Error in processing your transaction');
          }
        }
      );
    }

    // TODO: refactor `this` out. Nested functions are just ugly and hard to
    // reason about.
    const that = this

    contractInstance.dumpCube.estimateGas(
      cubeBytes,
      contentHash,
      { from: that.web3.eth.accounts[0] },
      function(error, result){
        if (!error) {
          console.log('gas estimate: ' + result);
          submitTx.call(that, result);
        } else {
          console.error('not able to estimate gas. error msg: ' + error);
          return;
        }
      }
    );
  }

  render() {
    const doesNotHaveWeb3 = this.web3 === undefined;
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>
          Cube content:
        </h3>
        <textarea
          className="inputform-textarea"
          onChange={this.handleChange}
          value={this.state.content}
          rows={10}
        />
        <WarningBanner warn={doesNotHaveWeb3} />
        <button
          className="btn btn-primary"
          disabled={doesNotHaveWeb3 ? 'disabled' : ''}
        >
          Save to blockchain
        </button>
      </form>
    );
  }
}

export default InputForm;
