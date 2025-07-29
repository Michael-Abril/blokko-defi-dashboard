import React, { useState } from 'react';
import { Box, Heading, VStack, HStack, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Button } from '@chakra-ui/react';

const BridgeAllocationMatrix = ({ chains, allocations, setAllocations, onSave }) => {
  const [local, setLocal] = useState(allocations);

  const handleSlider = (chain, val) => {
    const restChains = chains.filter(c=>c!==chain);
    const restSum = restChains.reduce((s,c)=>s+local[c],0);
    const remaining = 100 - val;
    const factor = restSum ? remaining/restSum : 0;
    const newAlloc = { ...local, [chain]: val };
    restChains.forEach(c=> newAlloc[c] = Math.round(local[c]*factor));
    setLocal(newAlloc);
  };

  const save = () => {
    setAllocations(local);
    if(onSave) onSave(local);
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>Allocation per Chain</Heading>
      <VStack align="stretch" spacing={4}>
        {chains.map(chain => (
          <Box key={chain}>
            <HStack justify="space-between" mb={1}>
              <Text>{chain}</Text><Text>{local[chain]}%</Text>
            </HStack>
            <Slider value={local[chain]} onChange={(v)=>handleSlider(chain,v)}><SliderTrack><SliderFilledTrack /></SliderTrack><SliderThumb /></Slider>
          </Box>
        ))}
      </VStack>
      <Button mt={4} colorScheme="brand" size="sm" onClick={save}>Save Allocation</Button>
    </Box>
  );
};

export default BridgeAllocationMatrix;