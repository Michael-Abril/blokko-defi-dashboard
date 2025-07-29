import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <Flex>
      <Header />
      <Box pt="72px" flex="1" p={10} as="main">
          <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;