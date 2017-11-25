# Blockbin ![Build Status](https://travis-ci.org/ArnaudBrousseau/blockbin.svg?branch=master)

A distributed Pastebin hosted on the Ethereum blockchain.


## Hacking locally

1. Run `testrpc` to get a test network
2. `truffle migrate` to compile and deploy to test network
3. `truffle console` will let you interact with the deployed
   contract. For example:

        truffle(development)> bb = Blockbin.deployed()
        truffle(development)> bb.then(function(instance) { instance.dumpCube('oh hai there');})

## Testing

After starting up the test network, run `truffle test`

## Deploying

Run `./bin/deploy`

## Contributing

See `TODO.md` file for requirements and things left to do.
