import React from 'react';
import { Flex, Box, Text, Spacer, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { NavLink as RouterLink } from 'react-router-dom';

const NavLink = ({ to, children }) => (
    <ChakraLink 
        as={RouterLink} 
        to={to}
        _hover={{ textDecoration: 'none', color: 'brand.primary' }}
        _activeLink={{ color: 'brand.primary', fontWeight: 'bold' }}
    >
        {children}
    </ChakraLink>
)

const Header = () => {
  return (
    <Flex 
      as="header" 
      align="center" 
      p={4} 
      bg="white" 
      boxShadow="sm"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="sticky"
    >
      <Text fontSize="2xl" fontWeight="bold" color="brand.text">Blokko</Text>
      <Spacer />
      <HStack spacing={8}>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/activity">Activity</NavLink>
        <NavLink to="/allocation">Allocation</NavLink>
        <NavLink to="/bridge">Bridge</NavLink>
        <NavLink to="/swap">Swap</NavLink>
        <NavLink to="/discovery">Discovery</NavLink>
        <NavLink to="/ai-accountant">AI Accountant</NavLink>
        <NavLink to="/academy">Academy</NavLink>
      </HStack>
      <Spacer />
      <Box>
        <ConnectButton />
      </Box>
    </Flex>
  );
};

export default Header;