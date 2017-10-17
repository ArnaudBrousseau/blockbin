# Blockbin

A distributed Pastebin hosted on the Ethereum blockchain.

## Hacking locally

1. Run `testrpc` to get a test network
2. `truffle compile`
3. `truffle migrate`
4. `truffle console` will let you interact with the deployed
   contract. For example:

        truffle(development)> bb = Blockbin.deployed()
        truffle(development)> bb.then(function(instance) { instance.dumpCube('oh hai there');})

## Testing

Run `truffle test`

## Deploying

Run `./bin/deploy`

## Contributing

See `TODO.md` file for requirements and things left to do.
