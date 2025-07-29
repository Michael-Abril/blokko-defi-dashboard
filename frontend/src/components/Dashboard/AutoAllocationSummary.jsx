import React from 'react';
import { Box, Heading, VStack, HStack, Tag, Progress, Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import EditStrategyModal from './EditStrategyModal';

const AllocationBar = ({ label, percent, color }) => (
  <HStack w="100%" align="center" spacing={3}>
    <Tag size="sm" bg={color} color="white">{label}</Tag>
    <Progress value={percent} flex="1" size="sm" colorScheme={color} borderRadius="md" />
    <Box w="50px" textAlign="right" fontSize="sm">{percent}%</Box>
  </HStack>
);

const AutoAllocationSummary = ({ strategy, onStrategyChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colors = { stablecoins: 'green', treasuries: 'blue', defi: 'purple' };
  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>Auto-Allocation Strategy</Heading>
      <VStack align="stretch" spacing={3} mb={4}>
        {Object.entries(strategy.allocations).map(([k,v]) => (
          <AllocationBar key={k} label={k.charAt(0).toUpperCase()+k.slice(1)} percent={v} color={colors[k]} />
        ))}
      </VStack>
      <Button size="sm" colorScheme="brand" onClick={onOpen}>Edit Strategy</Button>
      <EditStrategyModal isOpen={isOpen} onClose={onClose} strategy={strategy} onSave={onStrategyChange} />
    </Box>
  );
};

export default AutoAllocationSummary;