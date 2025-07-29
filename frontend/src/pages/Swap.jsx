import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { 
  TrendingUpIcon, 
  CheckCircleIcon, 
  SettingsIcon, 
  StarIcon,
  ArrowDownIcon 
} from '@chakra-ui/icons';
import NeumorphicCard from '../components/UI/NeumorphicCard';
import SwapCard from '../components/Swap/SwapCard';
import SwapComparisonChart from '../components/Swap/SwapComparisonChart';
import FeeBreakdown from '../components/Swap/FeeBreakdown';

const TOKENS = [
  { symbol: 'USDC', name: 'USD Coin', address: '0xA0b86a33E6441b8c4', logo: '🟢' },
  { symbol: 'USDT', name: 'Tether', address: '0xdAC17F958D2ee523a', logo: '🟢' },
  { symbol: 'ETH', name: 'Ethereum', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', logo: '🔵' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', logo: '🟠' },
  { symbol: 'DAI', name: 'Dai Stablecoin', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', logo: '🟡' },
];

const Swap = () => {
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleQuoteReceived = (quoteData) => {
    setQuotes(quoteData);
    if (quoteData.length > 0) {
      setSelectedQuote(quoteData[0]);
      setToAmount(quoteData[0].toAmount);
    }
  };

  const handleSwapExecuted = () => {
    toast({
      title: 'Swap Executed!',
      description: `Successfully swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setFromAmount('');
    setToAmount('');
    setQuotes([]);
    setSelectedQuote(null);
  };

  return (
    <VStack spacing={8} align="stretch">
      {/* Page Header */}
      <Box className="animate-slide-left">
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
        <NeumorphicCard variant="default" animation="fade-in">
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600" fontWeight="500">
                Total Volume (24h)
              </Text>
              <Icon as={TrendingUpIcon} color="purple.500" boxSize={4} />
            </HStack>
            <Text fontSize="2xl" fontWeight="800" color="gray.800">
              $2.4M
            </Text>
            <Text fontSize="sm" color="green.500" fontWeight="600">
              ↗ +12.5%
            </Text>
          </VStack>
        </NeumorphicCard>

        <NeumorphicCard variant="default" animation="fade-in">
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
        </NeumorphicCard>

        <NeumorphicCard variant="default" animation="fade-in">
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
        </NeumorphicCard>

        <NeumorphicCard variant="default" animation="fade-in">
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
        </NeumorphicCard>
      </SimpleGrid>

      {/* Main Swap Interface */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* Swap Card */}
        <NeumorphicCard variant="elevated" animation="slide-left">
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

        {/* Comparison Chart */}
        <NeumorphicCard variant="elevated" animation="slide-right">
          <VStack align="stretch" spacing={6}>
            <Heading size="md" color="gray.800">
              Rate Comparison
            </Heading>
            <SwapComparisonChart quotes={quotes} onQuoteSelect={setSelectedQuote} />
          </VStack>
        </NeumorphicCard>
      </SimpleGrid>

      {/* Fee Breakdown */}
      {selectedQuote && (
        <NeumorphicCard variant="default" animation="fade-in">
          <VStack align="stretch" spacing={4}>
            <Heading size="md" color="gray.800">
              Fee Breakdown
            </Heading>
            <FeeBreakdown quote={selectedQuote} />
          </VStack>
        </NeumorphicCard>
      )}

      {/* Recent Swaps */}
      <NeumorphicCard variant="default" animation="fade-in">
        <VStack align="stretch" spacing={4}>
          <Heading size="md" color="gray.800">
            Recent Swaps
          </Heading>
          <Box 
            bg="gray.50"
            p={4}
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.200"
          >
            <VStack align="stretch" spacing={3}>
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="600" color="gray.800">
                  ETH → USDC
                </Text>
                <Text fontSize="xs" color="gray.600">
                  2 min ago
                </Text>
              </HStack>
              <Text fontSize="lg" color="gray.600" fontWeight="600">
                0.5 ETH → 1,250 USDC
              </Text>
              <Text fontSize="sm" color="gray.600">
                Via Uniswap V3 • Gas: 0.002 ETH
              </Text>
            </VStack>
          </Box>
        </VStack>
      </NeumorphicCard>
    </VStack>
  );
};

export default Swap;
