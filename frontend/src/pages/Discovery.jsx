import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import axios from 'axios';
import OpportunityCard from '../components/Discovery/OpportunityCard';

const Discovery = () => {
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      const { data } = await axios.get('http://localhost:3001/api/v1/defi/opportunities');
      setOpportunities(data.sort((a, b) => a.blokkoRank - b.blokkoRank));
    };
    fetchOpportunities();
  }, []);

  return (
    <Box>
      <Heading mb={10} bgGradient="linear(to-r, gradient.start, gradient.end)" bgClip="text">
        DeFi Opportunities
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {opportunities.map(opportunity => (
          <OpportunityCard key={opportunity.protocol} opportunity={opportunity} />
        ))}
      </SimpleGrid>

      <Heading mt={20} mb={10} bgGradient="linear(to-r, gradient.start, gradient.end)" bgClip="text">
        Institutional & Bank Protocols
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
            <Heading size="md">J.P. Morgan Coin</Heading>
            <Text mt={2}>A permissioned stablecoin for institutional clients.</Text>
        </Box>
        <Box bg="white" p={5} borderRadius="lg" boxShadow="md">
            <Heading size="md">USDF Consortium</Heading>
            <Text mt={2}>A consortium of FDIC-insured banks issuing a bank-minted stablecoin.</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Discovery;