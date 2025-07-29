import React from 'react';
import { Box, Text, HStack, Image, Button, Badge, Spacer } from '@chakra-ui/react';

const QuoteRow = ({ quote, onSelect }) => {
  return (
    <HStack p={4} borderWidth="1px" borderRadius="lg" w="100%" bg="white" boxShadow="sm">
      <Image src={quote.dexLogoUrl} alt={`${quote.dex} logo`} boxSize="40px" />
      <Box>
        <Text fontWeight="bold">{quote.dex}</Text>
        <Text fontSize="sm">Receive: {quote.outputAmount}</Text>
      </Box>
      <Spacer />
      <Box textAlign="right">
        <Text fontSize="sm">Fee: ${quote.gasFeeUSD}</Text>
        {quote.isBestRate && <Badge colorScheme="green">Best Rate</Badge>}
      </Box>
      <Button colorScheme="brand" onClick={() => onSelect(quote)}>Select</Button>
    </HStack>
  );
};

export default QuoteRow;