import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Progress,
  Badge,
  Button,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { mockPortfolio } from '../data/mockPortfolio';
import { mockGrowthStrategies } from '../data/mockGrowthStrategies';
import { mockTransactionHistory } from '../data/mockTransactionHistory';
import { mockTreasury } from '../data/mockTreasury';
import { mockUpcomingTx } from '../data/mockUpcomingTx';
import { Link as RouterLink } from 'react-router-dom';
import { 
  ChevronUpIcon, 
  CheckCircleIcon, 
  ViewIcon,
  SettingsIcon,
  StarIcon,
  TimeIcon,
} from '@chakra-ui/icons';

const COLORS = ['#0072E6', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const Dashboard = () => {
  console.log('Dashboard component rendering...');
  
  try {
    const { portfolioValue, activeNetworks, activePositions, apy, holdings } = mockPortfolio;

    const allocationByChain = holdings.map(h => ({ name: h.chain, value: h.allocation }));
    const allocationByCategory = holdings
      .flatMap(h => h.positions.map(p => ({ ...p, chain: h.chain })))
      .reduce((acc, position) => {
        const existing = acc.find(item => item.name === position.category);
        if (existing) {
          existing.value += position.balance;
        } else {
          acc.push({ name: position.category, value: position.balance });
        }
        return acc;
      }, []);

    const totalStablecoins = holdings.reduce((sum,h)=> sum + h.positions.reduce((pSum,p)=>pSum+p.balance,0),0);
    const recentTxs = mockTransactionHistory.slice(0,5);
    const { blokkoTreasury, externalTreasuries } = mockTreasury;
    const totalBlokkoTreasury = blokkoTreasury.balance;
    const totalExternalTreasury = externalTreasuries.reduce((sum, t) => sum + t.balance, 0);
    const totalDefi = totalStablecoins - (totalBlokkoTreasury + totalExternalTreasury);
    const investmentTypeData = [
      { name: 'Blokko Treasury', value: totalBlokkoTreasury },
      { name: 'External Treasuries', value: totalExternalTreasury },
      { name: 'DeFi', value: totalDefi },
    ];

    // Mock yield data for chart
    const yieldData = [
      { date: 'Jan', yield: 5.2 },
      { date: 'Feb', yield: 5.8 },
      { date: 'Mar', yield: 6.1 },
      { date: 'Apr', yield: 7.2 },
      { date: 'May', yield: 8.1 },
      { date: 'Jun', yield: 8.2 },
    ];

    const [strategy, setStrategy] = useState({ id: 'custom', name: 'Custom', allocations: { stablecoins: 80, treasuries: 15, defi: 5 } });

    console.log('Dashboard data loaded successfully');

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
            Welcome back! Here's your portfolio overview and latest activity.
          </Text>
        </Box>

        {/* Portfolio Overview Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Card variant="glass">
            <CardBody>
              <Stat>
                <StatLabel color="text.secondary">Portfolio Value</StatLabel>
                <StatNumber color="text.primary" fontSize="2xl">
                  ${portfolioValue.toLocaleString()}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  12.5% from last month
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card variant="glass">
            <CardBody>
              <Stat>
                <StatLabel color="text.secondary">Active Networks</StatLabel>
                <StatNumber color="text.primary" fontSize="2xl">
                  {activeNetworks}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  2 new this month
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card variant="glass">
            <CardBody>
              <Stat>
                <StatLabel color="text.secondary">Active Positions</StatLabel>
                <StatNumber color="text.primary" fontSize="2xl">
                  {activePositions}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  3 new positions
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card variant="glass">
            <CardBody>
              <Stat>
                <StatLabel color="text.secondary">Current APY</StatLabel>
                <StatNumber color="success.500" fontSize="2xl">
                  {apy}%
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  0.8% increase
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Charts Section */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          {/* Allocation by Chain */}
          <Card variant="glass">
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="text.primary">Allocation by Chain</Heading>
                <Box height="300px">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationByChain}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {allocationByChain.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          {/* Yield Performance */}
          <Card variant="glass">
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="text.primary">Yield Performance</Heading>
                <Box height="300px">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={yieldData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="yield" stroke="#0072E6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Growth Strategies */}
        <VStack align="stretch" spacing={6}>
          <Heading size="lg" color="text.primary">
            Growth Strategies
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {mockGrowthStrategies.map((gs) => (
              <Card key={gs.id} variant="neon">
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <VStack align="stretch" spacing={2}>
                      <Heading size="md" color="text.primary">
                        {gs.name}
                      </Heading>
                      <Text fontSize="sm" color="text.secondary">
                        {gs.headline}
                      </Text>
                      <Text fontSize="xs" color="text.secondary">
                        {gs.description}
                      </Text>
                    </VStack>
                    <VStack align="stretch" spacing={2}>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="text.secondary">Risk Level</Text>
                        <Badge colorScheme={gs.risk === 'Low' ? 'green' : gs.risk === 'Medium' ? 'yellow' : 'red'}>
                          {gs.risk}
                        </Badge>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="text.secondary">Expected APY</Text>
                        <Text fontSize="sm" fontWeight="bold" color="success.500">
                          {gs.expectedApy}%
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="text.secondary">Min Investment</Text>
                        <Text fontSize="sm" fontWeight="bold" color="text.primary">
                          ${gs.minInvestment.toLocaleString()}
                        </Text>
                      </HStack>
                    </VStack>
                    <Button size="sm" variant="solid" colorScheme="secondary">
                      Apply Strategy
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Recent Transactions */}
        <Card variant="glass">
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <Heading size="md" color="text.primary">Recent Transactions</Heading>
                <Link as={RouterLink} to="/transactions" color="secondary.500" fontWeight="600">
                  View all →
                </Link>
              </HStack>
              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Type</Th>
                      <Th>Source / Destination</Th>
                      <Th isNumeric>Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recentTxs.map(tx => (
                      <Tr key={tx.id}>
                        <Td>{new Date(tx.timestamp).toLocaleDateString()}</Td>
                        <Td>
                          <Badge colorScheme={tx.type === 'Swap' ? 'blue' : tx.type === 'Bridge' ? 'purple' : 'green'}>
                            {tx.type}
                          </Badge>
                        </Td>
                        <Td>{tx.source} → {tx.destination}</Td>
                        <Td isNumeric>${tx.amount.toLocaleString()}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Upcoming Transactions */}
        <VStack align="stretch" spacing={6}>
          <Heading size="lg" color="text.primary">
            Upcoming Transactions
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {mockUpcomingTx.map((tx, index) => (
              <Card key={tx.id} variant="neon">
                <CardBody>
                  <VStack align="stretch" spacing={3}>
                    <HStack justify="space-between">
                      <Text fontWeight="bold" color="text.primary">
                        {tx.type}
                      </Text>
                      <Badge colorScheme="warning" variant="subtle">
                        Pending
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="text.secondary">
                      {tx.description}
                    </Text>
                    <VStack align="stretch" spacing={1}>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="text.secondary">Amount</Text>
                        <Text fontSize="sm" fontWeight="bold" color="text.primary">
                          ${tx.amount.toLocaleString()}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="text.secondary">Scheduled</Text>
                        <Text fontSize="sm" fontWeight="bold" color="text.primary">
                          {new Date(tx.scheduledFor).toLocaleDateString()}
                        </Text>
                      </HStack>
                    </VStack>
                    <Button size="sm" variant="outline" colorScheme="secondary">
                      View Details
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </VStack>
    );
  } catch (error) {
    console.error('Error in Dashboard component:', error);
    return (
      <Box p={8} textAlign="center">
        <Text fontSize="xl" color="red.500">
          Error loading dashboard: {error.message}
        </Text>
      </Box>
    );
  }
};

export default Dashboard;