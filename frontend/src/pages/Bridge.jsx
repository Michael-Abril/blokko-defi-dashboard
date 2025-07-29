import React, { useState } from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import BridgeAllocationMatrix from '../components/Bridge/BridgeAllocationMatrix';
import UpcomingTxCard from '../components/Dashboard/UpcomingTxCard';
import BridgeStatusTracker from '../components/Bridge/BridgeStatusTracker';
import { mockUpcomingTx } from '../data/mockUpcomingTx';

const CHAINS = ['Ethereum', 'Arbitrum', 'Polygon', 'Optimism'];

const Bridge = () => {
  const [alloc, setAlloc] = useState({ Ethereum: 40, Arbitrum: 30, Polygon: 20, Optimism: 10 });
  const upcomingBridges = mockUpcomingTx.filter(tx=>tx.type==='Bridge');

  return (
    <Box>
      <Heading mb={6} bgGradient="linear(to-r, blue.500, purple.500)" bgClip="text">Bridge Allocation</Heading>
      <BridgeAllocationMatrix chains={CHAINS} allocations={alloc} setAllocations={setAlloc} />

      <Heading size="lg" mt={10} mb={4}>Upcoming Bridges</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={10}>
        {upcomingBridges.map(b => <UpcomingTxCard key={b.id} tx={b} />)}
      </SimpleGrid>

      <BridgeStatusTracker />
    </Box>
  );
};

export default Bridge;