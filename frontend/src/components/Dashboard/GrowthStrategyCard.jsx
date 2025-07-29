import React from 'react';
import { Box, Heading, Text, Progress, HStack, VStack, Tag } from '@chakra-ui/react';

const AllocationBar = ({ label, percent, color }) => (
  <HStack w="100%" align="center" spacing={3}>
    <Tag size="sm" bg={color} color="white">{label}</Tag>
    <Progress value={percent} flex="1" size="sm" colorScheme={color} borderRadius="md" />
    <Text w="50px" textAlign="right" fontSize="sm">{percent}%</Text>
  </HStack>
);

const GrowthStrategyCard = ({ strategy }) => {
  const { name, headline, description, allocations } = strategy;
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <VStack align="stretch" spacing={4}>
        <Heading size="md">{name}</Heading>
        <Text fontWeight="bold" color="accent.500">{headline}</Text>
        <Text fontSize="sm">{description}</Text>
        <VStack align="stretch" spacing={2}>
          <AllocationBar label="Stablecoins" percent={allocations.stablecoins} color="green" />
          <AllocationBar label="Treasuries" percent={allocations.treasuries} color="blue" />
          <AllocationBar label="DeFi" percent={allocations.defi} color="purple" />
        </VStack>
      </VStack>
    </Box>
  );
};

export default GrowthStrategyCard;