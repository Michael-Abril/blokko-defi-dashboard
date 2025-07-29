import React from 'react';
import { Box, Text, HStack, VStack, Icon, Badge } from '@chakra-ui/react';
import NeumorphicCard from './NeumorphicCard';

const StatCard = ({
  title,
  value,
  change,
  changeType = 'neutral', // 'positive', 'negative', 'neutral'
  icon,
  badge,
  badgeColor = 'brand',
  size = 'md', // 'sm', 'md', 'lg'
  animation = 'fade-in',
  ...props
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'success.500';
      case 'negative':
        return 'error.500';
      default:
        return 'text.secondary';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return '↗';
      case 'negative':
        return '↘';
      default:
        return '→';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          p: 4,
          titleSize: 'sm',
          valueSize: 'lg',
          changeSize: 'xs',
        };
      case 'lg':
        return {
          p: 8,
          titleSize: 'lg',
          valueSize: '3xl',
          changeSize: 'md',
        };
      default:
        return {
          p: 6,
          titleSize: 'md',
          valueSize: '2xl',
          changeSize: 'sm',
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <NeumorphicCard
      variant="default"
      animation={animation}
      p={sizeStyles.p}
      {...props}
    >
      <VStack align="stretch" spacing={3}>
        {/* Header */}
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={1} flex="1">
            <Text
              fontSize={sizeStyles.titleSize}
              color="text.secondary"
              fontWeight="500"
            >
              {title}
            </Text>
            {badge && (
              <Badge
                colorScheme={badgeColor}
                fontSize="xs"
                borderRadius="full"
                px={2}
                py={1}
                className="animate-pulse"
              >
                {badge}
              </Badge>
            )}
          </VStack>
          {icon && (
            <Box
              p={2}
              borderRadius="lg"
              bg="brand.50"
              color="brand.500"
              className="animate-float"
            >
              <Icon as={icon} boxSize={5} />
            </Box>
          )}
        </HStack>

        {/* Value */}
        <Text
          fontSize={sizeStyles.valueSize}
          fontWeight="800"
          color="text.primary"
          lineHeight="1"
        >
          {value}
        </Text>

        {/* Change indicator */}
        {change && (
          <HStack spacing={1}>
            <Text
              fontSize={sizeStyles.changeSize}
              color={getChangeColor()}
              fontWeight="600"
            >
              {getChangeIcon()} {change}
            </Text>
          </HStack>
        )}
      </VStack>
    </NeumorphicCard>
  );
};

export default StatCard; 