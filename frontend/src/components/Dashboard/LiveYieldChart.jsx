import React, { useState, useMemo } from 'react';
import { Box, HStack, Button, Heading } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { mockYieldHistory } from '../../data/mockYieldHistory';

const TF_OPTIONS = [
  { label: 'Daily', key: 'daily' },
  { label: 'Weekly', key: 'weekly' },
  { label: 'Monthly', key: 'monthly' },
];

const aggregateData = (data, tf) => {
  if (tf === 'daily') return data;
  const bucketSize = tf === 'weekly' ? 7 : 30;
  const buckets = [];
  for (let i = 0; i < data.length; i += bucketSize) {
    const slice = data.slice(i, i + bucketSize);
    const avg = slice.reduce((sum, d) => sum + d.yieldPct, 0) / slice.length;
    buckets.push({ date: slice[0].date, yieldPct: +avg.toFixed(3) });
  }
  return buckets;
};

const LiveYieldChart = () => {
  const [tf, setTf] = useState('daily');
  const chartData = useMemo(() => aggregateData(mockYieldHistory, tf), [tf]);

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <HStack justify="space-between" mb={4}>
        <Heading size="md">Live Yield</Heading>
        <HStack>
          {TF_OPTIONS.map((opt) => (
            <Button key={opt.key} size="sm" variant={tf === opt.key ? 'solid' : 'outline'} colorScheme="brand" onClick={() => setTf(opt.key)}>
              {opt.label}
            </Button>
          ))}
        </HStack>
      </HStack>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="date" hide />
          <YAxis domain={['auto', 'auto']} tickFormatter={(v)=>`${(v*100).toFixed(1)}%`} />
          <Tooltip formatter={(v)=>`${(v*100).toFixed(2)}%`} labelFormatter={(l)=>l} />
          <Line type="monotone" dataKey="yieldPct" stroke="#3182CE" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LiveYieldChart;