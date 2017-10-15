pragma solidity ^0.4.4;

contract Blockbin {

    // TODO: switch to governance-style deletion instead of
    // monarchy-style with an array of admins.
    address BlockbinAdmin;

    // TODO: do we need other fields?
    struct Cube {
        bytes32 hash;
        address owner;
        bytes data;
    }

    // Main Storage structure for Cubes
    mapping (bytes32 => Cube) allBlockbins;


    modifier onlyAdmin() {
        if (msg.sender != BlockbinAdmin) {
            revert();
        }
        // Do not forget the "_;"! It will be replaced by the actual function
        // body when the modifier is used.
        _;
    }

    function empty(bytes32 hash) returns (bool success) {
        Cube storage cube = allBlockbins[hash];
        if (msg.sender != cube.owner) {
            revert();
        }

        delete allBlockbins[hash];
        return true;
    }

    function forceEmpty (bytes32 hash) onlyAdmin returns (bool success) {
        delete allBlockbins[hash];
        return true;
    }

    function dumpCube(bytes data) returns (bool success) {
        // Generate a hash
        uint256 blockNumber;
        bytes32 blockHash;
        blockNumber = block.number;
        blockHash = block.blockhash(blockNumber);

        // Store new cube
        allBlockbins[blockHash] = Cube({
            hash: blockHash,
            owner: msg.sender,
            data: data
        });

        return true;
    }

    function readCube(bytes32 hash) constant returns (bytes) {
        return allBlockbins[hash].data;
    }
}
