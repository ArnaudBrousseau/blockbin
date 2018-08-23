import Web3 from 'web3';

const ETH_NETWORKS = {
  'ROPSTEN': 'ropsten',
  'MORDEN': 'morden',
  'MAINNET': 'main',
  'PRIVATE': 'private'
};

/**
 * Instantiates the Blockbin contract
 * Note: `process.env` is a bit magic. It's compiled out by Webpack and gets
 * replaced with what's in `.env` or `.env.production` depending on the build
 * environment.
 */
var createBlockbinContract = function(web3) {
    const abi = JSON.parse(process.env.REACT_APP_BLOCKBIN_ABI);
    const contract = new web3.eth.Contract(abi, process.env.REACT_APP_CONTRACT_ADDRESS);
    return contract;
};

/**
 * contractNetwork can be "main" for main network, "morden" for the morden test
 * network, "ropsten" for the ropsten test network or "private" for undetectable
 * networks.
 * contractAddress is in the form '0x...'
 */
var getEtherscanURL = function(contractAddress, contractNetwork, type) {
  var typePathParam;
  if (type === 'transaction') {
    typePathParam = 'tx';
  } else if (type === 'address') {
    typePathParam = 'address';
  } else {
    throw new Error('Unsupported type: ' + type + '. Expected "transaction" or "address"');
  }

  switch (contractNetwork) {
    case ETH_NETWORKS.ROPSTEN:
      return 'https://ropsten.etherscan.io/' + typePathParam + '/' + contractAddress;
    case ETH_NETWORKS.MAINNET:
      return 'https://etherscan.io/' + typePathParam + '/' + contractAddress;
    default:
      return '#';
  }
}

var createWeb3 = function() {
  return new Web3(
    // If Metamask is active
    Web3.givenProvider ||
    // Default to using Infura otherwise
    new Web3.providers.HttpProvider(process.env.REACT_APP_INFURA_ENDPOINT)
  );
}

export { createBlockbinContract, createWeb3, getEtherscanURL };
