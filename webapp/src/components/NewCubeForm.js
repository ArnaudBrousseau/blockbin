import React, { Component } from 'react';
import Web3 from 'web3';
import {BigNumber} from 'bignumber.js';
import { createBlockbinContract, createWeb3 } from '../util/ethereum';

const SUPPORTED_CODECS = {
  'ASCII': 'ascii'
};

const TWO_GWEI_IN_WEI = '2000000000';
const DEFAULT_ETH_PRICE = '500';
const DEFAULT_ESTIMATE = '21000';

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
      estimate: DEFAULT_ESTIMATE,
      gasPrice: TWO_GWEI_IN_WEI,
      ethPrice: DEFAULT_ETH_PRICE,
      contentHash: 'n/a',
      cubeBytes: '0x',
      errors: [],
      successes: [],
    };

    this.web3 = createWeb3();
    this.contractInstance = createBlockbinContract(this.web3);
    this.hasMetamask = this.web3.currentProvider.constructor.name === 'MetamaskInpageProvider';
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

  getGasPriceCb(error, result) {
    if (!error) {
      this.setState({gasPrice: result});
    } else {
      this.setState({
        errors: [
          ...this.state.errors,
          'Not able to estimate gasPrice! error msg: ' + error
        ]
      });
    }
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
          gasPrice: this.state.gasPrice,
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

  componentDidMount() {
    if (this.state.content.length && this.web3) {
      this.web3.eth.getGasPrice(this.getGasPriceCb.bind(this));
      fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            ethPrice: responseJson[0]['price_usd']
          });
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            errors: [
              ...this.state.errors,
              'Error in processing your transaction: ' + error
            ]
          });
        });
    }
  }

  render() {
    var cubeInfo;
    if (this.state.content.length && this.hasMetamask) {
      var gasLimit = new BigNumber(this.state.estimate).multipliedBy(2);
      var totalEstimateETH = new BigNumber(
        this.web3.utils.fromWei(
          new BigNumber(this.state.gasPrice).multipliedBy(gasLimit).toString(),
          'gwei'
         )
      );
      var totalEstimateUSD = new BigNumber(
        new BigNumber(
          this.web3.utils.fromWei(
            new BigNumber(this.state.gasPrice).multipliedBy(gasLimit).toString(),
            'ether'
          )
        ) * new BigNumber(this.state.ethPrice)
      );

      cubeInfo = <div>
        <h4 className="cube-info nerdy faded">Hash: {this.state.contentHash}</h4>
        <h4 className="cube-info nerdy faded">Length: {(this.state.cubeBytes.length-2)/2} bytes</h4>
        <h4 className="cube-info nerdy faded">Gas limit: {gasLimit.toFormat()} (twice the estimate of {this.state.estimate})</h4>
        <h4 className="cube-info nerdy faded">Gas price: {Web3.utils.fromWei(this.state.gasPrice, 'gwei')} Gwei</h4>
        <h4 className="cube-info nerdy faded">Total: {totalEstimateETH.precision(6).toFormat()} ETH (approx. {totalEstimateUSD.precision(6).toFormat()} USD)</h4>
        <button
          className="submit-button"
        >
          Mine to blockchain
        </button>
      </div>
    } else {
      cubeInfo = null
    }

    var textarea;
    if (this.hasMetamask) {
      textarea = <textarea
          className="new-cube-textarea nerdy"
          onChange={this.handleChange}
          value={this.state.content}
          rows={10}
        />
    } else {
      textarea = <div className="cube-display-error">
        Persisting content to the blockchain requires the use of Metamask to fuel the transaction with some ethereum. Go to <a href="https://metamask.io/">Metamask.io</a> to install it then refresh this page.
      </div>
    }


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
        {textarea}
        {cubeInfo}
      </form>
    );
  }
}

export default NewCubeForm;
