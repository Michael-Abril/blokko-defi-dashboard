import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import { mockTransactionHistory } from '../data/mockTransactionHistory';
import TransactionRow from '../components/Dashboard/TransactionRow';

const Transactions = () => {
  return (
    <Box>
      <Heading mb={10} bgGradient="linear(to-r, blue.500, purple.500)" bgClip="text">Recent Transactions</Heading>
      <Table variant="simple" bg="white" borderRadius="lg" boxShadow="md">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Type</Th>
            <Th>Source / Destination</Th>
            <Th isNumeric>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {mockTransactionHistory.map(tx => <TransactionRow key={tx.id} tx={tx} />)}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Transactions;