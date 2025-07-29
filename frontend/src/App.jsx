import { Box, VStack, HStack, Heading, Text, SimpleGrid, Card, CardBody, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Button } from '@chakra-ui/react';

function App() {
  return (
    <Box bg="gray.50" color="gray.800" minH="100vh" p={8}>
      {/* Test message to verify deployment */}
      <Box 
        position="fixed" 
        top="10px" 
        right="10px" 
        bg="red.500" 
        color="white" 
        p={2} 
        borderRadius="md" 
        zIndex={9999}
        fontSize="sm"
      >
        DEPLOYMENT TEST - {new Date().toLocaleTimeString()}
      </Box>
      
      {/* Main Content */}
      <VStack spacing={8} align="stretch" maxW="1200px" mx="auto">
        {/* Header */}
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
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Risk Level</Text>
                      <Badge colorScheme="green">Low</Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Expected APY</Text>
                      <Text fontSize="sm" fontWeight="bold" color="green.500">
                        6.5%
                      </Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Min Investment</Text>
                      <Text fontSize="sm" fontWeight="bold" color="gray.800">
                        $10,000
                      </Text>
                    </HStack>
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
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Risk Level</Text>
                      <Badge colorScheme="yellow">Medium</Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Expected APY</Text>
                      <Text fontSize="sm" fontWeight="bold" color="green.500">
                        9.2%
                      </Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Min Investment</Text>
                      <Text fontSize="sm" fontWeight="bold" color="gray.800">
                        $25,000
                      </Text>
                    </HStack>
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
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Risk Level</Text>
                      <Badge colorScheme="red">High</Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Expected APY</Text>
                      <Text fontSize="sm" fontWeight="bold" color="green.500">
                        15.8%
                      </Text>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="gray.600">Min Investment</Text>
                      <Text fontSize="sm" fontWeight="bold" color="gray.800">
                        $50,000
                      </Text>
                    </HStack>
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
              <Box p={4} bg="green.100" borderRadius="md" border="2px solid" borderColor="green.300">
                <Text color="green.800" fontWeight="bold">
                  🎉 SUCCESS: The React application is rendering correctly on GitHub Pages!
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
      
      {/* Simple AI Chat Icon */}
      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        width="60px"
        height="60px"
        bg="teal.500"
        borderRadius="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        boxShadow="0 4px 8px rgba(0,0,0,0.2)"
        zIndex={1000}
        _hover={{ transform: 'scale(1.1)' }}
        transition="transform 0.2s"
      >
        <Text color="white" fontSize="24px">💬</Text>
      </Box>
    </Box>
  );
}

export default App;