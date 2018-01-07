import React, { Component } from 'react';
import Web3 from 'web3';

import '../App.css';

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pastedText: 'What would you like to put on the ~blockchain~?',
    };
    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    // Replace with correct ABI
    const abi = JSON.parse('[{"constant":true,"inputs":[{"name":"hash","type":"bytes32"}],"name":"readCube","outputs":[{"name":"","type":"bytes"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"}],"name":"softUndelete","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"}],"name":"empty","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"data","type":"bytes"},{"name":"hash","type":"bytes32"}],"name":"dumpCube","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"}],"name":"softDelete","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"}],"name":"forceEmpty","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]')
    const BlockbinContract = this.web3.eth.contract(abi);
    // In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
    this.contractInstance = BlockbinContract.at('0xa975735b292c2a95e760250148b0aba8dd59d24c');

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ pastedText: event.target.value })
  }

  handleSubmit(event) {
    console.log('hey what up');
    alert('A text was submitted: ' + this.state.pastedText);
    event.preventDefault();
    const cubeBytes = this.web3.fromAscii(this.state.pastedText);
    const contentHash = this.web3.sha3(cubeBytes);

    const txId = this.contractInstance.dumpCube(cubeBytes, contentHash, { from: this.web3.eth.accounts[0], gas: 4000000 })
    
    alert('Saved! \nYour transaction id is: ' + txId + '\nYour content hash is: ' + contentHash);
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
