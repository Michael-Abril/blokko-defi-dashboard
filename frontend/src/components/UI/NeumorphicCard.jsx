import React from 'react';
import { Box } from '@chakra-ui/react';

const NeumorphicCard = ({
  children,
  variant = 'default',
  hoverEffect = true,
  animation,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          bg: 'gray.50',
          boxShadow: 'lg',
          _hover: hoverEffect ? {
            boxShadow: 'xl',
            transform: 'translateY(-4px)',
          } : {},
        };
      case 'pressed':
        return {
          bg: 'gray.50',
          boxShadow: 'md',
        };
      case 'glass':
        return {
          bg: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: 'md',
        };
      default:
        return {
          bg: 'gray.50',
          boxShadow: 'md',
          _hover: hoverEffect ? {
            boxShadow: 'lg',
            transform: 'translateY(-2px)',
          } : {},
        };
    }
  };

  const getAnimationClass = () => {
    if (!animation) return '';
    return `animate-${animation.replace('-', '-')}`;
  };

  return (
    <Box
      borderRadius="xl"
      p={6}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      className={getAnimationClass()}
      {...getVariantStyles()}
      {...props}
    >
      {children}
    </Box>
  );
};

export default NeumorphicCard; 