import React from 'react';
import { Tr, Td, Tag } from '@chakra-ui/react';

const TransactionRow = ({ tx }) => {
  const typeColor = {
    Income: 'green',
    Deposit: 'blue',
    Yield: 'purple',
  };
  return (
    <Tr>
      <Td>{tx.date}</Td>
      <Td><Tag colorScheme={typeColor[tx.type] || 'gray'}>{tx.type}</Tag></Td>
      <Td>{tx.source || tx.destination}</Td>
      <Td isNumeric>{tx.amount.toLocaleString()} {tx.currency}</Td>
    </Tr>
  );
};

export default TransactionRow;