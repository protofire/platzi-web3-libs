import Web3 from "web3/dist/web3.min";
import ethers from 'ethers';

import { InjectedConnector } from "@web3-react/injected-connector";

export const web3Library = (provider) => {
  return new Web3(provider);
};

export const ethersLibrary = (provider) => {
  return new ethers.providers.Web3Provider(provider)
};

export const connector = new InjectedConnector({
  supportedChainIds: [5],
});