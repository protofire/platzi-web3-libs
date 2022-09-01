import { ChakraProvider } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Web3 from "web3";
import Layout from "@layout/index";

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

const getLibrary = (provider) => {
  const ethersProvider = new Web3Provider(provider);
  const web3Provider = new Web3(provider);
  ethersProvider.pollingInterval = 12000;
  return { ethers: ethersProvider, web3: web3Provider };
};

export default MyApp;
