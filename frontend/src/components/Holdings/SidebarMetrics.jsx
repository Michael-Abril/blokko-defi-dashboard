import React from 'react';
import { Box, Heading, VStack, HStack, Text } from '@chakra-ui/react';
import { useMetrics } from '../../context/MetricsContext';

const SidebarMetrics = () => {
  const { tvl, protocolMetrics, risk } = useMetrics();
  const totalTvl = Object.values(tvl).reduce((sum, chain)=> sum + Object.values(chain).reduce((s,v)=>s+v,0),0);
  const avgApy = Object.values(protocolMetrics).reduce((sum,m)=>sum + (m.apy||0),0)/Object.keys(protocolMetrics).length;
  const avgRisk = Object.values(risk).reduce((sum,r)=>sum + (r.riskScore||0),0)/Object.keys(risk).length;

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md" minW="250px">
      <Heading size="md" mb={4}>Portfolio Metrics</Heading>
      <VStack align="stretch" spacing={3} fontSize="sm">
        <HStack justify="space-between"><Text>Total TVL</Text><Text>${(totalTvl/1e9).toFixed(2)}B</Text></HStack>
        <HStack justify="space-between"><Text>Average APY</Text><Text>{avgApy.toFixed(2)}%</Text></HStack>
        <HStack justify="space-between"><Text>Average Risk</Text><Text>{avgRisk.toFixed(0)}</Text></HStack>
      </VStack>
    </Box>
  );
};

export default SidebarMetrics;