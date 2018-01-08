import React, { Component } from 'react';
import Web3 from 'web3';

import '../App.css';

const CONTRACT_ADDRESS = '0xa022cc6ff8895fd07b03c480d46f20c412716fdc';

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
      console.log('why aren\'t you using mist or metamask?!');
      // set the provider you want from Web3.providers
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    // Replace with correct ABI
    const abi = JSON.parse('[{"constant":true,"inputs":[{"name":"hash","type":"bytes32"}],"name":"readCube","outputs":[{"name":"","type":"bytes"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"}],"name":"softUndelete","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"}],"name":"empty","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"data","type":"bytes"},{"name":"hash","type":"bytes32"}],"name":"dumpCube","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"}],"name":"softDelete","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"}],"name":"forceEmpty","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]')
    const BlockbinContract = this.web3.eth.contract(abi);
    // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
    this.contractInstance = BlockbinContract.at(CONTRACT_ADDRESS);

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

    // metamask uses accounts[0] to pass the preferred account
    const txId = this.contractInstance.dumpCube.sendTransaction(
      cubeBytes, 
      contentHash, 
      {
        from: this.web3.eth.accounts[0], 
        gas: 2000000,
      },
      function(error, result){
        if(!error)
          alert('Saved!\nYour lookup hash is: ' + contentHash + '\nYour transaction id is: ' + result);
        else
          console.error(error);
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
