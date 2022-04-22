import { SHA256 } from 'crypto-js';
import JSEncrypt from 'jsencrypt';

export type Wallet = {
  privateKey: string;
  publicKey: string;
  address: string;
};

const crypt = new JSEncrypt({ default_key_size: '512'});
crypt.getKey();
const privateKey1 =  crypt.getPrivateKey().replace(/(\r\n|\n|\r)/gm, '');
const publicKey1 = crypt.getPublicKey().replace(/(\r\n|\n|\r)/gm, '');
const address1 = SHA256(publicKey1).toString();
crypt.getKey();
const privateKey2 =  crypt.getPrivateKey().replace(/(\r\n|\n|\r)/gm, '');
const publicKey2 = crypt.getPublicKey().replace(/(\r\n|\n|\r)/gm, '');
const address2 = SHA256(publicKey2).toString();

export const wallets = [
  {
    privateKey: privateKey1,
    publicKey: publicKey1,
    address: address1,
  },
  {
    privateKey: privateKey2,
    publicKey: publicKey2,
    address: address2,
  }
] as Wallet[];
