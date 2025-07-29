import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  SimpleGrid,
  Badge,
  Icon,
  useToast,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import SwapCard from '../components/Swap/SwapCard';
import SwapComparisonChart from '../components/Swap/SwapComparisonChart';
import FeeBreakdown from '../components/Swap/FeeBreakdown';
import { 
  TriangleUpIcon, 
  CheckCircleIcon, 
  StarIcon,
  SettingsIcon,
  ViewIcon
} from '@chakra-ui/icons';

// Available tokens for demo
const TOKENS = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    decimals: 18,
    icon: '🔵',
  },
  {
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    decimals: 18,
    icon: '🔷',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86a33E6B8eD8aB8C1e1f9d8cE00b9c5e6C5a0',
    decimals: 6,
    icon: '💙',
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    decimals: 18,
    icon: '🟡',
  },
  {
    symbol: 'USDT',
    name: 'Tether USD',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
    icon: '💚',
  },
];

const Swap = () => {
  const { isConnected } = useAccount();
  const toast = useToast();
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [quotes, setQuotes] = useState([]);

  // Mock quotes data
  const mockQuotes = [
    {
      dex: 'Uniswap V3',
      outputAmount: '1850.45',
      gasEstimate: '120000',
      gasPrice: '25',
      priceImpact: '0.12%',
      route: 'ETH → USDC',
      color: '#FF007A',
    },
    {
      dex: '1inch',
      outputAmount: '1852.78',
      gasEstimate: '95000',
      gasPrice: '25',
      priceImpact: '0.08%',
      route: 'ETH → USDC',
      color: '#00D4C8',
    },
    {
      dex: '0x Protocol',
      outputAmount: '1848.92',
      gasEstimate: '110000',
      gasPrice: '25',
      priceImpact: '0.15%',
      route: 'ETH → USDC',
      color: '#F59E0B',
    },
  ];

  const handleQuoteReceived = (quoteData) => {
    setQuotes(mockQuotes);
    setSelectedQuote(mockQuotes[1]); // Default to 1inch as best quote
    toast({
      title: 'Quote Received',
      description: 'Best rate found on 1inch Protocol',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSwapExecuted = () => {
    toast({
      title: 'Swap Successful',
      description: 'Your tokens have been swapped successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={8} align="stretch">
      {/* Page Header */}
      <Box>
        <Heading 
          size="2xl" 
          bgGradient="linear(to-r, blue.500, purple.500)" 
          bgClip="text"
          fontWeight="800"
          mb={2}
        >
          Token Swap
        </Heading>
        <Text color="gray.600" fontSize="lg">
          Get the best rates across multiple DEXs
        </Text>
      </Box>

      {/* Swap Stats */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <Card bg="white" shadow="md">
          <CardBody>
            <VStack align="stretch" spacing={3}>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600" fontWeight="500">
                  Total Volume (24h)
                </Text>
                <Icon as={TriangleUpIcon} color="purple.500" boxSize={4} />
              </HStack>
              <Text fontSize="2xl" fontWeight="800" color="gray.800">
                $2.4M
              </Text>
              <Text fontSize="sm" color="green.500" fontWeight="600">
                ↗ +12.5%
              </Text>
            </VStack>
          </CardBody>
        </Card>

        <Card bg="white" shadow="md">
          <CardBody>
            <VStack align="stretch" spacing={3}>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600" fontWeight="500">
                  Successful Swaps
                </Text>
                <Icon as={CheckCircleIcon} color="green.500" boxSize={4} />
              </HStack>
              <Text fontSize="2xl" fontWeight="800" color="gray.800">
                1,247
              </Text>
              <Text fontSize="sm" color="green.500" fontWeight="600">
                ↗ +8.3%
              </Text>
            </VStack>
          </CardBody>
        </Card>

        <Card bg="white" shadow="md">
          <CardBody>
            <VStack align="stretch" spacing={3}>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600" fontWeight="500">
                  Average Gas Saved
                </Text>
                <Icon as={SettingsIcon} color="yellow.500" boxSize={4} />
              </HStack>
              <Text fontSize="2xl" fontWeight="800" color="gray.800">
                23%
              </Text>
              <Text fontSize="sm" color="green.500" fontWeight="600">
                ↗ +5.2%
              </Text>
            </VStack>
          </CardBody>
        </Card>

        <Card bg="white" shadow="md">
          <CardBody>
            <VStack align="stretch" spacing={3}>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600" fontWeight="500">
                  Supported DEXs
                </Text>
                <Icon as={StarIcon} color="purple.500" boxSize={4} />
              </HStack>
              <Text fontSize="2xl" fontWeight="800" color="gray.800">
                12
              </Text>
              <Text fontSize="sm" color="gray.600" fontWeight="600">
                Including Uniswap, 1inch, 0x
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Main Swap Interface */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* Swap Card */}
        <Card bg="white" shadow="lg">
          <CardBody>
            <VStack align="stretch" spacing={6}>
              <HStack justify="space-between">
                <Heading size="md" color="gray.800">
                  Swap Tokens
                </Heading>
                <Badge
                  colorScheme="purple"
                  fontSize="xs"
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  Live
                </Badge>
              </HStack>
              
              <SwapCard 
                tokens={TOKENS}
                onQuoteReceived={handleQuoteReceived}
                onSwapExecuted={handleSwapExecuted}
              />
            </VStack>
          </CardBody>
        </Card>

        {/* Quote Comparison */}
        <VStack spacing={6} align="stretch">
          {quotes.length > 0 && (
            <Card bg="white" shadow="lg">
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  <Heading size="md" color="gray.800">
                    DEX Comparison
                  </Heading>
                  <SwapComparisonChart quotes={quotes} />
                </VStack>
              </CardBody>
            </Card>
          )}

          {selectedQuote && (
            <Card bg="white" shadow="md">
              <CardBody>
                <VStack align="stretch" spacing={4}>
                  <Heading size="md" color="gray.800">
                    Selected Quote
                  </Heading>
                  <FeeBreakdown quote={selectedQuote} />
                </VStack>
              </CardBody>
            </Card>
          )}
        </VStack>
      </SimpleGrid>

      {/* Supported Tokens */}
      <Card bg="white" shadow="md">
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Heading size="md" color="gray.800">
              Supported Tokens
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={4}>
              {TOKENS.map((token) => (
                <Box
                  key={token.symbol}
                  p={4}
                  borderRadius="lg"
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.200"
                  textAlign="center"
                  _hover={{
                    transform: 'scale(1.05)',
                    boxShadow: 'md',
                  }}
                  transition="all 0.2s"
                >
                  <Text fontSize="2xl" mb={2}>
                    {token.icon}
                  </Text>
                  <Text fontSize="sm" fontWeight="600" color="gray.800">
                    {token.symbol}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    {token.name}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </CardBody>
      </Card>

      {/* Connection Warning */}
      {!isConnected && (
        <Card bg="white" shadow="md">
          <CardBody>
            <VStack spacing={4} py={6}>
              <Icon as={ViewIcon} boxSize={12} color="gray.400" />
              <Text fontSize="lg" color="gray.600" fontWeight="600">
                Connect Your Wallet
              </Text>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Connect your wallet to start swapping tokens and get the best rates
              </Text>
            </VStack>
          </CardBody>
        </Card>
      )}
    </VStack>
  );
};

export default Swap;
