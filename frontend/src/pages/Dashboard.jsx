import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useMetrics } from '../context/MetricsContext';
import mockPortfolio from '../data/mockPortfolio';
import mockGrowthStrategies from '../data/mockGrowthStrategies';
import mockTransactionHistory from '../data/mockTransactionHistory';
import mockTreasury from '../data/mockTreasury';
import mockUpcomingTx from '../data/mockUpcomingTx';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function Dashboard() {
  const { metrics } = useMetrics();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const portfolioData = [
    { name: 'Jan', value: 200000 },
    { name: 'Feb', value: 220000 },
    { name: 'Mar', value: 235000 },
    { name: 'Apr', value: 250000 },
    { name: 'May', value: 265000 },
    { name: 'Jun', value: 280000 },
  ];

  // Create allocation data from mockPortfolio holdings
  const allocationData = mockPortfolio.holdings.flatMap(chain => 
    chain.positions.map(position => ({
      name: position.name,
      value: position.balance,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))
  );

  const apyData = [
    { protocol: 'Aave', apy: 8.5 },
    { protocol: 'Compound', apy: 7.2 },
    { protocol: 'Yearn', apy: 12.1 },
    { protocol: 'Curve', apy: 6.8 },
    { protocol: 'Convex', apy: 9.3 },
  ];

  return (
    <Box bg={bgColor} minH="100vh" p={6}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="2xl" bgGradient="linear(to-r, blue.500, purple.500)" bgClip="text" fontWeight="800">
            🚀 Blokko DeFi Dashboard
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Welcome back! Here's your portfolio overview and latest activity.
          </Text>
        </Box>

        {/* Key Metrics */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Card bg={cardBg} shadow="md">
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Portfolio Value</StatLabel>
                <StatNumber color="gray.800" fontSize="2xl">
                  ${mockPortfolio.portfolioValue.toLocaleString()}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  12.5% from last month
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="md">
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Active Networks</StatLabel>
                <StatNumber color="gray.800" fontSize="2xl">
                  {mockPortfolio.activeNetworks}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  2 new this month
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="md">
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Active Positions</StatLabel>
                <StatNumber color="gray.800" fontSize="2xl">
                  {mockPortfolio.activePositions}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  3 new positions
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="md">
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Current APY</StatLabel>
                <StatNumber color="green.500" fontSize="2xl">
                  {mockPortfolio.apy}%
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  0.8% increase
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Charts Row */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {/* Portfolio Growth Chart */}
          <Card bg={cardBg} shadow="md">
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="gray.800">
                  Portfolio Growth
                </Heading>
                <Box h="300px">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
                      <Line type="monotone" dataKey="value" stroke="#3182ce" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          {/* Portfolio Allocation */}
          <Card bg={cardBg} shadow="md">
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="gray.800">
                  Portfolio Allocation
                </Heading>
                <Box h="300px">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Growth Strategies */}
        <VStack align="stretch" spacing={6}>
          <Heading size="lg" color="gray.800">
            Growth Strategies
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {mockGrowthStrategies.map((strategy, index) => (
              <Card key={index} bg={cardBg} shadow="md">
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <VStack align="stretch" spacing={2}>
                      <Heading size="md" color="gray.800">
                        {strategy.name}
                      </Heading>
                      <Text fontSize="sm" color="gray.600">
                        {strategy.description}
                      </Text>
                    </VStack>
                    <VStack align="stretch" spacing={2}>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Risk Level</Text>
                        <Badge colorScheme={strategy.risk === 'Low' ? 'green' : strategy.risk === 'Medium' ? 'yellow' : 'red'}>
                          {strategy.risk}
                        </Badge>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Expected APY</Text>
                        <Text fontSize="sm" fontWeight="bold" color="green.500">
                          {strategy.expectedApy}%
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="gray.600">Min Investment</Text>
                        <Text fontSize="sm" fontWeight="bold" color="gray.800">
                          ${strategy.minInvestment.toLocaleString()}
                        </Text>
                      </HStack>
                    </VStack>
                    <Button size="sm" variant="solid" colorScheme="blue">
                      Apply Strategy
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>

        {/* Recent Transactions & Upcoming */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {/* Recent Transactions */}
          <Card bg={cardBg} shadow="md">
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="gray.800">
                  Recent Transactions
                </Heading>
                <Box overflowX="auto">
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr>
                        <Th>Type</Th>
                        <Th>Amount</Th>
                        <Th>Status</Th>
                        <Th>Time</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {mockTransactionHistory.slice(0, 5).map((tx, index) => (
                        <Tr key={index}>
                          <Td>
                            <HStack spacing={2}>
                              <Text fontSize="sm">{tx.type}</Text>
                            </HStack>
                          </Td>
                          <Td fontSize="sm">${tx.amount.toLocaleString()}</Td>
                          <Td>
                            <Badge colorScheme="green">Completed</Badge>
                          </Td>
                          <Td fontSize="sm">{tx.date}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          {/* Upcoming Transactions */}
          <Card bg={cardBg} shadow="md">
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="gray.800">
                  Upcoming Transactions
                </Heading>
                <VStack align="stretch" spacing={3}>
                  {mockUpcomingTx.slice(0, 4).map((tx, index) => (
                    <HStack key={index} justify="space-between" p={3} bg="gray.50" borderRadius="md">
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm" fontWeight="medium">{tx.description}</Text>
                        <Text fontSize="xs" color="gray.600">{tx.scheduledFor}</Text>
                      </VStack>
                      <Badge colorScheme="blue">Scheduled</Badge>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* APY Comparison */}
        <Card bg={cardBg} shadow="md">
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Heading size="md" color="gray.800">
                Protocol APY Comparison
              </Heading>
              <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={apyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="protocol" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'APY']} />
                    <Bar dataKey="apy" fill="#3182ce" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
}

export default Dashboard;