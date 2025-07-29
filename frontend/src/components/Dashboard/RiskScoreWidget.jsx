import React, { useMemo } from 'react';
import { Box, Heading, Progress, Text } from '@chakra-ui/react';
import { mockPortfolio } from '../../data/mockPortfolio';

const CATEGORY_WEIGHTS = {
  Lending: 1,
  DEX: 2,
  Derivatives: 3,
  Staking: 2,
};

const calculateRiskScore = () => {
  const { holdings } = mockPortfolio;
  let totalBalance = 0;
  let weightedRisk = 0;
  holdings.forEach((h) => {
    h.positions.forEach((p) => {
      const weight = CATEGORY_WEIGHTS[p.category] || 2;
      weightedRisk += weight * p.balance;
      totalBalance += p.balance;
    });
  });
  const score = totalBalance ? (weightedRisk / totalBalance) : 0; // 1-3 scale
  return Math.round((score / 3) * 100); // convert to 0-100
};

const RiskScoreWidget = () => {
  const riskScore = useMemo(() => calculateRiskScore(), []);
  const colorScheme = riskScore < 40 ? 'green' : riskScore < 70 ? 'yellow' : 'red';
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>Portfolio Risk Score</Heading>
      <Progress value={riskScore} colorScheme={colorScheme} size="lg" borderRadius="md" mb={2} />
      <Text fontSize="sm">{riskScore} / 100</Text>
    </Box>
  );
};

export default RiskScoreWidget;