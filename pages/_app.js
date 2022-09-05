import { Web3ReactProvider } from '@web3-react/core';
import { getLibraryWeb3 } from '../config/web3Config';
import { ChakraProvider } from '@chakra-ui/react';

import { Layout } from '../components/Layouts/mainLayout.js';
import { theme } from '../components/Theme/theme';
import { Fonts } from '../components/Theme/font';
import { AnimatePresence } from 'framer-motion';
import '../styles/blob.css';
import '../styles/globals.css';
import { AppContextProvider } from '../components/context/appContext';

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <ChakraProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibraryWeb3}>
          <Fonts />
          <Layout />
          <AnimatePresence>
            <Component {...pageProps} />
          </AnimatePresence>
        </Web3ReactProvider>
      </ChakraProvider>
    </AppContextProvider>
  );
}

export default MyApp;
