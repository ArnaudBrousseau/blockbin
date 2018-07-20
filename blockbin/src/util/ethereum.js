// TODO: Put in config
const CONTRACT_ADDRESS = '0xc49f916164a2d47b8934d5454547cc7429ba0c1e';

/**
 * Instantiates the Blockbin contract
 * Note: `process.env` is a bit magic. It's compiled out by Webpack and gets
 * replaced with what's in `.env` or `.env.production` depending on the build
 * environment.
 */
var createBlockbinContract = function(web3) {
    const abi = JSON.parse(process.env.REACT_APP_BLOCKBIN_ABI);
    const contract = web3.eth.contract(abi);
    contract.at(CONTRACT_ADDRESS);
};

module.exports = {
    'createBlockbinContract': createBlockbinContract,
};
