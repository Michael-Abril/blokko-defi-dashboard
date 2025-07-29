export const mockTreasury = {
  blokkoTreasury: {
    chain: 'Ethereum',
    balance: 120000,
  },
  externalTreasuries: [
    { id: 'ext1', chain: 'Arbitrum', provider: 'Circle Treasury', balance: 25000 },
    { id: 'ext2', chain: 'Polygon', provider: 'JP Morgan Onyx', balance: 15000 },
  ],
};

// Add default export for compatibility
export default mockTreasury;