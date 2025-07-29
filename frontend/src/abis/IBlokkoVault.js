export const IBlokkoVaultABI = [
  {
    "inputs": [
      {
        "components": [
          { "internalType": "address[]", "name": "adapters", "type": "address[]" },
          { "internalType": "uint256[]", "name": "allocations", "type": "uint256[]" }
        ],
        "internalType": "struct IBlokkoVault.Strategy",
        "name": "_strategy",
        "type": "tuple"
      }
    ],
    "name": "setStrategy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];