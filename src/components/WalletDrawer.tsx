import React, { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import {
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Text,
  Tooltip,
  useClipboard,
  Input,
} from '@chakra-ui/react';
import { SHA256 } from 'crypto-js';
import JSEncrypt from 'jsencrypt';

import { Wallet, wallets as defaultWallets } from '../constants/wallets';

type WalletDataProps = {
  label: string;
  data: string;
  isBottom?: boolean;
  isTop?: boolean;
};

const WalletData: React.FC<WalletDataProps> = (props) => {
  const { data, label, isBottom, isTop } = props;
  const { onCopy } = useClipboard(data)
  return (
    <Tooltip label='click to copy'>
      <Button
        borderWidth={1}
        borderBottomWidth={isBottom? 1 : 0} 
        borderTopRadius={isTop ? 8 : 0}
        borderBottomRadius={isBottom ? 8 : 0}
        onClick={onCopy}
        isFullWidth
      >
        <Text 
          fontWeight='semibold'
          minW='200px' 
          textAlign='left'
        >
          {label}
        </Text>
        <Text 
          fontWeight='light'
          isTruncated
        >
          {data}
        </Text>
      </Button>
    </Tooltip>
  );
};

type WalletDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const WalletDrawer: React.FC<WalletDrawerProps> = (props) => {
  const { onClose, isOpen } = props;

  const [wallets, setWallets] = useState<Wallet[]>(defaultWallets);
  const [address, setAddress] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  useEffect(() => {
    generateKeys();
  }, [])

  const submitWallet = () => {
    const clonedWallets = cloneDeep(wallets);
    clonedWallets.push({
      publicKey,
      privateKey,
      address,
    });
    setWallets(clonedWallets);
    generateKeys();
  };

  const generateKeys = () => {
    const crypt = new JSEncrypt({ default_key_size: '512'});
    crypt.getKey();
    // There are currently some issues with newline. This is kind of a hack
    const publicKey = crypt.getPublicKey().replace(/(\r\n|\n|\r)/gm, '');
    const privateKey = crypt.getPrivateKey().replace(/(\r\n|\n|\r)/gm, '');
    setAddress(SHA256(publicKey).toString());
    setPublicKey(publicKey);
    setPrivateKey(privateKey);
  };

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size='xl'>
      <DrawerOverlay/>
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px'>Wallet Cheatsheet</DrawerHeader>
        <DrawerBody>
          {
            wallets.map((wallet, index) => (
              <Box borderBottomWidth='1px' pt={4} pb={4} key={index}>
                <WalletData
                  label='Address'
                  data={wallet.address}
                  isTop
                />
                <WalletData
                  label='Public Key'
                  data={wallet.publicKey}
                />
                <WalletData
                  label='Private Key'
                  data={wallet.privateKey}
                  isBottom
                />
              </Box>
            ))
          }
          
        </DrawerBody>
        <DrawerFooter>
          <Popover>
            <PopoverTrigger>
              <Button>
                Create new wallet
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>New Wallet</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Text>Address</Text>
                <Input
                  value={address}
                  onChange={(event) => setPublicKey(event.target.value)} 
                  isDisabled
                />
                <Text>Public Key</Text>
                <Input
                  value={publicKey}
                  onChange={(event) => setPublicKey(event.target.value)} 
                  isDisabled
                />
                <Text>Private Key</Text>
                <Input
                  value={privateKey}
                  onChange={(event) => setPrivateKey(event.target.value)}
                  isDisabled
                />
              </PopoverBody>
              <PopoverFooter>
                <Button colorScheme='teal' onClick={submitWallet}>
                  Confirm
                </Button>
                <Button onClick={generateKeys}>
                  Generate Keys
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default WalletDrawer;
