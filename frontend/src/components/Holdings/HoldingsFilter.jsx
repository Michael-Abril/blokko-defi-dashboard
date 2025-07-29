import React from 'react';
import { HStack, Select, Input } from '@chakra-ui/react';

const HoldingsFilter = ({ chain, setChain, search, setSearch, chains }) => {
  return (
    <HStack spacing={4} mb={6}>
      <Select value={chain} onChange={(e)=>setChain(e.target.value)} maxW="200px">
        <option value="All">All Chains</option>
        {chains.map(c=> <option key={c} value={c}>{c}</option>)}
      </Select>
      <Input placeholder="Search protocol..." value={search} onChange={(e)=>setSearch(e.target.value)} maxW="300px" />
    </HStack>
  );
};

export default HoldingsFilter;