var Blockbin = artifacts.require("./Blockbin.sol");

// TODO(arnaud): is there a better way or a lib I can use for this?
var toAscii = function(hex) {
    var str = '',
        i = 0,
        l = hex.length;
    if (hex.substring(0, 2) === '0x') {
        i = 2;
    }
    for (; i < l; i+=2) {
        var code = parseInt(hex.substr(i, 2), 16);
        if (code === 0) continue; // this is added
        str += String.fromCharCode(code);
    }
    return str;
};

contract('Blockbin', function(accounts) {

    it("should be able to accept named cubes", async function() {
        let blockbin = await Blockbin.deployed();
        await blockbin.dumpCube("oh hai", "myqb");
        let content = await blockbin.readCube("myqb");
        assert.equal("oh hai", toAscii(content));
    });

    it("should refuse to override a given cube", async function() {
        let blockbin = await Blockbin.deployed();
        await blockbin.dumpCube("oh hai", "myqb");
        await blockbin.dumpCube("oh hai there", "myqb");
        let content = await blockbin.readCube("myqb");
        assert.equal("oh hai", toAscii(content));
    });
});
