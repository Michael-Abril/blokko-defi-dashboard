import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
} from '@chakra-ui/react';

const Dashboard = () => {
  console.log('Dashboard component rendering...');
  
  return (
    <VStack spacing={8} align="stretch" p={8}>
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
          Welcome back! Here's your portfolio overview and latest activity.
        </Text>
      </Box>

      {/* Simple Test Card */}
      <Card variant="glass">
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Heading size="md" color="text.primary">Portfolio Overview</Heading>
            <Text color="text.secondary">
              Your DeFi portfolio is loading successfully! This is a simplified version to test the rendering.
            </Text>
            <Box p={4} bg="green.100" borderRadius="md">
              <Text color="green.800" fontWeight="bold">
                ✅ Dashboard is working! The React app is rendering properly.
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </Card>

      {/* Additional Test Cards */}
      <Card variant="glass">
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Heading size="md" color="text.primary">Quick Stats</Heading>
            <Text color="text.secondary">
              Portfolio Value: $250,000
            </Text>
            <Text color="text.secondary">
              Active Networks: 4
            </Text>
            <Text color="text.secondary">
              Current APY: 8.75%
            </Text>
          </VStack>
        </CardBody>
      </Card>

      <Card variant="glass">
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Heading size="md" color="text.primary">Recent Activity</Heading>
            <Text color="text.secondary">
              • Bridge transaction completed
            </Text>
            <Text color="text.secondary">
              • New yield position opened
            </Text>
            <Text color="text.secondary">
              • Portfolio rebalanced
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default Dashboard;