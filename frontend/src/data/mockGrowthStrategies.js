export const mockGrowthStrategies = [
  {
    id: 'strategy1',
    name: 'Passive Saver',
    headline: '100% Stablecoins',
    description: 'Keep all funds in USD-pegged stablecoins across multiple blockchains for maximum liquidity and minimum risk.',
    allocations: {
      stablecoins: 100,
      treasuries: 0,
      defi: 0,
    },
    expectedApy: 4.2,
    minInvestment: 10000,
    risk: 'Low',
  },
  {
    id: 'strategy2',
    name: 'Yield Seeker',
    headline: '80% Stable | 15% Treasuries | 5% DeFi',
    description:
      'Allocate the majority to stablecoins while putting a small percentage to on-chain treasuries and vetted DeFi protocols to earn additional yield.',
    allocations: {
      stablecoins: 80,
      treasuries: 15,
      defi: 5,
    },
    expectedApy: 6.8,
    minInvestment: 25000,
    risk: 'Medium',
  },
  {
    id: 'strategy3',
    name: 'Growth Explorer',
    headline: '60% Stable | 25% Treasuries | 15% DeFi',
    description:
      'A more aggressive mix that increases exposure to tokenized treasuries and DeFi strategies governed by the Investment DAO.',
    allocations: {
      stablecoins: 60,
      treasuries: 25,
      defi: 15,
    },
    expectedApy: 9.5,
    minInvestment: 50000,
    risk: 'High',
  },
];

// Add default export for compatibility
export default mockGrowthStrategies;