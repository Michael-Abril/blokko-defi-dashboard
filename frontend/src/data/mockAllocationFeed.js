export const mockAllocationFeed = [
  {
    id: 1,
    timestamp: '2023-10-27T10:00:00Z',
    source: 'Incoming Shopify Sale',
    amount: 5000,
    allocations: [
      { protocol: 'Aave', chain: 'Ethereum', amount: 2500, category: 'Lending' },
      { protocol: 'GMX', chain: 'Arbitrum', amount: 2500, category: 'Derivatives' },
    ],
  },
  {
    id: 2,
    timestamp: '2023-10-27T09:30:00Z',
    source: 'Incoming Stripe Payout',
    amount: 10000,
    allocations: [
      { protocol: 'Curve', chain: 'Ethereum', amount: 4000, category: 'DEX' },
      { protocol: 'Uniswap', chain: 'Arbitrum', amount: 3000, category: 'DEX' },
      { protocol: 'QuickSwap', chain: 'Polygon', amount: 3000, category: 'DEX' },
    ],
  },
  {
    id: 3,
    timestamp: '2023-10-26T15:00:00Z',
    source: 'Incoming Manual Deposit',
    amount: 25000,
    allocations: [
      { protocol: 'Lido', chain: 'Ethereum', amount: 10000, category: 'Staking' },
      { protocol: 'Velodrome', chain: 'Optimism', amount: 15000, category: 'DEX' },
    ],
  },
];