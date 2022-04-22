import { SHA256 } from 'crypto-js';

import Transaction from './Transaction';

class Block {
  public prevHash?: string;
  public transactions: Transaction[];
  public timestamp: number;

  constructor(prevHash: string | undefined, transactions: Transaction[], timestamp = Date.now()) {
    this.prevHash = prevHash;
    this.transactions = transactions;
    this.timestamp = timestamp;
  }

  public getHash() {
    const json = JSON.stringify(this);
    return SHA256(json).toString();
  }

  public verifyHash(hash: string) {
    const json = JSON.stringify(this);
    return hash === SHA256(json).toString();
  }
}

export default Block;
