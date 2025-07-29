import React from 'react';
import { Box, Heading, Text, Progress, HStack, VStack, Badge, Icon } from '@chakra-ui/react';
import NeumorphicCard from '../UI/NeumorphicCard';
import { TrendingUpIcon, ShieldCheckIcon, StarIcon } from '@chakra-ui/icons';

const AllocationBar = ({ label, percent, color, icon }) => (
  <VStack align="stretch" spacing={2}>
    <HStack justify="space-between">
      <HStack spacing={2}>
        <Icon as={icon} color={`${color}.500`} boxSize={4} />
        <Text fontSize="sm" fontWeight="600" color="text.secondary">
          {label}
        </Text>
      </HStack>
      <Text fontSize="sm" fontWeight="700" color="text.primary">
        {percent}%
      </Text>
    </HStack>
    <Progress 
      value={percent} 
      size="sm" 
      colorScheme={color} 
      borderRadius="full"
      bg="surface.200"
      sx={{
        '& > div': {
          borderRadius: 'full',
          background: `linear-gradient(90deg, var(--chakra-colors-${color}-500) 0%, var(--chakra-colors-${color}-400) 100%)`,
        }
      }}
    />
  </VStack>
);

const GrowthStrategyCard = ({ strategy, animation = 'fade-in' }) => {
  const { name, headline, description, allocations } = strategy;

  const getStrategyIcon = () => {
    if (allocations.defi > 10) return TrendingUpIcon;
    if (allocations.treasuries > 10) return ShieldCheckIcon;
    return StarIcon;
  };

  const getStrategyColor = () => {
    if (allocations.defi > 10) return 'purple';
    if (allocations.treasuries > 10) return 'blue';
    return 'green';
  };

  return (
    <NeumorphicCard 
      variant="default" 
      animation={animation}
      _hover={{ transform: 'translateY(-4px)' }}
    >
      <VStack align="stretch" spacing={6}>
        {/* Header */}
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={2} flex="1">
            <Heading size="md" color="text.primary" fontWeight="700">
              {name}
            </Heading>
            <Text 
              fontWeight="600" 
              color={`${getStrategyColor()}.500`}
              fontSize="sm"
              className="animate-pulse"
            >
              {headline}
            </Text>
          </VStack>
          <Box
            p={3}
            borderRadius="xl"
            bg={`${getStrategyColor()}.50`}
            color={`${getStrategyColor()}.500`}
            className="animate-float"
          >
            <Icon as={getStrategyIcon()} boxSize={6} />
          </Box>
        </HStack>

        {/* Description */}
        <Text fontSize="sm" color="text.secondary" lineHeight="1.6">
          {description}
        </Text>

        {/* Allocation Bars */}
        <VStack align="stretch" spacing={4}>
          <AllocationBar 
            label="Stablecoins" 
            percent={allocations.stablecoins} 
            color="green" 
            icon={StarIcon}
          />
          <AllocationBar 
            label="Treasuries" 
            percent={allocations.treasuries} 
            color="blue" 
            icon={ShieldCheckIcon}
          />
          <AllocationBar 
            label="DeFi" 
            percent={allocations.defi} 
            color="purple" 
            icon={TrendingUpIcon}
          />
        </VStack>

        {/* Risk Level Badge */}
        <HStack justify="space-between" pt={2}>
          <Text fontSize="xs" color="text.tertiary" fontWeight="500">
            Risk Level
          </Text>
          <Badge
            colorScheme={getStrategyColor()}
            fontSize="xs"
            borderRadius="full"
            px={3}
            py={1}
            fontWeight="600"
          >
            {allocations.defi > 10 ? 'Moderate' : allocations.treasuries > 10 ? 'Low' : 'Minimal'}
          </Badge>
        </HStack>
      </VStack>
    </NeumorphicCard>
  );
};

export default GrowthStrategyCard;