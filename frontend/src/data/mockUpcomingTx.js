export const mockUpcomingTx = [
  {
    id: 'up1',
    date: '2024-08-15',
    type: 'Bridge',
    chainFrom: 'Ethereum',
    chainTo: 'Arbitrum',
    amount: 15000,
    token: 'USDC',
    status: 'Scheduled',
    description: 'Bridge USDC from Ethereum to Arbitrum for yield farming',
    scheduledFor: '2024-08-15T10:00:00Z',
  },
  {
    id: 'up2',
    date: '2024-08-16',
    type: 'Swap',
    dex: 'Uniswap V3',
    fromToken: 'USDC',
    toToken: 'DAI',
    amount: 10000,
    estRate: 0.999,
    status: 'Scheduled',
    description: 'Swap USDC to DAI for portfolio rebalancing',
    scheduledFor: '2024-08-16T14:30:00Z',
  },
  {
    id: 'up3',
    date: '2024-08-20',
    type: 'Deposit',
    protocol: 'Aave',
    chain: 'Polygon',
    amount: 5000,
    token: 'USDT',
    status: 'Pending Approval',
    description: 'Deposit USDT to Aave on Polygon for lending yield',
    scheduledFor: '2024-08-20T09:15:00Z',
  },
];

// Add default export for compatibility
export default mockUpcomingTx;