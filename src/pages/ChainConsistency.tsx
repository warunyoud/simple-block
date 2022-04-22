import { useState } from 'react';
import { cloneDeep } from 'lodash';
import {
  Box,
  Heading, 
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import Block from '../entities/Block';
import BlockTable from '../components/BlockTable';
import Transaction from '../entities/Transaction';
import PendingBlock from '../components/PendingBlock';
import { wallets } from '../constants/wallets';
import WalletDrawer from '../components/WalletDrawer';

const generateDefaultChain = () => {
  const defaultBlocks = [];
  defaultBlocks.push(new Block(undefined, [
    Transaction.createTransaction(wallets[0].publicKey, wallets[0].address, wallets[1].address, 10000, wallets[0].privateKey),
  ]));
  defaultBlocks.push(new Block(defaultBlocks[0].getHash(), [
    Transaction.createTransaction(wallets[1].publicKey, wallets[1].address, wallets[0].address, 100, wallets[1].privateKey),
  ]));
  defaultBlocks.push(new Block(defaultBlocks[1].getHash(), [
    Transaction.createTransaction(wallets[0].publicKey, wallets[0].address, wallets[1].address, 100, wallets[0].privateKey),
    Transaction.createTransaction(wallets[1].publicKey, wallets[1].address, wallets[0].address, 1000, wallets[1].privateKey),
  ]));
  defaultBlocks.push(new Block(defaultBlocks[2].getHash(), [
    Transaction.createTransaction(wallets[0].publicKey, wallets[0].address, wallets[1].address, 100, wallets[0].privateKey),
    Transaction.createTransaction(wallets[1].publicKey, wallets[1].address, wallets[0].address, 1000, wallets[1].privateKey),
  ]));
  return defaultBlocks;
}

const ChainConsistencyPage = () => {
  const [blocks, setBlocks] = useState<Block[]>(generateDefaultChain());
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();

  const setBlockByIndex = (index: number) => (block: Block) => {
    const clonedBlocks = cloneDeep(blocks);
    clonedBlocks[index] = block;
    setBlocks(clonedBlocks);
  };
  const onNewBlockCreated = (block: Block) => {
    const clonedBlocks = cloneDeep(blocks);
    clonedBlocks.push(block);
    setBlocks(clonedBlocks);
  };

  return (
    <Box margin='auto' pb={20}>
      <VStack>
        <Heading mt={20}>Simple Chain</Heading>
        <HStack 
          width='100%' 
          alignItems='baseline' 
          overflow='scroll'
          spacing={4}
          p={8}
        >
          {
            blocks.map((block, index) => (
              <BlockTable
                key={index}
                id={index}
                block={block}
                prevBlock={index > 0 ? blocks[index - 1] : undefined}
                setBlock={setBlockByIndex(index)}
              />
            ))
          }
          <PendingBlock
            id={blocks.length}
            prevBlock={blocks.length > 0 ? blocks[blocks.length - 1] : undefined}
            onNewBlockCreated={onNewBlockCreated}
            onDrawerOpen={onDrawerOpen}
          />
        </HStack>
      </VStack>
      <WalletDrawer
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
      />
    </Box>
  )
};

export default ChainConsistencyPage;
