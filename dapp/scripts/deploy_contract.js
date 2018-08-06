// This script deploys the contract and outputs the address
module.exports = function(callback) {
  const artifacts = require('../build/contracts/Blockbin.json');
  const contract = require('truffle-contract');
  let Blockbin = contract(artifacts);
  Blockbin.setProvider(web3.currentProvider);

  Blockbin.deployed().then(function(instance) {
    console.log('success!');
    console.log('====Updated webapp/.env');
    console.log("REACT_APP_CONTRACT_ADDRESS='" + instance.address + "'");
    console.log("REACT_APP_BLOCKBIN_ABI='" + JSON.stringify(artifacts.abi) + "'");
    console.log('=======================');
  });
  callback();
}
