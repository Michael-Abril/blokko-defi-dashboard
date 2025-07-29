import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box 
        as="main" 
        pt={{ base: "80px", md: "88px" }}
        px={{ base: 4, md: 6, lg: 8 }}
        pb={8}
        flex="1"
        bg="background.primary"
        className="animate-fade-in"
      >
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;