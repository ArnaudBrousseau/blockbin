# Blockbin ![Build Status](https://travis-ci.org/ArnaudBrousseau/blockbin.svg?branch=master)

* *Blockbin*: a distributed, Paste*bin*-like app hosted on the Ethereum *block*chain. Hence "blockbin".
* *Cube*: a blob stored via Blockbin on the Ethereum blockchain

## Hacking locally

### Requirements

* npm: tested with `npm` version 5.6.0
* node: tested with v8.6.0
* platform: tested on MacOSX High Sierra, but as long as you can install
  node/npm on your platform you should be set

### Smart Contract Development
1. Run `testrpc` to get a test network
2. `truffle migrate` to compile and deploy the contract to your test network
3. `truffle console` will let you interact with the deployed
   contract. For example:

        truffle(development)> bb = Blockbin.deployed()
        truffle(development)> bb.then(function(instance) { instance.dumpCube('oh hai there');})

### Webapp development
Blockbin is built with React. TODO: instructions to run it.

## Testing

After starting up the test network, run `truffle test`

## Deploying

### Webapp

Run `./bin/deploy`

### Smart contract

TODO

## Contributing

See `TODO.md` file for requirements and things left to do.
