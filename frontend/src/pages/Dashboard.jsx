import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockPortfolio } from '../data/mockPortfolio';
import { mockGrowthStrategies } from '../data/mockGrowthStrategies';
import { mockTransactionHistory } from '../data/mockTransactionHistory';
import GrowthStrategyCard from '../components/Dashboard/GrowthStrategyCard';
import TransactionRow from '../components/Dashboard/TransactionRow';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import { mockTreasury } from '../data/mockTreasury';
import LiveYieldChart from '../components/Dashboard/LiveYieldChart';
import RiskScoreWidget from '../components/Dashboard/RiskScoreWidget';
import AutoAllocationSummary from '../components/Dashboard/AutoAllocationSummary';
import { mockUpcomingTx } from '../data/mockUpcomingTx';
import UpcomingTxCard from '../components/Dashboard/UpcomingTxCard';
import StatCard from '../components/UI/StatCard';
import NeumorphicCard from '../components/UI/NeumorphicCard';
import { 
  TriangleDownIcon, 
  ChevronUpIcon, 
  CheckCircleIcon, 
  ViewIcon,
  SettingsIcon,
  StarIcon 
} from '@chakra-ui/icons';

const COLORS = ['#0072E6', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

const Dashboard = () => {
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

  const [strategy, setStrategy] = useState({ id: 'custom', name: 'Custom', allocations: { stablecoins: 80, treasuries: 15, defi: 5 } });

  return (
    <VStack spacing={8} align="stretch">
      {/* Page Header */}
      <Box className="animate-slide-left">
        <Heading 
          size="2xl" 
          bgGradient="linear(to-r, blue.500, blue.600)" 
          bgClip="text"
          fontWeight="800"
          mb={2}
        >
          Dashboard
        </Heading>
        <Text color="gray.600" fontSize="lg">
          Your comprehensive DeFi portfolio overview
        </Text>
      </Box>

      {/* Stats Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 6 }} spacing={6}>
        <StatCard
          title="Total Stablecoins"
          value={`$${totalStablecoins.toLocaleString()}`}
          change="+2.4%"
          changeType="positive"
          icon={TriangleDownIcon}
          badge="Live"
          badgeColor="success"
          animation="fade-in"
        />
        <StatCard
          title="Blokko Treasury"
          value={`$${totalBlokkoTreasury.toLocaleString()}`}
          change="+1.8%"
          changeType="positive"
          icon={CheckCircleIcon}
          badge="Secure"
          badgeColor="brand"
          animation="fade-in"
        />
        <StatCard
          title="External Treasuries"
          value={`$${totalExternalTreasury.toLocaleString()}`}
          change="+3.2%"
          changeType="positive"
          icon={SettingsIcon}
          badge="Multi-chain"
          badgeColor="purple"
          animation="fade-in"
        />
        <StatCard
          title="DeFi Positions"
          value={`$${totalDefi.toLocaleString()}`}
          change="+5.7%"
          changeType="positive"
          icon={ChevronUpIcon}
          badge="High Yield"
          badgeColor="warning"
          animation="fade-in"
        />
        <StatCard
          title="Portfolio Value"
          value={`$${portfolioValue.toLocaleString()}`}
          change="+4.1%"
          changeType="positive"
          icon={ViewIcon}
          badge="Total"
          badgeColor="blue"
          animation="fade-in"
        />
        <StatCard
          title="Average APY"
          value={`${apy}%`}
          change="+0.3%"
          changeType="positive"
          icon={StarIcon}
          badge="Live"
          badgeColor="success"
          animation="fade-in"
        />
      </SimpleGrid>

      {/* Charts Section */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <NeumorphicCard variant="elevated" animation="slide-left">
          <VStack align="stretch" spacing={4}>
            <Heading size="md" color="gray.800">Allocation by Chain</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={allocationByChain} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={100} 
                  fill="#8884d8" 
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {allocationByChain.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                  labelStyle={{ color: 'gray.800' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </VStack>
        </NeumorphicCard>

        <NeumorphicCard variant="elevated" animation="slide-right">
          <VStack align="stretch" spacing={4}>
            <Heading size="md" color="gray.800">Allocation by Investment Type</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie 
                  data={investmentTypeData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={100} 
                  fill="#8884d8" 
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {investmentTypeData.map((entry, index) => (
                    <Cell key={`cell2-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                  labelStyle={{ color: 'gray.800' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </VStack>
        </NeumorphicCard>
      </SimpleGrid>

      {/* Live Yield and Risk Score */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        <LiveYieldChart />
        <RiskScoreWidget />
      </SimpleGrid>
      
      {/* Growth Strategies */}
      <VStack align="stretch" spacing={6}>
        <Heading size="lg" color="gray.800" className="animate-slide-left">
          Growth Strategies
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {mockGrowthStrategies.map((gs, index) => (
            <GrowthStrategyCard 
              key={gs.id} 
              strategy={gs} 
              animation={`slide-${index % 2 === 0 ? 'left' : 'right'}`}
            />
          ))}
        </SimpleGrid>
      </VStack>

      {/* Auto Allocation Summary */}
      <AutoAllocationSummary strategy={strategy} onStrategyChange={setStrategy} />

      {/* Recent Transactions */}
      <NeumorphicCard variant="default" animation="fade-in">
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between">
            <Heading size="md" color="gray.800">Recent Transactions</Heading>
            <Link as={RouterLink} to="/transactions" color="blue.500" fontWeight="600">
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
                {recentTxs.map(tx => <TransactionRow key={tx.id} tx={tx} />)}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </NeumorphicCard>

      {/* Upcoming Transactions */}
      <VStack align="stretch" spacing={6}>
        <Heading size="lg" color="gray.800" className="animate-slide-left">
          Upcoming Transactions
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {mockUpcomingTx.map((tx, index) => (
            <UpcomingTxCard 
              key={tx.id} 
              tx={tx} 
              animation={`slide-${index % 2 === 0 ? 'left' : 'right'}`}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default Dashboard;