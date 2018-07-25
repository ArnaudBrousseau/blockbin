var Blockbin = artifacts.require("./Blockbin.sol");

contract('Blockbin', function(accounts) {

    it("should be able to accept named cubes", async function() {
        const blockbin = await Blockbin.deployed();
        await blockbin.dumpCube("oh hai", "myqb");
        const content = await blockbin.readCube("myqb");
        assert.equal("oh hai", web3.toAscii(content));
    });

    it("should refuse to override a given cube", async function() {
        const blockbin = await Blockbin.deployed();
        await blockbin.dumpCube("oh hai", "myqb");
        await blockbin.dumpCube("oh hai there", "myqb");
        const content = await blockbin.readCube("myqb");
        assert.equal("oh hai", web3.toAscii(content));
    });

    it("should return empty bytes when reading emptied cube", async function() {
        const blockbin = await Blockbin.deployed();
        await blockbin.dumpCube("oh hai", "myqb");

        // Make sure data stored properly
        const content = await blockbin.readCube("myqb");
        assert.equal("oh hai", web3.toAscii(content));

        // Make sure data is removed
        await blockbin.empty("myqb");
        const contentAfterEmpty = await blockbin.readCube("myqb");
        assert.equal("", web3.toAscii(contentAfterEmpty));
    });

    it("should return empty bytes when reading soft-deleted cube", async function() {
        const blockbin = await Blockbin.deployed();
        await blockbin.dumpCube("oh hai", "myqb");

        // Make sure data stored properly
        const content = await blockbin.readCube("myqb");
        assert.equal("oh hai", web3.toAscii(content));

        // Make sure data is removed
        await blockbin.softDelete("myqb");
        const contentAfterSoftDelete = await blockbin.readCube("myqb");
        assert.equal("", web3.toAscii(contentAfterSoftDelete));

        // Make sure data is returned
        await blockbin.softUndelete("myqb");
        const contentAfterSoftUndelete = await blockbin.readCube("myqb");
        assert.equal("oh hai", web3.toAscii(contentAfterSoftUndelete));
    });
});
