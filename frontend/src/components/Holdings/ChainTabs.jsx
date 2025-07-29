import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid } from '@chakra-ui/react';
import ProtocolCard from './ProtocolCard';

const ChainTabs = ({ holdings }) => {
  return (
    <Tabs variant="soft-rounded" colorScheme="brand" mb={8}>
      <TabList>
        {holdings.map(h=> <Tab key={h.chain}>{h.chain}</Tab>)}
      </TabList>
      <TabPanels>
        {holdings.map(h=> (
          <TabPanel key={h.chain} p={4}>
            <SimpleGrid columns={{ base:1, md:2 }} spacing={4}>
              {h.positions.map(p=> <ProtocolCard key={p.name} chain={h.chain} protocol={p.name} />)}
            </SimpleGrid>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default ChainTabs;