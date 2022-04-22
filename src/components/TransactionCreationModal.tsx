import React, { useState } from 'react';
import {
  Button,
  Center,
  Flex,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import Transaction from '../entities/Transaction';
import { wallets } from '../constants/wallets';

type TransactionCreationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onNewTransactionCreated: (transaction: Transaction) => void;
  onDrawerOpen: () => void;
};

const TransactionCreationModal: React.FC<TransactionCreationModalProps> = (props) => {
  const { isOpen, onClose, onNewTransactionCreated, onDrawerOpen } = props;
  
  const [senderAddress, setSenderAddress] = useState(wallets[0].address);
  const [receiverAddress, setReceiverAddress] = useState(wallets[1].address);

  const [amount, setAmount] = useState(100);
  
  const [publicKey, setPublicKey] = useState(wallets[0].publicKey);
  const [privateKey, setPrivateKey] = useState(wallets[0].privateKey);

  const submitTransaction = () => {
    const newTransaction = Transaction.createTransaction(publicKey, senderAddress, receiverAddress, amount, privateKey);
    onNewTransactionCreated(newTransaction);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={onDrawerOpen} mb={4} isFullWidth>
              Wallet Cheatsheet
            </Button>
            <Flex>
              <Input
                value={senderAddress}
                onChange={(event) => setSenderAddress(event.target.value)}
              />
              <Center pl={4} pr={4}>Pays</Center>
              <Input
                value={receiverAddress}
                onChange={(event) => setReceiverAddress(event.target.value)}
              />
            </Flex>
            <Text>Amount</Text>
            <NumberInput
              value={amount}
              onChange={(_value, amount) => setAmount(amount)}
            >
              <NumberInputField/>
            </NumberInput>
            <Text>Public Key</Text>
            <Input
              value={publicKey}
              onChange={(event) => setPublicKey(event.target.value)}
            />
            <Text>Private Key</Text>
            <Input
              value={privateKey}
              onChange={(event) => setPrivateKey(event.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={submitTransaction}>
              Submit
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TransactionCreationModal;
