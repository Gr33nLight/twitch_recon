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

export default MyApp;
