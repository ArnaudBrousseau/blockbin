var Blockbin = artifacts.require("./Blockbin.sol");

contract('Blockbin', function(accounts) {

    it("should be able to accept named cubes", async function() {
        let blockbin = await Blockbin.deployed();
        await blockbin.dumpCube("oh hai", "myqb");
        let content = await blockbin.readCube("myqb");
        assert.equal("oh hai", web3.toAscii(content));
    });

    it("should refuse to override a given cube", async function() {
        let blockbin = await Blockbin.deployed();
        await blockbin.dumpCube("oh hai", "myqb");
        await blockbin.dumpCube("oh hai there", "myqb");
        let content = await blockbin.readCube("myqb");
        assert.equal("oh hai", web3.toAscii(content));
    });
});
