"use strict";
exports.__esModule = true;
var CryptoJS = require("crypto-js");
var Block = /** @class */ (function () {
    function Block(id, hash, previousHash, data, timestamp) {
        this.id = id;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    Block.calculateBlockHash = function (id, previousHash, data, timestamp) { return CryptoJS.SHA256(id + previousHash + data + timestamp).toString(); };
    Block.ValidateStructure = function (aBlock) {
        var checkValue = typeof aBlock.id === 'number' &&
            typeof aBlock.hash === 'string' &&
            typeof aBlock.previousHash === 'string' &&
            typeof aBlock.data === 'string' &&
            typeof aBlock.timestamp === 'number';
        return checkValue;
    };
    return Block;
}());
var genesisBlock = new Block(0, '03203123', '', 'Hello', 139292);
var blockchain = [genesisBlock];
var getBlockChain = function () {
    console.log(blockchain);
    return blockchain;
};
var getLastBlockChain = function () { return blockchain[blockchain.length - 1]; };
var getTimeStamp = function () { return Math.round(new Date().getTime() / 1000); };
var createNewBlock = function (data) {
    var lastBlock = getLastBlockChain();
    var newId = lastBlock.id + 1;
    var newTimeStamp = getTimeStamp();
    var newHash = Block.calculateBlockHash(newId, lastBlock.hash, data, newTimeStamp);
    var newBlock = new Block(newId, newHash, lastBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
var getHashForBlock = function (aBlock) {
    return Block.calculateBlockHash(aBlock.id, aBlock.previousHash, aBlock.data, aBlock.timestamp);
};
var isBlockValid = function (candidateBlock, lastBlock) {
    if (!Block.ValidateStructure(candidateBlock)) {
        return false;
    }
    else if (lastBlock.id + 1 !== candidateBlock.id) {
        return false;
    }
    else if (lastBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    return true;
};
var addBlock = function (candidateBlock) {
    if (isBlockValid(candidateBlock, getLastBlockChain())) {
        blockchain.push(candidateBlock);
    }
};
setTimeout(function () {
    createNewBlock('Goodbye');
}, 300);
setTimeout(function () {
    createNewBlock('Good luck');
}, 500);
createNewBlock('Bye-bye');
createNewBlock('Hi');
getBlockChain();
