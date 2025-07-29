import React from 'react';
import { Box, Heading, Text, HStack } from '@chakra-ui/react';

const FeeBreakdown = ({ quote, bestOutput }) => {
  if (!quote) return null;
  const savings = bestOutput ? (bestOutput - quote.outputAmount).toFixed(2) : '0';
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md" w="full">
      <Heading size="md" mb={4}>Fee & Savings</Heading>
      <HStack justify="space-between" mb={2}><Text>Output Amount</Text><Text fontWeight="bold">{quote.outputAmount}</Text></HStack>
      <HStack justify="space-between" mb={2}><Text>Gas Fee (USD)</Text><Text>${quote.gasFeeUSD}</Text></HStack>
      <HStack justify="space-between"><Text>Potential Savings vs Best</Text><Text color="green.500">${savings}</Text></HStack>
    </Box>
  );
};

export default FeeBreakdown;