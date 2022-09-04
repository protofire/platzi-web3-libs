import { InjectedConnector } from '@web3-react/injected-connector'
import { SupportedChainId } from '../constants'

export const injected = new InjectedConnector({
  supportedChainIds: [SupportedChainId.GOERLI],
})