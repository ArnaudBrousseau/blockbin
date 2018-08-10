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
var getContractURL = function(contractAddress, contractNetwork) {
  switch (contractNetwork) {
    case 'ropsten':
      return 'https://ropsten.etherscan.io/address/' + contractAddress;
    case 'main':
      return 'https://etherscan.io/address/' + contractAddress;
    default:
      return '#';
  }
}

export { createBlockbinContract, getContractURL };
