var ConvertLib = artifacts.require("./ConvertLib.sol");
var Blockbin = artifacts.require("./Blockbin.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, Blockbin);
  deployer.deploy(Blockbin);
};
