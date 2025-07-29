import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Heading, 
  VStack, 
  HStack, 
  Text, 
  SimpleGrid,
  Badge,
  Icon,
  Tooltip,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useBreakpointValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import { mockPortfolio } from '../data/mockPortfolio';
import { 
  ChevronUpIcon, 
  CheckCircleIcon, 
  StarIcon,
  SettingsIcon,
  ViewIcon,
  SearchIcon,
  TimeIcon,
} from '@chakra-ui/icons';

const Holdings = () => {
  const { holdings } = mockPortfolio;
  const chains = holdings.map(h => h.chain);
  const [chain, setChain] = useState('All');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const filtered = useMemo(() => {
    let list = [...holdings];
    if (chain !== 'All') list = list.filter(h => h.chain === chain);
    if (search) {
      const s = search.toLowerCase();
      list = list.map(h => ({ 
        ...h, 
        positions: h.positions.filter(p => p.name.toLowerCase().includes(s)) 
      })).filter(h => h.positions.length > 0);
    }
    return list;
  }, [chain, search, holdings]);

  // Calculate portfolio metrics
  const totalValue = holdings.reduce((sum, h) => 
    sum + h.positions.reduce((pSum, p) => pSum + p.balance, 0), 0
  );
  
  const averageAPY = holdings.reduce((sum, h) => 
    sum + h.positions.reduce((pSum, p) => pSum + (p.apy || 0), 0), 0
  ) / holdings.reduce((sum, h) => sum + h.positions.length, 0);

  const totalPositions = holdings.reduce((sum, h) => sum + h.positions.length, 0);
  const activeChains = new Set(holdings.map(h => h.chain)).size;

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low': return 'green';
      case 'medium': return 'yellow';
      case 'high': return 'red';
      default: return 'gray';
    }
  };

  const getChainIcon = (chain) => {
    const icons = {
      'Ethereum': '🔷',
      'Arbitrum': '🔵',
      'Polygon': '🟣',
      'Optimism': '🔴',
      'Base': '🔵',
    };
    return icons[chain] || '🪙';
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <VStack spacing={8} align="stretch">
      {/* Page Header */}
      <Box>
        <Heading 
          size="2xl" 
          bgGradient="linear(to-r, blue.500, purple.500)" 
          bgClip="text"
          fontWeight="800"
          mb={2}
        >
          Holdings
        </Heading>
        <Text color="gray.600" fontSize="lg">
          Your multi-chain DeFi portfolio breakdown
        </Text>
      </Box>

      {/* Portfolio Overview Stats */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <Card variant="glass">
          <CardBody>
            <Stat>
              <StatLabel color="gray.600" fontSize="sm">Total Portfolio Value</StatLabel>
              <StatNumber fontSize="2xl" fontWeight="bold" color="gray.800">
                ${totalValue.toLocaleString()}
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                3.2% from last month
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card variant="glass">
          <CardBody>
            <Stat>
              <StatLabel color="gray.600" fontSize="sm">Average APY</StatLabel>
              <StatNumber fontSize="2xl" fontWeight="bold" color="green.500">
                {averageAPY.toFixed(2)}%
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
              <StatLabel color="gray.600" fontSize="sm">Active Positions</StatLabel>
              <StatNumber fontSize="2xl" fontWeight="bold" color="gray.800">
                {totalPositions}
              </StatNumber>
              <StatHelpText>
                Across {activeChains} chains
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card variant="glass">
          <CardBody>
            <Stat>
              <StatLabel color="gray.600" fontSize="sm">Risk Score</StatLabel>
              <StatNumber fontSize="2xl" fontWeight="bold" color="yellow.500">
                24
              </StatNumber>
              <StatHelpText>
                Low risk portfolio
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Filters and Search */}
      <Card variant="glass">
        <CardBody>
          <HStack spacing={4} wrap="wrap">
            <Select
              value={chain}
              onChange={(e) => setChain(e.target.value)}
              maxW="200px"
              size="sm"
            >
              <option value="All">All Chains</option>
              {chains.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
            
            <InputGroup maxW="300px" size="sm">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.500" />
              </InputLeftElement>
              <Input
                placeholder="Search protocols..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </HStack>
        </CardBody>
      </Card>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onChange={setActiveTab} variant="enclosed">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>By Chain</Tab>
          <Tab>By Protocol</Tab>
        </TabList>

        <TabPanels>
          {/* Overview Tab */}
          <TabPanel>
            <VStack spacing={6} align="stretch">
              {filtered.map((chain) => (
                <Card key={chain.chain} variant="neon">
                  <CardHeader>
                    <HStack justify="space-between">
                      <HStack spacing={3}>
                        <Avatar size="sm" name={chain.chain} src="" />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="bold" color="gray.800">
                            {chain.chain}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {chain.positions.length} positions
                          </Text>
                        </VStack>
                      </HStack>
                      <VStack align="end" spacing={0}>
                        <Text fontWeight="bold" color="gray.800">
                          ${chain.positions.reduce((sum, p) => sum + p.balance, 0).toLocaleString()}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          {chain.positions.reduce((sum, p) => sum + (p.apy || 0), 0) / chain.positions.length}% APY
                        </Text>
                      </VStack>
                    </HStack>
                  </CardHeader>
                  <CardBody pt={0}>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                      {chain.positions.map((position) => (
                        <Box
                          key={position.name}
                          p={4}
                          bg="gray.50"
                          borderRadius="lg"
                          border="1px solid"
                          borderColor="gray.200"
                          _hover={{
                            bg: 'gray.100',
                            borderColor: 'blue.200',
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg',
                          }}
                          transition="all 0.2s"
                        >
                          <HStack justify="space-between" mb={2}>
                            <Text fontWeight="600" color="gray.800">
                              {position.name}
                            </Text>
                            <Badge
                              colorScheme={getRiskColor(position.risk)}
                              variant="subtle"
                              fontSize="xs"
                            >
                              {position.risk || 'Low'}
                            </Badge>
                          </HStack>
                          
                          <VStack align="start" spacing={1}>
                            <Text fontSize="sm" color="gray.600">
                              Balance: ${position.balance.toLocaleString()}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              APY: {position.apy || 0}%
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              Category: {position.category}
                            </Text>
                          </VStack>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </TabPanel>

          {/* By Chain Tab */}
          <TabPanel>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {filtered.map((chain) => (
                <Card key={chain.chain} variant="glass">
                  <CardHeader>
                    <HStack justify="space-between">
                      <HStack spacing={3}>
                        <Text fontSize="2xl">{getChainIcon(chain.chain)}</Text>
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="bold" color="gray.800">
                            {chain.chain}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {chain.positions.length} positions
                          </Text>
                        </VStack>
                      </HStack>
                    </HStack>
                  </CardHeader>
                  <CardBody pt={0}>
                    <VStack spacing={4} align="stretch">
                      <Box>
                        <HStack justify="space-between" mb={2}>
                          <Text fontSize="sm" color="gray.600">Total Value</Text>
                          <Text fontSize="sm" fontWeight="bold" color="gray.800">
                            ${chain.positions.reduce((sum, p) => sum + p.balance, 0).toLocaleString()}
                          </Text>
                        </HStack>
                        <Progress
                          value={chain.positions.reduce((sum, p) => sum + p.balance, 0) / totalValue * 100}
                          colorScheme="blue"
                          borderRadius="full"
                          size="sm"
                        />
                      </Box>
                      
                      <Box>
                        <HStack justify="space-between" mb={2}>
                          <Text fontSize="sm" color="gray.600">Average APY</Text>
                          <Text fontSize="sm" fontWeight="bold" color="green.500">
                            {(chain.positions.reduce((sum, p) => sum + (p.apy || 0), 0) / chain.positions.length).toFixed(2)}%
                          </Text>
                        </HStack>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </TabPanel>

          {/* By Protocol Tab */}
          <TabPanel>
            <VStack spacing={4} align="stretch">
              {filtered.flatMap(chain => 
                chain.positions.map(position => ({
                  ...position,
                  chain: chain.chain
                }))
              ).map((position, index) => (
                <Card key={`${position.chain}-${position.name}-${index}`} variant="glass">
                  <CardBody>
                    <HStack justify="space-between">
                      <HStack spacing={4}>
                        <Avatar size="md" name={position.name} src="" />
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold" color="gray.800">
                            {position.name}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {position.chain} • {position.category}
                          </Text>
                        </VStack>
                      </HStack>
                      
                      <VStack align="end" spacing={1}>
                        <Text fontWeight="bold" color="gray.800">
                          ${position.balance.toLocaleString()}
                        </Text>
                        <Text fontSize="sm" color="green.500">
                          {position.apy || 0}% APY
                        </Text>
                        <Badge
                          colorScheme={getRiskColor(position.risk)}
                          variant="subtle"
                          fontSize="xs"
                        >
                          {position.risk || 'Low'} Risk
                        </Badge>
                      </VStack>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default Holdings;