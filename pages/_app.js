import React from 'react';
import PropTypes from 'prop-types';
import '../styles/globals.css';
import theme from '../lib/theme';

import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default MyApp;
