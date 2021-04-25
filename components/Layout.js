import React from 'react';
import Nav from './Nav';
import { Box } from '@chakra-ui/react';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ height: '100vh' }}>
      {/* <Nav /> */}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
