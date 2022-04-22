import React from 'react';
import { cloneDeep } from 'lodash';
import { 
  Box,
  Flex,
  Input, 
  Text,
} from '@chakra-ui/react';
import {
  CheckCircleIcon,
  WarningIcon,
} from '@chakra-ui/icons';

import Block from '../entities/Block';
import TransactionInfo from './TransactionInfo';

type BlockTableProps = {
  id: number;
  block: Block;
  prevBlock?: Block;
  setBlock: (block: Block) => void;
};

const BlockTable: React.FC<BlockTableProps> = (props) => {
  const { id, block, setBlock, prevBlock } = props;

  return (
    <Box w='sm' minW='sm' borderWidth='1px' borderRadius='lg' textAlign='start' borderColor='#5ca4ba'>
      <Box
        fontWeight='bold'
        as='h4'
        p='4'
        borderBottomWidth='1px'
        backgroundColor='#36638c'
        borderTopRadius='lg'
        borderColor='#5ca4ba'
        color='white'
      >
        Block #{id + 1}
      </Box>
      <Box>
        <Box p={4}>
          <Text>Previous Hash: </Text>
          <Flex>
            <Text flex='1' isTruncated >{block.prevHash ?? 'N/A'}</Text>
            {
              prevBlock && block.prevHash ? prevBlock.verifyHash(block.prevHash) ?
                <CheckCircleIcon color='green.500'/> : <WarningIcon color='red.500'/>
              : undefined
            }
          </Flex>
        </Box>
        <Box 
          fontWeight='semibold'
          borderColor='#5ca4ba'
          p={4} 
          borderTopWidth={1}
        >
          Transactions
        </Box>
        {
          block.transactions.map((transaction, index) => (
            <TransactionInfo
              key={index}
              index={index}
              transaction={transaction}
              setTransaction={(transaction) => {
                const clonedBlock = cloneDeep(block);
                clonedBlock.transactions[index] = transaction;
                setBlock(clonedBlock);
              }}
            />
          ))
        }
        <Box p={4} borderTopWidth={1} borderColor='#5ca4ba'>
          <Text>Timestamp</Text>
          <Input 
            value={`${block.timestamp}`}
            onChange={event => {
              const clonedBlock = cloneDeep(block);
              clonedBlock.timestamp = parseInt(event.target.value);
              setBlock(clonedBlock);
            }} 
          />
        </Box>
      </Box>
    </Box>
  )
}

export default BlockTable;
