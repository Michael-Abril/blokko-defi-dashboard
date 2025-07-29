import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    background: '#EDF2F7', // Light grey-blue background
    text: '#1A365D',      // Dark Blue for text
    primary: '#3182CE',   // Main blue for buttons
    secondary: '#4A5568', // Grey for secondary text
  },
  gradient: {
    start: '#68D391', // Light Green
    end: '#4FD1C5',   // Light Teal/Blue
  }
};

const fonts = {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
};

export const theme = extendTheme({ colors, fonts });