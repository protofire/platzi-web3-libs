import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3JS } from "../../hooks/domain/Web3JS"
import { EthersJS } from "../../hooks/domain/EthersJS"

export const GOERLI_NETWORK = 5

export const connector = new InjectedConnector({
  supportedChainIds:[
    GOERLI_NETWORK
  ]
})

export type Providers = {
  ethers: EthersJS ,
  web3: Web3JS
}

export const getLibrary = (provider: any):  Providers => {
  const ethers = new EthersJS(provider, 12000)
  const web3 = new Web3JS(provider)
  return {ethers, web3}
}

