import { InjectedConnector } from '@web3-react/injected-connector'
import { Provider } from 'web3-react/dist/manager'

// Context hook
import { useGetGlobalContext } from '../../context/GlobalContext/useContext'

// Libs
import Web3 from 'web3'
import { Web3Provider } from '@ethersproject/providers'

const LIBS_PROVIDER = ['ethers', 'web3']

const connector = new InjectedConnector({
  supportedChainIds: [
    5, // Goerli
  ],
})

const getLibraryWeb3 = (provider: Provider) => {
  return new Web3(provider)
}

const getLibraryEthers = (provider: Provider) => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const getLibrary = (lib: string) => {
  return (lib === 'ethers'
    ? getLibraryEthers
    : getLibraryWeb3)
}

export { LIBS_PROVIDER, connector, getLibrary }
