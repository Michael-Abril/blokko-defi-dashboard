import React from 'react';
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Badge } from '@chakra-ui/react';
import { mockUpcomingTx } from '../../data/mockUpcomingTx';

const BridgeStatusTracker = () => {
  const bridges = mockUpcomingTx.filter(tx=>tx.type==='Bridge');
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>Bridge Status</Heading>
      <Table variant="simple">
        <Thead><Tr><Th>Date</Th><Th>From</Th><Th>To</Th><Th isNumeric>Amount</Th><Th>Status</Th></Tr></Thead>
        <Tbody>
          {bridges.map(b=>(
            <Tr key={b.id}>
              <Td>{b.date}</Td><Td>{b.chainFrom}</Td><Td>{b.chainTo}</Td><Td isNumeric>{b.amount.toLocaleString()} {b.token}</Td>
              <Td><Badge colorScheme={b.status==='Scheduled'?'blue':b.status==='Completed'?'green':'orange'}>{b.status}</Badge></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default BridgeStatusTracker;