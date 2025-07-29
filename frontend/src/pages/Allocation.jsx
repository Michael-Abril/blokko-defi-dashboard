import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  useToast,
  Text
} from '@chakra-ui/react';
import { useWriteContract } from 'wagmi';
import { IBlokkoVaultABI } from '../abis/IBlokkoVault';

const BLOKKO_VAULT_ADDRESS = '0x...';

const Allocation = () => {
  const [strategy, setStrategy] = useState({ aave: 50, compound: 50 });
  const { writeContract } = useWriteContract();
  const toast = useToast();

  const handleSliderChange = (protocol, value) => {
    const otherProtocol = protocol === 'aave' ? 'compound' : 'aave';
    setStrategy({ [protocol]: value, [otherProtocol]: 100 - value });
  };

  const handleSetStrategy = async () => {
    const strategyData = {
        adapters: ['0x...', '0x...'],
        allocations: [strategy.aave, strategy.compound]
    }
    writeContract({
      address: BLOKKO_VAULT_ADDRESS,
      abi: IBlokkoVaultABI,
      functionName: 'setStrategy',
      args: [strategyData],
    }, { onSuccess: () => toast({ title: "Strategy Set.", description: "Your new investment strategy has been saved on-chain.", status: "success", duration: 9000, isClosable: true }), onError: (error) => toast({ title: "Error.", description: error.message, status: "error", duration: 9000, isClosable: true }) });
  };
  
  return (
    <Box maxW="800px" mx="auto">
      <Heading mb={10} bgGradient="linear(to-r, gradient.start, gradient.end)" bgClip="text">Investment DAO Allocation</Heading>
      <VStack bg="white" p={8} borderRadius="lg" boxShadow="md" align="stretch" spacing={6}>
        <Heading size="lg">DeFi Protocol Allocation</Heading>
        <Box>
            <HStack mb={2}><Text>Aave:</Text><Text fontWeight="bold">{strategy.aave}%</Text></HStack>
            <Slider value={strategy.aave} onChange={(val) => handleSliderChange('aave', val)}><SliderTrack><SliderFilledTrack /></SliderTrack><SliderThumb /></Slider>
        </Box>
        <Box>
            <HStack mb={2}><Text>Compound:</Text><Text fontWeight="bold">{strategy.compound}%</Text></HStack>
            <Slider value={strategy.compound} onChange={(val) => handleSliderChange('compound', val)}><SliderTrack><SliderFilledTrack /></SliderTrack><SliderThumb /></Slider>
        </Box>
        <Button colorScheme="brand" size="lg" onClick={handleSetStrategy}>Save Strategy</Button>
      </VStack>
    </Box>
  );
};

export default Allocation;