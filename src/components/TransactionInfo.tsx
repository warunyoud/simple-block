import React from 'react';
import { cloneDeep } from 'lodash';
import { 
  Box, 
  Center, 
  Flex,
  HStack,
  Input, 
  Text,
} from '@chakra-ui/react';
import {
  CheckCircleIcon,
  WarningIcon,
} from '@chakra-ui/icons';

import Transaction from '../entities/Transaction';

type TransactionInfoProps = {
  index: number;
  transaction: Transaction;
  setTransaction: (transaction: Transaction) => void;
};

const TransactionInfo: React.FC<TransactionInfoProps> = (props) => {
  const { transaction, index, setTransaction } = props;
  return (
    <Box key={index} borderTopWidth={1} p={4} borderColor='#5ca4ba'>
      <Text>Transaction #{index+1}</Text>
      <Flex borderColor='#5ca4ba'>
        <Input 
          value={`${transaction.senderAddress}`}
          onChange={event => {
            const clonedTransaction = cloneDeep(transaction);
            clonedTransaction.senderAddress = event.target.value;
            setTransaction(clonedTransaction);
          }} 
        />
        <Center pl={4} pr={4}>Pays</Center>
        <Input 
          value={`${transaction.receiverAddress}`}
          onChange={event => {
            const clonedTransaction = cloneDeep(transaction);
            clonedTransaction.receiverAddress = event.target.value;
            setTransaction(clonedTransaction);
          }} 
        />
      </Flex>
      <Text>Amount</Text>
      <Input 
        value={`${transaction.amount}`}
        onChange={event => {
          const clonedTransaction = cloneDeep(transaction);
          clonedTransaction.amount = parseInt(event.target.value);
          setTransaction(clonedTransaction);
        }} 
      />
      <Text>Signature</Text>
      <Input 
        value={`${transaction.signature}`}
        onChange={event => {
          const clonedTransaction = cloneDeep(transaction);
          clonedTransaction.signature = event.target.value;
          setTransaction(clonedTransaction);
        }}
      />
      {
        transaction.verifyTransaction() ? 
        <HStack color='green.500'>
          <CheckCircleIcon/>
          <Text>Signature Verfied</Text>
        </HStack> : <HStack color='red.500'>
          <WarningIcon/>
          <Text>Invalid Signature</Text>
        </HStack>
      }
    </Box>
  );
};

export default TransactionInfo;
