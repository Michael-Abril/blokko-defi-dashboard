import React from 'react';
import { Box, HStack, VStack, Text, Badge, Progress } from '@chakra-ui/react';
import { useMetrics } from '../../context/MetricsContext';

const riskColor = (score) => score < 30 ? 'green' : score < 60 ? 'yellow' : 'red';

const ProtocolCard = ({ chain, protocol }) => {
  const { tvl, protocolMetrics, risk } = useMetrics();
  const tvlVal = tvl[chain]?.[protocol] || 0;
  const metrics = protocolMetrics[protocol] || {};
  const riskInfo = risk[protocol] || { riskScore: 0 };

  return (
    <Box bg="white" p={4} borderRadius="lg" boxShadow="sm" w="full">
      <HStack justify="space-between" mb={2}>
        <Text fontWeight="bold">{protocol}</Text>
        <Badge colorScheme={riskColor(riskInfo.riskScore)}>Risk {riskInfo.riskScore}</Badge>
      </HStack>
      <VStack align="stretch" spacing={1} fontSize="sm">
        <HStack justify="space-between"><Text>TVL</Text><Text>${(tvlVal/1e6).toFixed(1)}M</Text></HStack>
        <HStack justify="space-between"><Text>APY</Text><Text>{metrics.apy || '-'}%</Text></HStack>
        <HStack justify="space-between"><Text>Users</Text><Text>{metrics.users || '-'}</Text></HStack>
        <HStack justify="space-between"><Text>24h Fees</Text><Text>${metrics.fees24h?.toLocaleString() || '-'}</Text></HStack>
        <Progress value={riskInfo.riskScore} size="xs" colorScheme={riskColor(riskInfo.riskScore)} />
      </VStack>
    </Box>
  );
};

export default ProtocolCard;