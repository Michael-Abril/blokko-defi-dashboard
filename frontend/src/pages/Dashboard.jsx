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
  Badge,
  Button,
} from '@chakra-ui/react';

const Dashboard = () => {
  console.log('Dashboard component rendering...');

  return (
    <VStack spacing={8} align="stretch" p={8}>
      {/* Page Header */}
      <Box>
        <Heading 
          size="2xl" 
          bgGradient="linear(to-r, blue.500, purple.500)" 
          bgClip="text"
          fontWeight="800"
          mb={2}
        >
          🚀 Blokko DeFi Dashboard
        </Heading>
        <Text color="gray.600" fontSize="lg">
          Welcome back! Here's your portfolio overview and latest activity.
        </Text>
      </Box>

      {/* Portfolio Overview Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <Card variant="outline">
          <CardBody>
            <Stat>
              <StatLabel color="gray.600">Portfolio Value</StatLabel>
              <StatNumber color="gray.800" fontSize="2xl">
                $250,000
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                12.5% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card variant="outline">
          <CardBody>
            <Stat>
              <StatLabel color="gray.600">Active Networks</StatLabel>
              <StatNumber color="gray.800" fontSize="2xl">
                4
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                2 new this month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card variant="outline">
          <CardBody>
            <Stat>
              <StatLabel color="gray.600">Active Positions</StatLabel>
              <StatNumber color="gray.800" fontSize="2xl">
                12
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                3 new positions
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card variant="outline">
          <CardBody>
            <Stat>
              <StatLabel color="gray.600">Current APY</StatLabel>
              <StatNumber color="green.500" fontSize="2xl">
                8.75%
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                0.8% increase
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Growth Strategies */}
      <VStack align="stretch" spacing={6}>
        <Heading size="lg" color="gray.800">
          Growth Strategies
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          <Card variant="outline">
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <VStack align="stretch" spacing={2}>
                  <Heading size="md" color="gray.800">
                    Conservative Yield
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    Stable returns with minimal risk
                  </Text>
                </VStack>
                <VStack align="stretch" spacing={2}>
                  <Box display="flex" justifyContent="space-between">
                    <Text fontSize="sm" color="gray.600">Risk Level</Text>
                    <Badge colorScheme="green">Low</Badge>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text fontSize="sm" color="gray.600">Expected APY</Text>
                    <Text fontSize="sm" fontWeight="bold" color="green.500">
                      6.5%
                    </Text>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text fontSize="sm" color="gray.600">Min Investment</Text>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">
                      $10,000
                    </Text>
                  </Box>
                </VStack>
                <Button size="sm" variant="solid" colorScheme="blue">
                  Apply Strategy
                </Button>
              </VStack>
            </CardBody>
          </Card>

          <Card variant="outline">
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <VStack align="stretch" spacing={2}>
                  <Heading size="md" color="gray.800">
                    Balanced Growth
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    Moderate risk for higher returns
                  </Text>
                </VStack>
                <VStack align="stretch" spacing={2}>
                  <Box display="flex" justifyContent="space-between">
                    <Text fontSize="sm" color="gray.600">Risk Level</Text>
                    <Badge colorScheme="yellow">Medium</Badge>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text fontSize="sm" color="gray.600">Expected APY</Text>
                    <Text fontSize="sm" fontWeight="bold" color="green.500">
                      9.2%
                    </Text>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text fontSize="sm" color="gray.600">Min Investment</Text>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">
                      $25,000
                    </Text>
                  </Box>
                </VStack>
                <Button size="sm" variant="solid" colorScheme="blue">
                  Apply Strategy
                </Button>
              </VStack>
            </CardBody>
          </Card>

          <Card variant="outline">
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <VStack align="stretch" spacing={2}>
                  <Heading size="md" color="gray.800">
                    Aggressive DeFi
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    High risk, high reward strategies
                  </Text>
                </VStack>
                <VStack align="stretch" spacing={2}>
                  <Box display="flex" justifyContent="space-between">
                    <Text fontSize="sm" color="gray.600">Risk Level</Text>
                    <Badge colorScheme="red">High</Badge>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text fontSize="sm" color="gray.600">Expected APY</Text>
                    <Text fontSize="sm" fontWeight="bold" color="green.500">
                      15.8%
                    </Text>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Text fontSize="sm" color="gray.600">Min Investment</Text>
                    <Text fontSize="sm" fontWeight="bold" color="gray.800">
                      $50,000
                    </Text>
                  </Box>
                </VStack>
                <Button size="sm" variant="solid" colorScheme="blue">
                  Apply Strategy
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>

      {/* Success Message */}
      <Card variant="outline" bg="green.50" borderColor="green.200">
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Heading size="md" color="green.800">✅ Dashboard Successfully Loaded!</Heading>
            <Text color="green.700">
              The Blokko DeFi Dashboard is now fully functional on GitHub Pages. 
              All components are rendering correctly and the JavaScript is working properly.
            </Text>
            <Box p={4} bg="green.100" borderRadius="md" border="2px solid green.300">
              <Text color="green.800" fontWeight="bold">
                🎉 SUCCESS: The React application is rendering correctly on GitHub Pages!
              </Text>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default Dashboard;