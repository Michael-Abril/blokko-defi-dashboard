import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SwapComparisonChart = ({ quotes }) => {
  const data = quotes.map(q=>({ name: q.dex, output: Number(q.outputAmount) }));
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md" w="full">
      <Heading size="md" mb={4}>DEX Output Comparison</Heading>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="output" fill="#3182CE" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SwapComparisonChart;