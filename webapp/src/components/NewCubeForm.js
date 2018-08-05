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

class NewCubeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      estimate: 'n/a',
      contentHash: 'n/a',
      cubeBytes: '0x'
    };

    if (typeof window.web3 !== 'undefined') {
      // TODO: replace this with an imported version of web3
      // e.g. import 'Web3' from 'web3'; new Web3(...)
      // For some reason webpack makes this hard?
      this.web3 = new window.Web3(window.web3.currentProvider);
      this.contractInstance = createBlockbinContract(this.web3);
    } else {
      this.web3 = undefined;
      this.contractInstance = undefined;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const content = event.target.value;
    // TODO: what about emojis or other types of content?
    // I don't think we should assume `this.state.content` to be ascii in the
    // first place...
    const cubeBytes = this.web3.fromAscii(content);
    const contentHash = this.web3.sha3(cubeBytes);

    this.setState({
        content: content,
        cubeBytes: cubeBytes,
        contentHash: contentHash
    })

    this.contractInstance.dumpCube.estimateGas(
      this.state.cubeBytes,
      this.state.contentHash,
      // TODO: seems like this has a lot of assumptions baked in
      // why would we grab the first available account?
      { from: this.web3.eth.accounts[0] },
      this.estimateGasCb.bind(this)
    );
  }

  estimateGasCb(error, result) {
    if (!error) {
      this.setState({estimate: result});
    } else {
      console.error('not able to estimate gas. error msg: ' + error);
      return;
    }
  };

  handleSubmit(event) {
    event.preventDefault();

    this.contractInstance.dumpCube.sendTransaction(
      this.state.cubeBytes,
      this.state.contentHash,
      {
        // Metamask uses accounts[0] to pass the preferred account
        from: this.web3.eth.accounts[0],
        gas: this.state.estimate,
      },
      this.sendTransactionCb.bind(this)
    );
  }

  sendTransactionCb(error, result) {
    if (!error) {
      alert('Saved!\nYour lookup hash is: ' + this.state.contentHash + '\nYour transaction id is: ' + result);
    } else {
      console.error(error);
      alert('Error in processing your transaction');
    }
  };

  render() {
    const doesNotHaveWeb3 = this.web3 === undefined;
    return (
      <form onSubmit={this.handleSubmit}>
        <h3 className="new-cube-title">
          New Cube
        </h3>
        <textarea
          className="new-cube-textarea nerdy"
          onChange={this.handleChange}
          value={this.state.content}
          rows={10}
        />

        <WarningBanner warn={doesNotHaveWeb3} />

        <h4 className="cube-info nerdy">Length: {(this.state.cubeBytes.length-2)/2} bytes</h4>
        <h4 className="cube-info nerdy">Gas estimate: {this.state.estimate}</h4>
        <h4 className="cube-info nerdy">SHA3: {this.state.contentHash.substr(0,10) + '...'}</h4>

        <button
          className="submit-button"
          disabled={doesNotHaveWeb3 ? 'disabled' : ''}
        >
          Mine to blockchain
        </button>
      </form>
    );
  }
}

export default NewCubeForm;
