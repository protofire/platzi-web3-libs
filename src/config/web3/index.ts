import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

const GOERLI_NETWORK = 5

export const connector = new InjectedConnector({
  supportedChainIds:[
    GOERLI_NETWORK
  ]
})

export type Providers = {
  ethersLibrary: Web3Provider,
  web3Library: Web3
}

export const getLibrary = (provider: any):  Providers => {
  const ethersLibrary = new Web3Provider(provider)
  const web3Library = new Web3(provider)
  ethersLibrary.pollingInterval = 12000
  return {ethersLibrary, web3Library}
}

