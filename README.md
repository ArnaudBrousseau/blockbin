# Blockbin ![Build Status](https://travis-ci.org/ArnaudBrousseau/blockbin.svg?branch=master)

* *Blockbin*: a distributed, Paste*bin*-like app hosted on the Ethereum *block*chain. Hence "blockbin".
* *Cube*: a blob stored via Blockbin on the Ethereum blockchain

---

## Hacking locally

### Requirements

Before you start, make sure you have the following:

* npm: tested with `npm` version 5.10.0
* node: tested with v8.6.0
* platform: tested on MacOSX High Sierra, but as long as you can install
  node/npm on your platform you should be set
* Install the project's dependencies with `npm install`

### Smart Contract Development

To run your own blockchain locally:

    $ ./node_modules/.bin/testrpc

To compile and deploy the Blockbin contract onto your local blockchain:

    $ ./node_modules/.bin/truffle migrate

To interact and test some contract functions manually:

    $ ./node_modules/.bin/truffle console
    truffle(development)> bb = Blockbin.deployed()
    truffle(development)> bb.then(function(instance) { instance.dumpCube('oh hai there');})

### Webapp development

The webapp code lives in `blockbin/`. We use React, so any general React tips
should apply here as well.

To install the webapp dependencies:

    $ cd blockbin
    $ npm install

To run a local version of the webapp:

    $ npm start

To debug problems with the production bundle:

    $ npm run-script build
    $ ./node_modules/.bin/serve -s build

---

## Testing

First, run a local blockchain:

    $ ./node_modules/.bin/testrpc

Then:

    $ ./node_modules/.bin/truffle test

---

## Deploying

### Webapp

Run `./bin/deploy`

### Smart contract

TODO

---

## Contributing

See `TODO.md` file for requirements and things left to do.
