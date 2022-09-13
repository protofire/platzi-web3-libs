import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Web3 from "web3";
import Layout from "@layout/index";
import AppContextProvider from "context/AppContext";
import { ToastContainer, toast } from 'react-toastify';
import './index.css';

function VotingApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3ReactProvider>
    </AppContextProvider>
  );
}

const getLibrary = (provider) => {
  const ethersProvider = new Web3Provider(provider);
  const web3Provider = new Web3(provider);
  ethersProvider.pollingInterval = 15000;
  return { 
    ethers: ethersProvider, 
    web3: web3Provider
  };
};

export default VotingApp;
