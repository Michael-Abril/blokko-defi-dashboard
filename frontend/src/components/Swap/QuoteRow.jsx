import React from 'react';
import { Box, Text, HStack, Image, Button, Badge, Spacer, Radio } from '@chakra-ui/react';

const QuoteRow = ({ quote, onSelect, isSelected }) => {
  return (
    <HStack p={4} borderWidth="2px" borderColor={isSelected?'brand.primary':'transparent'} borderRadius="lg" w="100%" bg="white" boxShadow="sm">
      <Radio isChecked={isSelected} onChange={()=>onSelect(quote)} colorScheme="brand" />
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
      <Button variant={isSelected?'solid':'outline'} colorScheme="brand" onClick={()=>onSelect(quote)}>{isSelected?'Selected':'Select'}</Button>
    </HStack>
  );
};

export default QuoteRow;