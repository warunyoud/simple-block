import { SHA256 } from 'crypto-js';

export type Wallet = {
  privateKey: string;
  publicKey: string;
  address: string;
};

const privateKey1 = '-----BEGIN RSA PRIVATE KEY-----MIIBOQIBAAJAYmEVJA8EBG20sCjF0VqZUL3d8TTPmg4Fhihspj/KtoWPUHQRhjtZEiqV4HQ5aaw9oL5fb9UXiHr9DGMY0dkKTQIDAQABAkAe1UaG8p3TtX535494OejrQVaaDm8yXUql7W1//WZPJdD6OtaDn+v9dDWFfG+okXuxT2nau4gxYatb9zHuqCaRAiEArzFMoFAQYegZJqcWWkebfSNXmzEu8OUvuN9nZsfUhZMCIQCPwa4jaKO3bxBAMNE4KOGWOo71kskDIWa6ApNT14ocnwIgMkWdTWtsKAwoG3Va7rEZp0EbBIeKhsndddl1nIK/M00CIQCCCl4QQdP3V0yIBKD+AF0wnIA9vS6A2nImybWkHlIdWQIgG+r5JmhrWEf1o1Aa6Pp4kKtFV+N5VPDLuYiy5vTEcBE=-----END RSA PRIVATE KEY-----';
const publicKey1 = '-----BEGIN PUBLIC KEY-----MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAYmEVJA8EBG20sCjF0VqZUL3d8TTPmg4Fhihspj/KtoWPUHQRhjtZEiqV4HQ5aaw9oL5fb9UXiHr9DGMY0dkKTQIDAQAB-----END PUBLIC KEY-----';
const address1 = SHA256(publicKey1).toString();

const privateKey2 = '-----BEGIN RSA PRIVATE KEY-----MIIBOQIBAAJAXUr1d8glzevOooNfSQn8AQFXmQ47qsPbpjgWGXuxxvi1g3ZR+UHFhBEifT8biv9hGzSbafhoBzGI70oDauzPMwIDAQABAkAzDSzsYktFty95QPioiF0t06Uy7VX7aXhOKkz1nvm2zoGpzSYtlxeBzMINLr1fGyxzyKfoALP3KQyMVgygb7JpAiEAtDiSz4oMvIFxyw31gidwHe90SVyYIb33Y7+Uh9GfYEUCIQCEhTlaxNQwg6UWwynqYYHNgP0XQ4tKP67i/10/MPeVFwIgZ1P0YIevC7lPy/MB6xC/iHpM+u7azqXDHG6wMzrtnN0CIGz5MMTXfrW2S5eAPYOjUx4up/DtdilEXQgFfiRsm+tZAiEAopauzlc6NQEp/4FJq3ug/1EOaUjstiIDCR9VYpB+QrE=-----END RSA PRIVATE KEY-----';
const publicKey2 = '-----BEGIN PUBLIC KEY-----MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAXUr1d8glzevOooNfSQn8AQFXmQ47qsPbpjgWGXuxxvi1g3ZR+UHFhBEifT8biv9hGzSbafhoBzGI70oDauzPMwIDAQAB-----END PUBLIC KEY-----';
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
