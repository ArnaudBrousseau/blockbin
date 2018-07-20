import React, { Component } from 'react';
import Web3 from 'web3';

import '../App.css';
import { createBlockbinContract } from '../util/ethereum';


class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pastedText: 'What would you like to put on the ~blockchain~?',
    };

    if (typeof window.web3 !== 'undefined') {
      console.log('using mist or metamask');
      const newWeb3 = new Web3(window.web3.currentProvider);
      this.web3 = newWeb3;
    } else {
      // TODO: degrade a bit more gracefully
      // We don't actually *need* Metamask until we're about to
      // persist stuff to the blockchain
      alert('Please install Mist or MetaMask to use Blockbin');
    }

    this.contractInstance = createBlockbinContract(this.web3);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ pastedText: event.target.value })
  }

  handleSubmit(event) {
    alert('A text was submitted: ' + this.state.pastedText);
    event.preventDefault();
    const cubeBytes = this.web3.fromAscii(this.state.pastedText);
    const contentHash = this.web3.sha3(cubeBytes);
    const contractInstance = this.contractInstance;
    const web3 = this.web3;

    function submitTx(gasEstimate) {
      // metamask uses accounts[0] to pass the preferred account
      contractInstance.dumpCube.sendTransaction(
        cubeBytes, 
        contentHash, 
        {
          from: web3.eth.accounts[0], 
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

    this.contractInstance.dumpCube.estimateGas(
      cubeBytes, 
      contentHash, 
      { from: this.web3.eth.accounts[0] },
      function(error, result){
        if (!error) {
          console.log('gas estimate: ' + result);
          submitTx(result);
        } else {
          console.error('not able to estimate gas. error msg: ' + error);
          return;
        }
      }
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>
          Paste content below to post to Blockbin:
        </h3>
        <textarea 
          className="inputform-textarea"
          onChange={this.handleChange}
          value={this.state.pastedText}
          rows={10}
        />
        <button className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default InputForm;
