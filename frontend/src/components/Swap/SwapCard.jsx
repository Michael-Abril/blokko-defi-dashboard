import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Select,
  Divider,
  useToast,
  IconButton,
  Flex
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpDownIcon } from '@chakra-ui/icons';
import { useAccount } from 'wagmi';

const SwapCard = () => {
  const [fromToken, setFromToken] = useState('USDC');
  const [toToken, setToToken] = useState('ETH');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected } = useAccount();
  const toast = useToast();

  const tokens = [
    { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
    { symbol: 'ETH', name: 'Ethereum', icon: '🔷' },
    { symbol: 'USDT', name: 'Tether', icon: '💲' },
    { symbol: 'DAI', name: 'Dai', icon: '🟡' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '🟠' }
  ];

  const handleSwap = async () => {
    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to continue',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount to swap',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate swap transaction
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: 'Swap successful!',
        description: `Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }, 2000);
  };

  const handleTokenSwitch = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromAmountChange = (value) => {
    setFromAmount(value);
    // Simulate price calculation
    if (value && parseFloat(value) > 0) {
      const rate = fromToken === 'USDC' && toToken === 'ETH' ? 0.0004 : 1;
      setToAmount((parseFloat(value) * rate).toFixed(6));
    } else {
      setToAmount('');
    }
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={6}
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      border="1px solid"
      borderColor="gray.200"
      maxW="400px"
      w="full"
    >
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold" color="gray.800">
          Swap Tokens
        </Text>

        {/* From Token */}
        <Box>
          <Text fontSize="sm" color="gray.600" mb={2}>
            From
          </Text>
          <HStack spacing={3}>
            <Select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              size="lg"
              borderRadius="lg"
            >
              {tokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.icon} {token.symbol}
                </option>
              ))}
            </Select>
            <Input
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              size="lg"
              borderRadius="lg"
              textAlign="right"
            />
          </HStack>
        </Box>

        {/* Switch Button */}
        <Flex justify="center">
          <IconButton
            icon={<ArrowUpDownIcon />}
            onClick={handleTokenSwitch}
            variant="ghost"
            colorScheme="blue"
            size="sm"
            borderRadius="full"
          />
        </Flex>

        {/* To Token */}
        <Box>
          <Text fontSize="sm" color="gray.600" mb={2}>
            To
          </Text>
          <HStack spacing={3}>
            <Select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              size="lg"
              borderRadius="lg"
            >
              {tokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.icon} {token.symbol}
                </option>
              ))}
            </Select>
            <Input
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              size="lg"
              borderRadius="lg"
              textAlign="right"
              isReadOnly
            />
          </HStack>
        </Box>

        <Divider />

        {/* Swap Button */}
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleSwap}
          isLoading={isLoading}
          loadingText="Swapping..."
          isDisabled={!isConnected || !fromAmount || parseFloat(fromAmount) <= 0}
          borderRadius="lg"
        >
          {isConnected ? 'Swap' : 'Connect Wallet'}
        </Button>

        {/* Rate Info */}
        {fromAmount && toAmount && (
          <Box
            bg="gray.50"
            p={3}
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.200"
          >
            <Text fontSize="sm" color="gray.600">
              Rate: 1 {fromToken} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default SwapCard; 