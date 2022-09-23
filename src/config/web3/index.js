import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";

const connector = new InjectedConnector({
  supportedChainIds: [
    5, //goerli
  ],
});

const getLibrary = (provider) => {
  const ethersProvider = new Web3Provider(provider);
  const web3Provider = new Web3(provider);
  ethersProvider.pollingInterval = 12000;
  return { ethers: ethersProvider, web3: web3Provider };
};

export { connector, getLibrary };
