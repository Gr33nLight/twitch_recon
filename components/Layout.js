import React from 'react';
import PropTypes from 'prop-types';
// import Nav from './Nav';
import { Box } from '@chakra-ui/react';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box className="layoutContainer">
      <Box>
        {/* <Nav /> */}
        <Box>{children}</Box>
      </Box>
      <Footer />
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;
