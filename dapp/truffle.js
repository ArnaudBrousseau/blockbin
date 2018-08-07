var HDWalletProvider = require("truffle-hdwallet-provider");
var dotenv = require('dotenv');

/**
 * This assumes that you have a `.env` file with the following:
 * METAMASK_DEN_MNEMONIC='<your metamask den mnemonic phrase>'
 * INFURA_ACCESS_TOKEN='<your infura access token>'
 */
dotenv.config()

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          process.env.METAMASK_DEN_MNEMONIC,
          "https://ropsten.infura.io/" + process.env.INFURA_ACCESS_TOKEN,
        )
      },
      network_id: "3"
    },
    mainnet: {
      provider: undefined, // TODO
      network_id: "1"
    }
  }
};
