import React from 'react';
import Nav from './Nav';
import { Box } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <div style={{ height: '100v' }}>
      <Nav />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
