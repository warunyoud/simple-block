import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
import { 
  Box, 
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import {
  AddIcon, CheckIcon
} from '@chakra-ui/icons';

import Block from '../entities/Block';
import Transaction from '../entities/Transaction';
import TransactionInfo from './TransactionInfo';
import TransactionCreationModal from './TransactionCreationModal';

type PendingBlockProps = {
  id: number;
  prevBlock?: Block;
  onNewBlockCreated: (block: Block) => void;
  onDrawerOpen: () => void;
};

const PendingBlock: React.FC<PendingBlockProps> = (props) => {
  const { id, prevBlock, onNewBlockCreated, onDrawerOpen } = props;
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onNewTransactionCreated = (transaction: Transaction) => {
    const clonedTransactions = cloneDeep(pendingTransactions);
    clonedTransactions.push(transaction);
    setPendingTransactions(clonedTransactions);
    onClose();
  };

  const submitBlock = () => {
    const verifiedTransactions: Transaction[] = [];
    pendingTransactions.forEach(transaction => {
      if (transaction.verifyTransaction()) {
        verifiedTransactions.push(transaction);
      }
    });
    onNewBlockCreated(new Block(prevBlock?.getHash() ?? '', verifiedTransactions));
    setPendingTransactions([]);
  };

  return (
    <Box w='sm' minW='sm' borderWidth='1px' borderRadius='lg' textAlign='start' borderColor='#5ca4ba'>
      <Box
        fontWeight='bold'
        as='h4'
        p='4'
        borderBottomWidth='1px'
        backgroundColor='#495e6e'
        borderTopRadius='lg'
        borderColor='#5ca4ba'
        color='white'
      >
        Block #{id + 1} (Pending)
      </Box>
      <Box
        fontWeight='semibold'
        p={4}
      >
        Transactions
      </Box>
      {
        pendingTransactions.map((transaction, index) => (
          <TransactionInfo
            key={index}
            index={index}
            transaction={transaction}
            setTransaction={(transaction) => {
              const clonedTransactions = cloneDeep(pendingTransactions);
              clonedTransactions[index] = transaction;
              setPendingTransactions(clonedTransactions);
            }}
          />
        ))
      }
      <TransactionCreationModal
        isOpen={isOpen}
        onClose={onClose}
        onNewTransactionCreated={onNewTransactionCreated}
        onDrawerOpen={onDrawerOpen}
      />
      <Button 
        onClick={onOpen} 
        leftIcon={<AddIcon />} 
        variant='outline'
        isFullWidth
        borderRadius={0}
        borderLeftWidth={0}
        borderRightWidth={0}
        borderColor='#5ca4ba'
      >
        Add Transaction
      </Button>
      <Button 
        leftIcon={<CheckIcon />} 
        colorScheme='green' 
        onClick={submitBlock}
        isFullWidth
        borderTopRadius={0}
      >
        Create Block
      </Button>
    </Box>
  )
};

export default PendingBlock;
