import { SHA256 } from 'crypto-js';
import JSEncrypt from 'jsencrypt';

const sha256 = (str: string) => SHA256(str).toString();

class Transaction {
  senderAddress: string;
  senderPublicKey: string;
  receiverAddress: string;
  amount: number;
  signature: string;

  constructor(senderPublicKey: string, senderAddress: string, receiverAddress: string, amount: number, signature: string) {
    this.senderPublicKey = senderPublicKey;
    this.senderAddress = senderAddress;
    this.receiverAddress = receiverAddress;
    this.amount = amount;
    this.signature = signature;
  }

  private static getPayload(senderAddress: string, receiverAddress: string, amount: number) {
    return JSON.stringify({
      senderAddress,
      receiverAddress,
      amount,
    });
  }

  public static createTransaction(senderPublicKey: string, senderAddress: string, receiverAddress: string, amount: number, senderPrivateKey: string) {
    const json = Transaction.getPayload(senderAddress, receiverAddress, amount);
    const sign = new JSEncrypt();
    sign.setPrivateKey(senderPrivateKey);
    const signature = sign.sign(json, sha256, 'sha256');
    if (!signature)
      throw new Error();
    return new Transaction(senderPublicKey, senderAddress, receiverAddress, amount, signature);
  }

  public verifyTransaction() {
    const json = Transaction.getPayload(this.senderAddress, this.receiverAddress, this.amount);
    var verify = new JSEncrypt();
    verify.setPublicKey(this.senderPublicKey);
    const hash = sha256(this.senderPublicKey);
    console.log(this.senderPublicKey, hash, this.senderAddress);
    return verify.verify(json, this.signature, sha256) && hash === this.senderAddress;
  }
}

export default Transaction;
