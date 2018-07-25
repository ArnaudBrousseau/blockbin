// This script deploys the contract and outputs the address
module.exports = function(callback) {
  const artifacts = require('../build/contracts/Blockbin.json');
  const contract = require('truffle-contract');
  let Blockbin = contract(artifacts);
  Blockbin.setProvider(web3.currentProvider);

  Blockbin.deployed().then(function(instance) {
      console.log('Success! Blockbin has been deployed at: ' + instance.address); });
  callback();
}
