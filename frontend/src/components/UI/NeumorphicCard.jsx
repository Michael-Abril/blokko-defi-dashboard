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
          bg: 'surface.100',
          boxShadow: 'soft.lg',
          _hover: hoverEffect ? {
            boxShadow: 'soft.xl',
            transform: 'translateY(-4px)',
          } : {},
        };
      case 'pressed':
        return {
          bg: 'surface.100',
          boxShadow: 'pressed.md',
        };
      case 'glass':
        return {
          bg: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: 'soft.md',
        };
      default:
        return {
          bg: 'surface.100',
          boxShadow: 'soft.md',
          _hover: hoverEffect ? {
            boxShadow: 'soft.lg',
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