import React from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { mockAllocationFeed } from '../data/mockAllocationFeed';
import AllocationCard from '../components/Activity/AllocationCard';

const Activity = () => {
  return (
    <Box>
      <Heading mb={10} bgGradient="linear(to-r, gradient.start, gradient.end)" bgClip="text">
        Live Activity Feed
      </Heading>
      <VStack align="stretch" spacing={5}>
        {mockAllocationFeed.map((allocation) => (
          <AllocationCard key={allocation.id} allocation={allocation} />
        ))}
      </VStack>
    </Box>
  );
};

export default Activity;