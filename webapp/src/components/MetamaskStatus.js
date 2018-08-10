import React, { Component } from 'react';
import { getContractURL } from '../util/ethereum';
import Web3 from 'web3';


class MetamaskStatus extends Component {
  constructor(props) {
    super(props);

    var contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    var contractNetwork = process.env.REACT_APP_CONTRACT_NETWORK;
    var contractURL = getContractURL(contractAddress, contractNetwork);

    this.state = {
      metamaskNetwork: 'Fetching...',
      contractAddress: contractAddress,
      contractNetwork: contractNetwork,
      contractURL: contractURL,
      error: false
    };
  }

  getNetworkName() {
    if (Web3.givenProvider) {
      var web3 = new Web3(Web3.givenProvider);
      web3.eth.net.getNetworkType(function(err, name) {
        this.setState({
          'metamaskNetwork': name
        });
      }.bind(this));
    } else {
      this.setState({
        'error': true
      });
    }
  }

  componentDidMount() {
    this.getNetworkName();
  };

  render() {
    if (this.state.error) {
      return (
        <p className="metamask-status error">
          No Ethereum provider detected. Have you installed <a href="https://metamask.io/">Metamask?</a>
        </p>
      )
    } else {
      return (
        <p className="metamask-status">
          Smart contract deployed at <a href={this.state.contractURL} target="_blank">{this.state.contractAddress.substr(0,10)}</a> (<strong>{this.state.contractNetwork}</strong>) —
          Metamask connected to <strong>{this.state.metamaskNetwork}</strong>.
        </p>
      );
    }
  }
};

export default MetamaskStatus;
