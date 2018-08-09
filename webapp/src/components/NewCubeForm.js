import React, { Component } from 'react';
import Web3 from 'web3';
import { createBlockbinContract } from '../util/ethereum';

const SUPPORTED_CODECS = {
  'ASCII': 'ascii'
};

function SuccessBanner(props) {
  if (!props.successes || !props.successes.length) {
    return null;
  }
  var successItems = props.successes.map(function(success, index){
    return <li key={index} dangerouslySetInnerHTML={{ __html: success }}></li>;
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
  var errorItems = props.errors.map(function(error, index){
    return <li key={index} dangerouslySetInnerHTML={{ __html: error }}></li>;
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
      codec: SUPPORTED_CODECS.ASCII,
      estimate: 'n/a',
      contentHash: 'n/a',
      cubeBytes: '0x',
      errors: [],
      successes: [],
    };

    if (Web3.givenProvider !== 'undefined') {
      this.web3 = new Web3(Web3.givenProvider);
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

  encode(content, codec) {
    if (codec === SUPPORTED_CODECS.ASCII) {
      return Web3.utils.asciiToHex(content);
    } else {
      throw new Error('Unsupported codec: ' + codec);
    }
  };

  handleChange(event) {
    const content = event.target.value;
    const cubeBytes = this.encode(content, this.state.codec)
    const contentHash = Web3.utils.sha3(cubeBytes);

    this.setState({
        content: content,
        cubeBytes: cubeBytes,
        contentHash: contentHash
    })

    this.contractInstance.methods.dumpCube(cubeBytes, contentHash).estimateGas(
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

    this.web3.eth.getAccounts().then(function(accounts) {
      this.contractInstance.methods.dumpCube(
        this.state.cubeBytes,
        this.state.contentHash
      ).send(
        {
          // Metamask uses accounts[0] to pass the preferred account
          from: accounts[0],
          gas: this.state.estimate,
        },
        this.sendTransactionCb.bind(this)
      );
    }.bind(this)).catch(function(e) {
      alert('Error when getting Metamask accounts: ' + e.toString());
    });
  }

  sendTransactionCb(error, result) {
    if (!error) {
      this.setState({
        successes: [
          ...this.state.successes,
          'Saved!<br/><hr/>Cube hash: ' + this.state.contentHash + '<br/>TxID: ' + result + '<br/><strong><a href="/cube/' + this.state.contentHash + '">Cube Permalink</a></strong>'
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
          <div className="codec-select">
              <label htmlFor="codec">Encoding</label>
              <select id="codec">
                <option value="ascii">ASCII</option>
              </select>
          </div>
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
