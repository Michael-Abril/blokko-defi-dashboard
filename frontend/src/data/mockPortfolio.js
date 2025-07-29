export const mockPortfolio = {
  portfolioValue: 250000,
  activeNetworks: 4,
  activePositions: 12,
  apy: 8.75,
  holdings: [
    {
      chain: 'Ethereum',
      allocation: 40,
      positions: [
        { name: 'Aave', category: 'Lending', apy: 5.2, balance: 50000 },
        { name: 'Curve', category: 'DEX', apy: 7.1, balance: 30000 },
        { name: 'Lido', category: 'Staking', apy: 4.5, balance: 20000 },
      ],
    },
    {
      chain: 'Arbitrum',
      allocation: 30,
      positions: [
        { name: 'GMX', category: 'Derivatives', apy: 12.5, balance: 40000 },
        { name: 'Uniswap', category: 'DEX', apy: 6.8, balance: 35000 },
      ],
    },
    {
      chain: 'Polygon',
      allocation: 20,
      positions: [
        { name: 'QuickSwap', category: 'DEX', apy: 8.2, balance: 25000 },
        { name: 'Balancer', category: 'DEX', apy: 7.9, balance: 25000 },
      ],
    },
    {
      chain: 'Optimism',
      allocation: 10,
      positions: [
        { name: 'Velodrome', category: 'DEX', apy: 9.5, balance: 25000 },
      ],
    },
  ],
};