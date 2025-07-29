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
  useColorModeValue
} from '@chakra-ui/react';
import { mockPortfolio } from '../data/mockPortfolio';
import HoldingsFilter from '../components/Holdings/HoldingsFilter';
import ProtocolDetailsAccordion from '../components/Holdings/ProtocolDetailsAccordion';
import NeumorphicCard from '../components/UI/NeumorphicCard';
import StatCard from '../components/UI/StatCard';
import { 
  TrendingUpIcon, 
  ShieldCheckIcon, 
  StarIcon,
  NetworkIcon,
  ChartBarIcon
} from '@chakra-ui/icons';

const Holdings = () => {
  const { holdings } = mockPortfolio;
  const chains = holdings.map(h => h.chain);
  const [chain, setChain] = useState('All');
  const [search, setSearch] = useState('');

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

  return (
    <VStack spacing={8} align="stretch">
      {/* Page Header */}
      <Box className="animate-slide-left">
        <Heading 
          size="2xl" 
          bgGradient="linear(to-r, brand.500, brand.600)" 
          bgClip="text"
          fontWeight="800"
          mb={2}
        >
          Holdings
        </Heading>
        <Text color="text.secondary" fontSize="lg">
          Your multi-chain DeFi portfolio breakdown
        </Text>
      </Box>

      {/* Portfolio Overview Stats */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <StatCard
          title="Total Portfolio Value"
          value={`$${totalValue.toLocaleString()}`}
          change="+3.2%"
          changeType="positive"
          icon={ChartBarIcon}
          badge="Live"
          badgeColor="success"
          animation="fade-in"
        />
        <StatCard
          title="Average APY"
          value={`${averageAPY.toFixed(2)}%`}
          change="+0.5%"
          changeType="positive"
          icon={TrendingUpIcon}
          badge="Optimized"
          badgeColor="warning"
          animation="fade-in"
        />
        <StatCard
          title="Active Positions"
          value={totalPositions.toString()}
          change="+2"
          changeType="positive"
          icon={StarIcon}
          badge="Active"
          badgeColor="brand"
          animation="fade-in"
        />
        <StatCard
          title="Networks"
          value={chains.length.toString()}
          change=""
          changeType="neutral"
          icon={NetworkIcon}
          badge="Multi-chain"
          badgeColor="purple"
          animation="fade-in"
        />
      </SimpleGrid>

      {/* Filters */}
      <NeumorphicCard variant="default" animation="slide-left">
        <HoldingsFilter 
          chain={chain} 
          setChain={setChain} 
          search={search} 
          setSearch={setSearch} 
          chains={chains} 
        />
      </NeumorphicCard>

      {/* Holdings by Chain */}
      <VStack spacing={6} align="stretch">
        {filtered.map((holding, index) => (
          <NeumorphicCard 
            key={holding.chain} 
            variant="elevated" 
            animation={`slide-${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <VStack align="stretch" spacing={4}>
              {/* Chain Header */}
              <HStack justify="space-between" align="center">
                <HStack spacing={3}>
                  <Box
                    p={2}
                    borderRadius="lg"
                    bg="brand.50"
                    color="brand.500"
                    className="animate-float"
                  >
                    <Icon as={NetworkIcon} boxSize={5} />
                  </Box>
                  <VStack align="start" spacing={0}>
                    <Heading size="md" color="text.primary">
                      {holding.chain}
                    </Heading>
                    <Text fontSize="sm" color="text.secondary">
                      {holding.positions.length} positions
                    </Text>
                  </VStack>
                </HStack>
                
                <HStack spacing={3}>
                  <VStack align="end" spacing={0}>
                    <Text fontSize="lg" fontWeight="700" color="text.primary">
                      ${holding.positions.reduce((sum, p) => sum + p.balance, 0).toLocaleString()}
                    </Text>
                    <Text fontSize="sm" color="text.secondary">
                      Total Value
                    </Text>
                  </VStack>
                  <Badge
                    colorScheme="success"
                    fontSize="xs"
                    borderRadius="full"
                    px={3}
                    py={1}
                    className="animate-pulse"
                  >
                    Live
                  </Badge>
                </HStack>
              </HStack>

              {/* Protocol Details */}
              <ProtocolDetailsAccordion positions={holding.positions} />
            </VStack>
          </NeumorphicCard>
        ))}
      </VStack>

      {/* Empty State */}
      {filtered.length === 0 && (
        <NeumorphicCard variant="default" animation="fade-in">
          <VStack spacing={4} py={8}>
            <Icon as={ChartBarIcon} boxSize={12} color="text.tertiary" />
            <Text fontSize="lg" color="text.secondary" fontWeight="600">
              No holdings found
            </Text>
            <Text fontSize="sm" color="text.tertiary" textAlign="center">
              Try adjusting your filters or search terms
            </Text>
          </VStack>
        </NeumorphicCard>
      )}
    </VStack>
  );
};

export default Holdings;