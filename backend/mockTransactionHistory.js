const mockTransactionHistory = [
  { id: 'txn1', date: '2023-10-27', type: 'Income', source: 'Shopify Sale', amount: 5000, currency: 'USDC' },
  { id: 'txn2', date: '2023-10-27', type: 'Deposit', destination: 'Aave', amount: 2500, currency: 'USDC' },
  { id: 'txn3', date: '2023-10-27', type: 'Deposit', destination: 'GMX', amount: 2500, currency: 'USDC' },
  { id: 'txn4', date: '2023-10-27', type: 'Income', source: 'Stripe Payout', amount: 10000, currency: 'USDT' },
  { id: 'txn5', date: '2023-10-27', type: 'Deposit', destination: 'Curve', amount: 4000, currency: 'USDT' },
  { id: 'txn6', date: '2023-10-27', type: 'Yield', source: 'Aave', amount: 10.5, currency: 'USDC' },
  { id: 'txn7', date: '2023-10-26', type: 'Deposit', source: 'Manual', amount: 25000, currency: 'DAI' },
  { id: 'txn8', date: '2023-10-26', type: 'Yield', source: 'GMX', amount: 25.2, currency: 'USDC' },
];

module.exports = { mockTransactionHistory };