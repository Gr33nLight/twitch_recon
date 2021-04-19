import React from 'react';
import Nav from './Nav';
import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <Box m={{ md: '20', sm: '10' }}>Content </Box>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
