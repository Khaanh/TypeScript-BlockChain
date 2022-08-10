import * as CryptoJS from 'crypto-js';

class Block {
  public id: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash =
    (id: number, previousHash: string, data: string, timestamp: number)
    : string => CryptoJS.SHA256(id + previousHash + data + timestamp).toString();

  static ValidateStructure = (aBlock): boolean => {
    let checkValue = typeof aBlock.id === 'number' &&
      typeof aBlock.hash === 'string' &&
      typeof aBlock.previousHash === 'string' &&
      typeof aBlock.data === 'string' &&
      typeof aBlock.timestamp === 'number';

    return checkValue;
  }
    
  constructor(id: number, hash: string, previousHash: string, data: string, timestamp: number) {
    this.id = id;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  } 
}

const genesisBlock = new Block(0, '03203123', '', 'Hello', 139292);

let blockchain: [Block] = [genesisBlock];

const getBlockChain = (): [Block] => {
  console.log(blockchain);
  return blockchain
};
const getLastBlockChain = (): Block => blockchain[blockchain.length - 1];
const getTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data: string): Block => {
  const lastBlock: Block = getLastBlockChain();
  const newId: number = lastBlock.id + 1;
  const newTimeStamp: number = getTimeStamp();
  const newHash: string = Block.calculateBlockHash(newId, lastBlock.hash, data, newTimeStamp);
  const newBlock: Block = new Block(newId, newHash, lastBlock.hash, data, newTimeStamp);

  addBlock(newBlock);
  return newBlock;
}

const getHashForBlock = (aBlock: Block): string => {
  return Block.calculateBlockHash(aBlock.id, aBlock.previousHash, aBlock.data, aBlock.timestamp)
}
const isBlockValid = (candidateBlock: Block, lastBlock: Block): boolean => {
  if (!Block.ValidateStructure(candidateBlock)) {
    return false
  } else if (lastBlock.id + 1 !== candidateBlock.id) {
    return false;
  } else if (lastBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  }
  return true;
}

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLastBlockChain())) {
    blockchain.push(candidateBlock);
  }
};

setTimeout(() => {
  createNewBlock('Goodbye');
}, 300)

setTimeout(() => {
  createNewBlock('Good luck');
}, 500)
createNewBlock('Bye-bye');
createNewBlock('Hi');
getBlockChain();