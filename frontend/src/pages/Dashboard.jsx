import React, { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
} from '@chakra-ui/react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockPortfolio } from '../data/mockPortfolio';
import ChainPortfolioCard from '../components/Dashboard/ChainPortfolioCard';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const { portfolioValue, activeNetworks, activePositions, apy, holdings } = mockPortfolio;
  const [ethPrice, setEthPrice] = useState(null);

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

  useEffect(() => {
    const fetchPrice = async () => {
        const { data } = await axios.get('http://localhost:3001/api/v1/market/prices', {
            params: { ids: 'ethereum' }
        });
        setEthPrice(data.ethereum.usd);
    }
    fetchPrice();
  }, []);

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10} mb={10}>
        <Stat bg="white" p={6} borderRadius="lg" boxShadow="md">
            <StatLabel>Portfolio Value</StatLabel>
            <StatNumber>${portfolioValue.toLocaleString()}</StatNumber>
        </Stat>
        <Stat bg="white" p={6} borderRadius="lg" boxShadow="md">
            <StatLabel>Active Networks</StatLabel>
            <StatNumber>{activeNetworks}</StatNumber>
        </Stat>
        <Stat bg="white" p={6} borderRadius="lg" boxShadow="md">
            <StatLabel>ETH Price</StatLabel>
            <StatNumber>${ethPrice ? ethPrice.toLocaleString() : 'Loading...'}</StatNumber>
        </Stat>
        <Stat bg="white" p={6} borderRadius="lg" boxShadow="md">
            <StatLabel>Average APY</StatLabel>
            <StatNumber>{apy}%</StatNumber>
        </Stat>
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
          <Heading size="md" mb={4}>Allocation by Category</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={allocationByCategory}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>
      
      <Heading size="lg" mb={5}>Detailed Holdings</Heading>
      {holdings.map(holding => (
        <ChainPortfolioCard key={holding.chain} holding={holding} />
      ))}
    </Box>
  );
};

export default Dashboard;