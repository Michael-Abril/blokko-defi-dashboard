import React from 'react';
import { Box, Heading, Text, VStack, Stat, StatLabel, StatNumber, Badge } from '@chakra-ui/react';

const OpportunityCard = ({ opportunity }) => {
  return (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
      <HStack>
        <Heading size="md">{opportunity.protocol}</Heading>
        <Badge>Rank #{opportunity.blokkoRank}</Badge>
      </HStack>
      <Text fontSize="sm" color="gray.500">{opportunity.chain} - {opportunity.category}</Text>
      <Text mt={4}>{opportunity.description}</Text>
      <Stat mt={4}>
        <StatLabel>Projected APY</StatLabel>
        <StatNumber color="accent.500">{opportunity.apy}%</StatNumber>
      </Stat>
    </Box>
  );
};

export default OpportunityCard;