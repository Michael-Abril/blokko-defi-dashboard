import React, { useState, useEffect } from 'react';
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
  Flex,
  Badge,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpDownIcon, InfoIcon } from '@chakra-ui/icons';
import { useAccount } from 'wagmi';

// Enhanced token list with more details
const TOKENS = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    decimals: 18,
    icon: '🔷',
    price: 1800.50,
  },
  {
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    decimals: 18,
    icon: '🔷',
    price: 1800.50,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86a33E6B8eD8aB8C1e1f9d8cE00b9c5e6C5a0',
    decimals: 6,
    icon: '💵',
    price: 1.00,
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    icon: '🟡',
    price: 1.00,
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
    icon: '💲',
    price: 1.00,
  },
];

const SwapCard = ({ onQuoteReceived, onSwapExecuted }) => {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const { isConnected } = useAccount();
  const toast = useToast();

  // Fetch quote from backend API
  const fetchQuote = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const fromTokenData = TOKENS.find(t => t.symbol === fromToken);
      const toTokenData = TOKENS.find(t => t.symbol === toToken);

      const response = await fetch(`http://localhost:3001/api/v1/swap/quote?sellToken=${fromToken}&buyToken=${toToken}&sellAmount=${fromAmount}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }

      const quoteData = await response.json();
      const bestQuote = quoteData.quotes[0]; // Get the best quote
      
      setQuote(bestQuote);
      setToAmount(bestQuote.outputAmount);
      
      if (onQuoteReceived) {
        onQuoteReceived(bestQuote);
      }

      toast({
        title: 'Quote received',
        description: `Best rate: ${bestQuote.outputAmount} ${toToken} via ${bestQuote.dex}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    } catch (err) {
      console.error('Error fetching quote:', err);
      setError('Failed to get quote. Please try again.');
      
      toast({
        title: 'Quote error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Execute swap
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

    if (!quote) {
      toast({
        title: 'No quote available',
        description: 'Please get a quote first',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsExecuting(true);

    try {
      // Simulate swap execution
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Swap successful!',
        description: `Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken} via ${quote.dex}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFromAmount('');
      setToAmount('');
      setQuote(null);

      if (onSwapExecuted) {
        onSwapExecuted({ fromToken, toToken, fromAmount, toAmount, quote });
      }

    } catch (err) {
      toast({
        title: 'Swap failed',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleTokenSwitch = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    setQuote(null);
  };

  const handleFromAmountChange = (value) => {
    setFromAmount(value);
    setQuote(null);
    
    // Auto-fetch quote when amount changes
    if (value && parseFloat(value) > 0) {
      const timeoutId = setTimeout(() => {
        fetchQuote();
      }, 500);
      
      return () => clearTimeout(timeoutId);
    } else {
      setToAmount('');
    }
  };

  const getTokenIcon = (symbol) => {
    const token = TOKENS.find(t => t.symbol === symbol);
    return token ? token.icon : '🪙';
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={6}
      boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      border="1px solid"
      borderColor="gray.200"
      maxW="450px"
      w="full"
    >
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between">
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            Swap Tokens
          </Text>
          <Badge colorScheme="blue" variant="subtle">
            Live
          </Badge>
        </HStack>

        {/* Error Alert */}
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* From Token */}
        <Box>
          <Text fontSize="sm" color="gray.600" mb={2}>
            You Pay
          </Text>
          <HStack spacing={3}>
            <Select
              value={fromToken}
              onChange={(e) => setFromToken(e.target.value)}
              size="lg"
              borderRadius="lg"
              borderColor="gray.300"
              _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
            >
              {TOKENS.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.icon} {token.symbol}
                </option>
              ))}
            </Select>
            <Input
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              placeholder="0.0"
              size="lg"
              borderRadius="lg"
              borderColor="gray.300"
              _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
              type="number"
              step="any"
            />
          </HStack>
        </Box>

        {/* Swap Direction Button */}
        <Flex justify="center">
          <IconButton
            icon={<ArrowUpDownIcon />}
            onClick={handleTokenSwitch}
            size="md"
            borderRadius="full"
            colorScheme="blue"
            variant="outline"
            aria-label="Switch tokens"
          />
        </Flex>

        {/* To Token */}
        <Box>
          <Text fontSize="sm" color="gray.600" mb={2}>
            You Receive
          </Text>
          <HStack spacing={3}>
            <Select
              value={toToken}
              onChange={(e) => setToToken(e.target.value)}
              size="lg"
              borderRadius="lg"
              borderColor="gray.300"
              _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
            >
              {TOKENS.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.icon} {token.symbol}
                </option>
              ))}
            </Select>
            <Input
              value={toAmount}
              placeholder="0.0"
              size="lg"
              borderRadius="lg"
              borderColor="gray.300"
              _focus={{ borderColor: 'blue.500', boxShadow: 'outline' }}
              type="number"
              step="any"
              isReadOnly
            />
          </HStack>
        </Box>

        {/* Quote Information */}
        {quote && (
          <Box bg="blue.50" p={4} borderRadius="lg" border="1px solid" borderColor="blue.200">
            <VStack spacing={2} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" color="blue.700" fontWeight="medium">
                  Best Quote
                </Text>
                <Badge colorScheme="green" variant="subtle">
                  {quote.dex}
                </Badge>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="blue.600">
                  Gas Fee
                </Text>
                <Text fontSize="sm" color="blue.700" fontWeight="medium">
                  ${quote.gasFeeUSD}
                </Text>
              </HStack>
            </VStack>
          </Box>
        )}

        <Divider />

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          size="lg"
          colorScheme="blue"
          borderRadius="lg"
          isLoading={isExecuting}
          loadingText="Swapping..."
          isDisabled={!isConnected || !quote || !fromAmount || parseFloat(fromAmount) <= 0}
          _hover={{ transform: 'translateY(-1px)', boxShadow: 'lg' }}
          transition="all 0.2s"
        >
          {!isConnected ? 'Connect Wallet' : 'Swap Tokens'}
        </Button>

        {/* Loading State */}
        {isLoading && (
          <HStack justify="center" spacing={2}>
            <Spinner size="sm" color="blue.500" />
            <Text fontSize="sm" color="gray.600">
              Getting best quote...
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
};

export default SwapCard; 