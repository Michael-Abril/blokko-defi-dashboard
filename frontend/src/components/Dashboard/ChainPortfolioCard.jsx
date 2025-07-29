import React from 'react';
import { Box, Heading, VStack, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const PositionRow = ({ position }) => {
    return (
        <Tr>
            <Td>{position.name}</Td>
            <Td>{position.category}</Td>
            <Td isNumeric>{position.apy}%</Td>
            <Td isNumeric>${position.balance.toLocaleString()}</Td>
        </Tr>
    )
}

const ChainPortfolioCard = ({ holding }) => {
  return (
    <Box bg="white" p={5} borderRadius="lg" boxShadow="md" mb={5}>
      <Heading size="md" mb={4}>{holding.chain}</Heading>
      <Table variant="simple">
        <Thead>
            <Tr><Th>Protocol</Th><Th>Category</Th><Th isNumeric>APY</Th><Th isNumeric>Balance</Th></Tr>
        </Thead>
        <Tbody>
            {holding.positions.map(position => <PositionRow key={position.name} position={position} />)}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ChainPortfolioCard;