import { extendTheme } from '@chakra-ui/react';

// Futuristic Color Palette
const colors = {
  // Primary Brand Colors
  brand: {
    50: '#E6F3FF',
    100: '#B3D9FF',
    200: '#80BFFF',
    300: '#4DA6FF',
    400: '#1A8CFF',
    500: '#0072E6', // Primary brand blue
    600: '#005BB3',
    700: '#004480',
    800: '#002D4D',
    900: '#00161A',
  },
  
  // Neumorphic Surface Colors
  surface: {
    50: '#F8FAFC',   // Lightest surface
    100: '#F1F5F9',  // Light surface
    200: '#E2E8F0',  // Medium surface
    300: '#CBD5E1',  // Dark surface
    400: '#94A3B8',  // Border surface
  },
  
  // Status Colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E', // Success green
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Warning amber
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444', // Error red
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  
  // Risk Score Colors
  risk: {
    low: '#22C55E',    // Green for low risk
    medium: '#F59E0B', // Amber for medium risk
    high: '#EF4444',   // Red for high risk
  },
  
  // Gradient Colors
  gradient: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    success: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
    warning: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    error: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
    brand: 'linear-gradient(135deg, #0072E6 0%, #4DA6FF 100%)',
  },
  
  // Text Colors
  text: {
    primary: '#1E293B',    // Dark slate for primary text
    secondary: '#64748B',  // Medium slate for secondary text
    tertiary: '#94A3B8',   // Light slate for tertiary text
    inverse: '#FFFFFF',    // White for inverse text
  },
  
  // Background Colors
  background: {
    primary: '#F8FAFC',    // Light background
    secondary: '#F1F5F9',  // Slightly darker background
    tertiary: '#E2E8F0',   // Card background
    overlay: 'rgba(0, 0, 0, 0.5)', // Modal overlay
  }
};

// Typography Scale
const fonts = {
  heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  mono: `'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace`,
};

const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  md: '1rem',       // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
  '6xl': '3.75rem',  // 60px
};

// Spacing Scale
const space = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
};

// Border Radius Scale
const radii = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

// Shadow System for Neumorphism
const shadows = {
  // Soft shadows for neumorphic effect
  soft: {
    sm: '2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(255, 255, 255, 0.8)',
    md: '4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.8)',
    lg: '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.8)',
    xl: '12px 12px 24px rgba(0, 0, 0, 0.1), -12px -12px 24px rgba(255, 255, 255, 0.8)',
  },
  // Pressed state shadows
  pressed: {
    sm: 'inset 2px 2px 4px rgba(0, 0, 0, 0.1), inset -2px -2px 4px rgba(255, 255, 255, 0.8)',
    md: 'inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.8)',
    lg: 'inset 8px 8px 16px rgba(0, 0, 0, 0.1), inset -8px -8px 16px rgba(255, 255, 255, 0.8)',
  },
  // Regular shadows for depth
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  outline: '0 0 0 3px rgba(0, 114, 230, 0.6)',
  none: 'none',
};

// Breakpoints for responsive design
const breakpoints = {
  sm: '30em',   // 480px
  md: '48em',   // 768px
  lg: '62em',   // 992px
  xl: '80em',   // 1280px
  '2xl': '96em', // 1536px
};

// Component-specific styles
const components = {
  Button: {
    baseStyle: {
      fontWeight: '600',
      borderRadius: 'lg',
      _focus: {
        boxShadow: 'outline',
      },
    },
    variants: {
      // Neumorphic button variants
      neumorphic: {
        bg: 'surface.100',
        color: 'text.primary',
        boxShadow: 'soft.md',
        _hover: {
          boxShadow: 'soft.lg',
          transform: 'translateY(-1px)',
        },
        _active: {
          boxShadow: 'pressed.md',
          transform: 'translateY(0px)',
        },
      },
      'neumorphic-primary': {
        bg: 'brand.500',
        color: 'white',
        boxShadow: 'soft.md',
        _hover: {
          bg: 'brand.600',
          boxShadow: 'soft.lg',
          transform: 'translateY(-1px)',
        },
        _active: {
          boxShadow: 'pressed.md',
          transform: 'translateY(0px)',
        },
      },
      'neumorphic-success': {
        bg: 'success.500',
        color: 'white',
        boxShadow: 'soft.md',
        _hover: {
          bg: 'success.600',
          boxShadow: 'soft.lg',
          transform: 'translateY(-1px)',
        },
        _active: {
          boxShadow: 'pressed.md',
          transform: 'translateY(0px)',
        },
      },
    },
    sizes: {
      sm: {
        fontSize: 'sm',
        px: 3,
        py: 2,
        h: 'auto',
      },
      md: {
        fontSize: 'md',
        px: 4,
        py: 3,
        h: 'auto',
      },
      lg: {
        fontSize: 'lg',
        px: 6,
        py: 4,
        h: 'auto',
      },
    },
  },
  
  Card: {
    baseStyle: {
      bg: 'surface.100',
      borderRadius: 'xl',
      boxShadow: 'soft.md',
      p: 6,
      _hover: {
        boxShadow: 'soft.lg',
        transform: 'translateY(-2px)',
      },
    },
  },
  
  Badge: {
    baseStyle: {
      borderRadius: 'full',
      fontWeight: '600',
      fontSize: 'xs',
      px: 2,
      py: 1,
    },
    variants: {
      risk: {
        low: {
          bg: 'success.100',
          color: 'success.700',
        },
        medium: {
          bg: 'warning.100',
          color: 'warning.700',
        },
        high: {
          bg: 'error.100',
          color: 'error.700',
        },
      },
    },
  },
  
  Input: {
    baseStyle: {
      field: {
        bg: 'surface.50',
        border: '1px solid',
        borderColor: 'surface.300',
        borderRadius: 'lg',
        _focus: {
          borderColor: 'brand.500',
          boxShadow: 'outline',
        },
        _hover: {
          borderColor: 'surface.400',
        },
      },
    },
  },
  
  Select: {
    baseStyle: {
      field: {
        bg: 'surface.50',
        border: '1px solid',
        borderColor: 'surface.300',
        borderRadius: 'lg',
        _focus: {
          borderColor: 'brand.500',
          boxShadow: 'outline',
        },
        _hover: {
          borderColor: 'surface.400',
        },
      },
    },
  },
};

// Animation configurations
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  space,
  radii,
  shadows,
  breakpoints,
  components,
  config,
});