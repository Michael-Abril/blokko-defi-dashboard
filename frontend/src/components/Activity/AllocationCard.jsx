import React from 'react';
import { Box, HStack, VStack, Text, Progress } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const AllocationCard = ({ allocation }) => {
  return (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
        <HStack>
            <VStack align="start">
                <Text fontWeight="bold">Source: {allocation.source}</Text>
                <Text>Amount: ${allocation.amount.toLocaleString()}</Text>
            </VStack>
            <ArrowForwardIcon w={8} h={8} color="gray.400" />
            <VStack align="stretch" w="full">
                {allocation.allocations.map(alloc => (
                    <Box key={alloc.protocol}>
                        <Text fontSize="sm">{alloc.protocol} ({alloc.chain}) - ${alloc.amount.toLocaleString()}</Text>
                        <Progress value={(alloc.amount / allocation.amount) * 100} size="sm" colorScheme="accent" />
                    </Box>
                ))}
            </VStack>
        </HStack>
    </Box>
  );
};

export default AllocationCard;