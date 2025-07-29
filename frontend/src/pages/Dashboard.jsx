import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
    <Box>
      <SimpleGrid columns={{ base: 1, md: 6 }} spacing={10} mb={10}>
        <Stat bg="white" p={6} borderRadius="lg" boxShadow="md"><StatLabel>Total Stablecoins</StatLabel><StatNumber>${totalStablecoins.toLocaleString()}</StatNumber></Stat>
        <Stat bg="white" p={6} borderRadius="lg" boxShadow="md"><StatLabel>Blokko Treasury</StatLabel><StatNumber>${totalBlokkoTreasury.toLocaleString()}</StatNumber></Stat>
        <Stat bg="white" p={6} borderRadius="lg" boxShadow="md"><StatLabel>External Treasuries</StatLabel><StatNumber>${totalExternalTreasury.toLocaleString()}</StatNumber></Stat>
        <Stat bg="white" p={6} borderRadius="lg" boxShadow="md"><StatLabel>DeFi Positions</StatLabel><StatNumber>${totalDefi.toLocaleString()}</StatNumber></Stat>
        <Stat bg="white" p={6} borderRadius="lg" boxShadow="md"><StatLabel>Portfolio Value</StatLabel><StatNumber>${portfolioValue.toLocaleString()}</StatNumber></Stat>
        <Stat bg="white" p={6} borderRadius="lg" boxShadow="md"><StatLabel>Average APY</StatLabel><StatNumber>{apy}%</StatNumber></Stat>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} mb={10}>
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4}>Allocation by Chain</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={allocationByChain} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {allocationByChain.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
          <Heading size="md" mb={4}>Allocation by Investment Type</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={investmentTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {investmentTypeData.map((entry, index) => <Cell key={`cell2-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>
      
      <Heading size="lg" mb={5}>Growth Strategies</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>{mockGrowthStrategies.map(gs => <GrowthStrategyCard key={gs.id} strategy={gs} />)}</SimpleGrid>

      {/* Allocation summary row */}
      <SimpleGrid columns={{ base: 1, lg: 1 }} spacing={10} mb={10}>
        <AutoAllocationSummary strategy={strategy} onStrategyChange={setStrategy} />
      </SimpleGrid>

      <Heading size="lg" mb={5}>Recent Transactions <Link as={RouterLink} to="/transactions" color="brand.primary" fontSize="md">View all</Link></Heading>
      <Table variant="simple" bg="white" borderRadius="lg" boxShadow="md" mb={10}><Thead><Tr><Th>Date</Th><Th>Type</Th><Th>Source / Destination</Th><Th isNumeric>Amount</Th></Tr></Thead><Tbody>{recentTxs.map(tx => <TransactionRow key={tx.id} tx={tx} />)}</Tbody></Table>

      {/* Upcoming Tx Row */}
      <Heading size="lg" mb={5}>Upcoming Transactions</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
        {mockUpcomingTx.map(tx => <UpcomingTxCard key={tx.id} tx={tx} />)}
      </SimpleGrid>

      {/* Yield & Risk Row */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} mb={10}>
        <LiveYieldChart />
        <RiskScoreWidget />
      </SimpleGrid>

      {/* Remove detailed holdings here. Provide link instead */}
      <Box textAlign="center" my={10}><Link as={RouterLink} to="/holdings" color="brand.primary" fontWeight="bold">View Detailed Holdings ➜</Link></Box>
    </Box>
  );
};

export default Dashboard;