# Blockbin ![Build Status](https://travis-ci.org/ArnaudBrousseau/blockbin.svg?branch=master)

* *Blockbin*: a website to let anybody store content in the Ethereum blockchain. It's a Paste*bin*-like app hosted on the Ethereum *block*chain. Hence "blockbin".
* *Cube*: (also refered to as "qb") a blob stored via Blockbin on the Ethereum blockchain

---

## Hacking locally

### Requirements

Before you start, make sure you have the following:

* npm: tested with `npm` version 5.10.0
* node: tested with v8.6.0
* platform: tested on MacOSX High Sierra, but as long as you can install
  node/npm on your platform you should be set

### Smart Contract Development

To install the dapp dependencies:

    $ npm install --prefix=dapp

To run your own blockchain locally (and more importantly: to setup an account with some ether to be able to perform transactions):

* Download [Metamask](https://metamask.io/)
* (one-time only): `cd dapp && node_modules/.bin/testrpc`, then create a Metamask account while pointing at this network ("Localhost 8545").
* (one-time only): in Metamask, click on "..." next to your account, then "Export Private Key". Save it somewhere!
* (one-time only): shut down your private network
* Run `npm run ethereum --prefix=dapp`. This should prompt you for your private key and will start the network with your account provisioned with 300 ETH, enough to perform loads of transactions!

To compile and deploy the Blockbin contract onto your local blockchain:

    $ npm run deploy --prefix=dapp

To interact and test some contract functions manually:

    $ cd dapp
    $ ./node_modules/.bin/truffle console
    truffle(development)> bb = Blockbin.deployed()
    truffle(development)> bb.then(function(instance) { instance.dumpCube('oh hai there');})

### Webapp development

The webapp code lives in `blockbin/`. We use React, so any general React tips
should apply here as well.

To install the webapp dependencies:

    $ npm install --prefix=webapp

To run a local version of the webapp:

    $ npm start --prefix=webapp

To debug problems with the production bundle:

    $ npm run-script build --prefix=webapp
    $ cd webapp
    $ ./node_modules/.bin/serve -s build

---

## Testing

To test the dapp:

    $ npm run ethereum --prefix=dapp
    # In another shell:
    $ npm run test --prefix=dapp

To test the webapp:

    $ npm run test --prefix=webapp

---

## Deploying

### Webapp

Run `./bin/deploy-webapp`

### Smart contract

TODO

---

## Contributing

See `TODO.md` file for requirements and things left to do.
