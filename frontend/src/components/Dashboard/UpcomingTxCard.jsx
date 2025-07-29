import React from 'react';
import { Box, Badge, HStack, VStack, Text } from '@chakra-ui/react';

const UpcomingTxCard = ({ tx }) => {
  const color = tx.type === 'Bridge' ? 'blue' : tx.type === 'Swap' ? 'purple' : 'green';
  return (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
      <HStack justify="space-between" mb={2}>
        <Badge colorScheme={color}>{tx.type}</Badge>
        <Text fontSize="sm" color="gray.500">{tx.date}</Text>
      </HStack>
      <VStack align="start" spacing={1} fontSize="sm">
        {tx.type === 'Bridge' && (
          <Text>{tx.amount.toLocaleString()} {tx.token} ➜ {tx.chainTo}</Text>
        )}
        {tx.type === 'Swap' && (
          <Text>{tx.amount.toLocaleString()} {tx.fromToken} ➜ {tx.toToken} @ {tx.estRate}</Text>
        )}
        {tx.type === 'Deposit' && (
          <Text>Deposit {tx.amount.toLocaleString()} {tx.token} into {tx.protocol} on {tx.chain}</Text>
        )}
        <Text>Status: {tx.status}</Text>
      </VStack>
    </Box>
  );
};

export default UpcomingTxCard;