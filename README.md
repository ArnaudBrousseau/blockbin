# Blockbin

A distributed Pastebin hosted on the Ethereum blockchain

# Requirements

## Home page
* Homepage contains a textarea and a button to submit
* As you type/paste content into the main textarea, an estimate of cost in USD is displayed
* When the submit button is pressed, a transaction is issued via Metamask to
commit the content to the blockhain in one or several transactions
* Optionally, a blockbin can be encrypted (additional checkbox on the homepage)

## Display page
* This page displays the contents of a previously saved blockbin.
* Nice-to-have: syntax highlighting

## Edit functionality
* Just add a new blockbin

## Delete functionality
There is no such thing as deletion. Your blockbin will stick around forever. That's RIGHT.


# TODOs

- [ ] Figure out if data is actually stored forever? By Whom?
- [ ] Base solidity contract
- [ ] Write tests for contract
- [ ] Tests for realz on our test network
- [ ] Write the client app (React)
- [ ] Upload contract to the blockchain
- [ ] Buy domain name and deploy client app
- [ ] Profit
