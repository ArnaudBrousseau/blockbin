import React, { Component } from 'react';
import { createBlockbinContract } from '../util/ethereum';


function SuccessBanner(props) {
  if (!props.successes || !props.successes.length) {
    return null;
  }
  var successItems = props.successes.map(function(success){
    return <li>{success}</li>;
  });
  return (
    <div className="success">
      <ul>{successItems}</ul>
    </div>
  );
}

function WarningBanner(props) {
  if (!props.errors || !props.errors.length) {
    return null;
  }
  var errorItems = props.errors.map(function(error){
    return <li>{error}</li>;
  });
  return (
    <div className="warning">
      <ul>{errorItems}</ul>
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
      cubeBytes: '0x',
      errors: [],
      successes: [],
    };

    if (typeof window.web3 !== 'undefined') {
      // TODO: replace this with an imported version of web3
      // e.g. import 'Web3' from 'web3'; new Web3(...)
      // For some reason webpack makes this hard?
      this.web3 = new window.Web3(window.web3.currentProvider);
      this.contractInstance = createBlockbinContract(this.web3);
    } else {
      this.setState({
        errors: [
          ...this.state.errors,
          'Persisting content to the blockchain requires the use of Metamask to fuel the transaction with some ethereum. Go to https://metamask.io/ to install it then refresh this page.'
        ]
      })
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
      this.setState({
        errors: [
          ...this.state.errors,
          'Not able to estimate gas. error msg: ' + error
        ]
      });
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
      this.setState({
        successes: [
          ...this.state.successes,
          'Saved!\nYour lookup hash is: ' + this.state.contentHash + '\nYour transaction id is: ' + result
        ]
      });
    } else {
      this.setState({
        errors: [
          ...this.state.errors,
          'Error in processing your transaction: ' + error
        ]
      });
    }
  };

  render() {
    if (this.web3 === undefined) {
    }
    const doesNotHaveWeb3 = this.web3 === undefined;
    return (
      <form onSubmit={this.handleSubmit}>
        <SuccessBanner successes={this.state.successes} />
        <WarningBanner errors={this.state.errors} />

        <h3 className="app-title app-title-bigger">
          New Cube
        </h3>
        <textarea
          className="new-cube-textarea nerdy"
          onChange={this.handleChange}
          value={this.state.content}
          rows={10}
        />

        <h4 className="cube-info nerdy faded">Length: {(this.state.cubeBytes.length-2)/2} bytes</h4>
        <h4 className="cube-info nerdy faded">Gas estimate: {this.state.estimate}</h4>
        <h4 className="cube-info nerdy faded">Hash: {this.state.contentHash}</h4>

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
