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
} from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import NeumorphicCard from '../components/UI/NeumorphicCard';
import SwapCard from '../components/Swap/SwapCard';
import SwapComparisonChart from '../components/Swap/SwapComparisonChart';
import FeeBreakdown from '../components/Swap/FeeBreakdown';
import { 
  TrendingUpIcon, 
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
      <Box className="animate-slide-left">
        <Heading 
          size="2xl" 
          bgGradient="linear(to-r, brand.500, secondary.500)" 
          bgClip="text"
          fontWeight="800"
          mb={2}
        >
          Token Swap
        </Heading>
        <Text color="text.secondary" fontSize="lg">
          Get the best rates across multiple DEXs
        </Text>
      </Box>

      {/* Swap Stats */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <NeumorphicCard variant="default" animation="fade-in">
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <Text fontSize="sm" color="text.secondary" fontWeight="500">
                Total Volume (24h)
              </Text>
              <Icon as={TrendingUpIcon} color="secondary.500" boxSize={4} />
            </HStack>
            <Text fontSize="2xl" fontWeight="800" color="text.primary">
              $2.4M
            </Text>
            <Text fontSize="sm" color="success.500" fontWeight="600">
              ↗ +12.5%
            </Text>
          </VStack>
        </NeumorphicCard>

        <NeumorphicCard variant="default" animation="fade-in">
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <Text fontSize="sm" color="text.secondary" fontWeight="500">
                Successful Swaps
              </Text>
              <Icon as={CheckCircleIcon} color="success.500" boxSize={4} />
            </HStack>
            <Text fontSize="2xl" fontWeight="800" color="text.primary">
              1,247
            </Text>
            <Text fontSize="sm" color="success.500" fontWeight="600">
              ↗ +8.3%
            </Text>
          </VStack>
        </NeumorphicCard>

        <NeumorphicCard variant="default" animation="fade-in">
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <Text fontSize="sm" color="text.secondary" fontWeight="500">
                Average Gas Saved
              </Text>
              <Icon as={SettingsIcon} color="warning.500" boxSize={4} />
            </HStack>
            <Text fontSize="2xl" fontWeight="800" color="text.primary">
              23%
            </Text>
            <Text fontSize="sm" color="success.500" fontWeight="600">
              ↗ +5.2%
            </Text>
          </VStack>
        </NeumorphicCard>

        <NeumorphicCard variant="default" animation="fade-in">
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <Text fontSize="sm" color="text.secondary" fontWeight="500">
                Supported DEXs
              </Text>
              <Icon as={StarIcon} color="secondary.500" boxSize={4} />
            </HStack>
            <Text fontSize="2xl" fontWeight="800" color="text.primary">
              12
            </Text>
            <Text fontSize="sm" color="text.secondary" fontWeight="600">
              Including Uniswap, 1inch, 0x
            </Text>
          </VStack>
        </NeumorphicCard>
      </SimpleGrid>

      {/* Main Swap Interface */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* Swap Card */}
        <NeumorphicCard variant="elevated" animation="slide-left">
          <VStack align="stretch" spacing={6}>
            <HStack justify="space-between">
              <Heading size="md" color="text.primary">
                Swap Tokens
              </Heading>
              <Badge
                colorScheme="secondary"
                fontSize="xs"
                borderRadius="full"
                px={3}
                py={1}
                className="animate-pulse"
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
        </NeumorphicCard>

        {/* Quote Comparison */}
        <VStack spacing={6} align="stretch">
          {quotes.length > 0 && (
            <NeumorphicCard variant="elevated" animation="slide-right">
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="text.primary">
                  DEX Comparison
                </Heading>
                <SwapComparisonChart quotes={quotes} />
              </VStack>
            </NeumorphicCard>
          )}

          {selectedQuote && (
            <NeumorphicCard variant="default" animation="fade-in">
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="text.primary">
                  Selected Quote
                </Heading>
                <FeeBreakdown quote={selectedQuote} />
              </VStack>
            </NeumorphicCard>
          )}
        </VStack>
      </SimpleGrid>

      {/* Supported Tokens */}
      <NeumorphicCard variant="default" animation="fade-in">
        <VStack align="stretch" spacing={4}>
          <Heading size="md" color="text.primary">
            Supported Tokens
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={4}>
            {TOKENS.map((token) => (
              <Box
                key={token.symbol}
                p={4}
                borderRadius="lg"
                bg="surface.50"
                border="1px solid"
                borderColor="surface.200"
                textAlign="center"
                className="hover:scale-105"
                transition="all 0.2s"
              >
                <Text fontSize="2xl" mb={2}>
                  {token.icon}
                </Text>
                <Text fontSize="sm" fontWeight="600" color="text.primary">
                  {token.symbol}
                </Text>
                <Text fontSize="xs" color="text.secondary">
                  {token.name}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </NeumorphicCard>

      {/* Connection Warning */}
      {!isConnected && (
        <NeumorphicCard variant="default" animation="fade-in">
          <VStack spacing={4} py={6}>
            <Icon as={ViewIcon} boxSize={12} color="text.tertiary" />
            <Text fontSize="lg" color="text.secondary" fontWeight="600">
              Connect Your Wallet
            </Text>
            <Text fontSize="sm" color="text.tertiary" textAlign="center">
              Connect your wallet to start swapping tokens and get the best rates
            </Text>
          </VStack>
        </NeumorphicCard>
      )}
    </VStack>
  );
};

export default Swap;
