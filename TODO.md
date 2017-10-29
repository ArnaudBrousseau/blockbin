# Non-technical work
- [x] Research if data is actually stored forever on the blockchain. How does this work exactly? Who stores it? _Nodes running ETH store it_. Are there deletion mechanisms? _No, unless you provide a deletion method in the contract. Even then, the data is virtually still there, it's just that you'll override pointers to it._
- [ ] Design a logo. Sizes needed: 192x192 (.png), 32x32 (.ico)

# High-level technical work
- [x] Create a basic solidity contract to store content
- [x] Write basic tests for contract
- [ ] Write extensive tests for contract
- [ ] Automate testing by integrating with TravisCI
- [ ] Tests for realz on a local test network
- [x] Write the client app (React)
- [ ] Revamp of client app
- [ ] Upload contract to the blockchain
- [x] Buy domain
- [ ] deploy client app
- [ ] Deploy HTTPS on blockbin.io
- [ ] Shield blockbin.io against DDoS? Put the domain behind Cloudflare?
- [ ] Profit

# Low-level technical work
- [x] Initialize the contract skeleton with `truffle init`
- [x] Simple "coming soon" page as UI for now
- [x] Deploy script to rsync to VPS
- [x] Nginx config to serve the coming soon page
- [x] Point DNS to server, confirm that coming soon page is up and running
- [ ] Integrate Google Analytics to see traffic trends? Might not jive well with people who don't want to be tracked but heh.
- [ ] Link icon (`<link rel="apple-touch-icon" href="icon.png">`)
