import React, { useState, useMemo } from 'react';
import { Box, Heading, Button, Icon } from '@chakra-ui/react';
import { mockPortfolio } from '../data/mockPortfolio';
import HoldingsFilter from '../components/Holdings/HoldingsFilter';
import ProtocolDetailsAccordion from '../components/Holdings/ProtocolDetailsAccordion';
import { ChatIcon } from '@chakra-ui/icons';
import AgentDrawer from '../components/AI/AgentDrawer';

const Holdings = () => {
  const { holdings } = mockPortfolio;
  const chains = holdings.map(h=>h.chain);
  const [chain, setChain] = useState('All');
  const [search, setSearch] = useState('');
  const [aiOpen,setAiOpen]=useState(false);

  const filtered = useMemo(() => {
    let list = [...holdings];
    if (chain !== 'All') list = list.filter(h => h.chain === chain);
    if (search) {
      const s = search.toLowerCase();
      list = list.map(h => ({ ...h, positions: h.positions.filter(p=>p.name.toLowerCase().includes(s)) })).filter(h=>h.positions.length>0);
    }
    return list;
  }, [chain, search, holdings]);

  return (
    <Box>
      <Heading mb={6} bgGradient="linear(to-r, gradient.start, gradient.end)" bgClip="text">Holdings</Heading>
      <HoldingsFilter chain={chain} setChain={setChain} search={search} setSearch={setSearch} chains={chains} />
      {filtered.map(h => (
        <Box key={h.chain} mb={8}>
          <Heading size="md" mb={3}>{h.chain}</Heading>
          <ProtocolDetailsAccordion positions={h.positions} />
        </Box>
      ))}
      <Button position="fixed" bottom="30px" right="30px" colorScheme="brand" borderRadius="full" p={0} w="60px" h="60px" onClick={()=>setAiOpen(true)}>
        <Icon as={ChatIcon} boxSize={6} />
      </Button>
      <AgentDrawer isOpen={aiOpen} onClose={()=>setAiOpen(false)} />
    </Box>
  );
};

export default Holdings;