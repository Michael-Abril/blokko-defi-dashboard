import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <VStack spacing={8} align="stretch">
      {/* Page Header */}
      <Box>
        <Heading 
          size="2xl" 
          bgGradient="linear(to-r, brand.500, secondary.500)" 
          bgClip="text"
          fontWeight="800"
          mb={2}
        >
          Dashboard
        </Heading>
        <Text color="text.secondary" fontSize="lg">
          Your comprehensive DeFi portfolio overview
        </Text>
      </Box>

      {/* Simple Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <Card variant="glass">
          <CardBody>
            <Stat>
              <StatLabel color="text.secondary" fontSize="sm">Total Portfolio Value</StatLabel>
              <StatNumber fontSize="2xl" fontWeight="bold" color="text.primary">
                $2,450,000
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                2.4% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card variant="glass">
          <CardBody>
            <Stat>
              <StatLabel color="text.secondary" fontSize="sm">Average APY</StatLabel>
              <StatNumber fontSize="2xl" fontWeight="bold" color="success.500">
                8.2%
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                +0.5% from last week
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card variant="glass">
          <CardBody>
            <Stat>
              <StatLabel color="text.secondary" fontSize="sm">Active Positions</StatLabel>
              <StatNumber fontSize="2xl" fontWeight="bold" color="text.primary">
                24
              </StatNumber>
              <StatHelpText>
                Across 5 chains
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card variant="glass">
          <CardBody>
            <Stat>
              <StatLabel color="text.secondary" fontSize="sm">Risk Score</StatLabel>
              <StatNumber fontSize="2xl" fontWeight="bold" color="warning.500">
                24
              </StatNumber>
              <StatHelpText>
                Low risk portfolio
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Welcome Message */}
      <Card variant="neon">
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Heading size="md" color="text.primary">
              Welcome to Blokko DeFi Dashboard
            </Heading>
            <Text color="text.secondary">
              Your futuristic DeFi treasury management platform is now running with the new design system!
            </Text>
            <Text color="text.secondary" fontSize="sm">
              Navigate to Holdings, Bridge, or Swap to see the enhanced interfaces.
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default Dashboard;