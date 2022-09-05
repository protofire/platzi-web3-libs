import Web3 from 'web3';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { web3Interface } from '../utils/web3';
import { EthersInterface } from '../utils/ethers';
import { contractArtifact } from './contract';

const { address, abi } = contractArtifact;

export const connector = new InjectedConnector({
  supportedChainIds: [5],
});

// export const getLibraryWeb3 = (provider) => {
//   const ethers = new Web3Provider(provider);
//   const web3 = new Web3(provider);
//   return { ethers, web3 };
// };

export const getLibraryWeb3 = (provider) => {
  const web3 = new web3Interface(address[5], abi, provider);
  const ethers = new EthersInterface(address[5], abi, provider);
  return { ethers, web3 };
};
