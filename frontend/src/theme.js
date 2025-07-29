import { extendTheme } from '@chakra-ui/react';

// Futuristic Design System - Professional DeFi Dashboard
const colors = {
  // Primary Brand Colors
  brand: {
    50: '#E6F3FF',
    100: '#B3D9FF',
    200: '#80BFFF',
    300: '#4DA6FF',
    400: '#1A8CFF',
    500: '#0A2540', // Deep trustworthy blue
    600: '#051726',
    700: '#004480',
    800: '#002D4D',
    900: '#00161A',
  },
  
  // Secondary Colors
  secondary: {
    50: '#E6FFFD',
    100: '#B3FFF8',
    200: '#80FFF3',
    300: '#4DFFEE',
    400: '#1AFFE9',
    500: '#00D4C8', // Vibrant cyan/teal
    600: '#00B4A6',
    700: '#00948C',
    800: '#007472',
    900: '#005458',
  },
  
  // Glassmorphism Colors
  glass: {
    50: 'rgba(255, 255, 255, 0.05)',
    100: 'rgba(255, 255, 255, 0.1)',
    200: 'rgba(255, 255, 255, 0.15)',
    300: 'rgba(255, 255, 255, 0.2)',
    400: 'rgba(255, 255, 255, 0.25)',
    500: 'rgba(255, 255, 255, 0.3)',
  },
  
  // Dark Theme Colors
  dark: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },
  
  // Status Colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#10B981',
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
    500: '#F59E0B',
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
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  
  // Risk Score Colors
  risk: {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
  },
  
  // Gradient Colors
  gradient: {
    primary: 'linear-gradient(135deg, #0A2540 0%, #1A3A5C 100%)',
    secondary: 'linear-gradient(135deg, #00D4C8 0%, #00B4A6 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    warning: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    error: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
    brand: 'linear-gradient(135deg, #0A2540 0%, #00D4C8 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    neon: 'linear-gradient(135deg, rgba(0, 212, 200, 0.1) 0%, rgba(10, 37, 64, 0.1) 100%)',
  },
  
  // Text Colors
  text: {
    primary: '#0A2540',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    inverse: '#FFFFFF',
  },
  
  // Background Colors
  background: {
    primary: '#F6F9FC',
    secondary: '#F1F5F9',
    tertiary: '#E2E8F0',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  // Standard Chakra UI colors
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },

  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  yellow: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  purple: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',
    600: '#9333EA',
    700: '#7C3AED',
    800: '#6B21A8',
    900: '#581C87',
  },
};

// Custom Components
const components = {
  Button: {
    baseStyle: {
      fontWeight: '600',
      borderRadius: 'lg',
      _focus: {
        boxShadow: '0 0 0 3px rgba(0, 212, 200, 0.3)',
      },
    },
    variants: {
      solid: {
        bg: 'gradient.brand',
        color: 'white',
        _hover: {
          bg: 'gradient.secondary',
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 25px rgba(0, 212, 200, 0.3)',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
      glass: {
        bg: 'glass.200',
        backdropFilter: 'blur(10px)',
        border: '1px solid',
        borderColor: 'glass.300',
        color: 'text.primary',
        _hover: {
          bg: 'glass.300',
          borderColor: 'secondary.500',
          boxShadow: '0 0 20px rgba(0, 212, 200, 0.2)',
        },
      },
      neon: {
        bg: 'transparent',
        border: '2px solid',
        borderColor: 'secondary.500',
        color: 'secondary.500',
        _hover: {
          bg: 'secondary.500',
          color: 'white',
          boxShadow: '0 0 20px rgba(0, 212, 200, 0.5)',
        },
      },
    },
  },
  
  Card: {
    baseStyle: {
      container: {
        bg: 'white',
        borderRadius: 'xl',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid',
        borderColor: 'gray.200',
        _hover: {
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.3s ease',
      },
    },
    variants: {
      glass: {
        container: {
          bg: 'glass.100',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'glass.300',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      },
      neon: {
        container: {
          bg: 'white',
          border: '1px solid',
          borderColor: 'secondary.200',
          boxShadow: '0 0 20px rgba(0, 212, 200, 0.1)',
          _hover: {
            borderColor: 'secondary.500',
            boxShadow: '0 0 30px rgba(0, 212, 200, 0.2)',
          },
        },
      },
    },
  },
  
  Input: {
    baseStyle: {
      field: {
        borderRadius: 'lg',
        border: '1px solid',
        borderColor: 'gray.300',
        _focus: {
          borderColor: 'secondary.500',
          boxShadow: '0 0 0 3px rgba(0, 212, 200, 0.1)',
        },
      },
    },
  },
  
  Select: {
    baseStyle: {
      field: {
        borderRadius: 'lg',
        border: '1px solid',
        borderColor: 'gray.300',
        _focus: {
          borderColor: 'secondary.500',
          boxShadow: '0 0 0 3px rgba(0, 212, 200, 0.1)',
        },
      },
    },
  },
  
  Badge: {
    baseStyle: {
      borderRadius: 'full',
      fontWeight: '600',
      fontSize: 'xs',
    },
    variants: {
      neon: {
        bg: 'secondary.500',
        color: 'white',
        boxShadow: '0 0 10px rgba(0, 212, 200, 0.3)',
      },
    },
  },
};

// Typography
const fonts = {
  heading: 'Inter, system-ui, sans-serif',
  body: 'Inter, system-ui, sans-serif',
};

// Spacing
const space = {
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

// Border Radius
const radii = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

// Shadows
const shadows = {
  xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  outline: '0 0 0 3px rgba(0, 212, 200, 0.3)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
  neon: '0 0 20px rgba(0, 212, 200, 0.3)',
  glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
};

// Breakpoints
const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

// Z-Index
const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

const theme = extendTheme({
  colors,
  components,
  fonts,
  space,
  radii,
  shadows,
  breakpoints,
  zIndices,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'background.primary',
        color: 'text.primary',
        fontFamily: 'body',
      },
    },
  },
});

export { theme };