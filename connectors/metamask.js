import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'

console.log(initializeConnector<MetaMask>((actions) => new MetaMask({ actions })));
