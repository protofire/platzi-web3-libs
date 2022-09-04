import { useCallback, useEffect, useState, useMemo, createContext }from 'react';
import logo from './logo.svg';
import './App.css';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { Providers, connector } from './config/web3'
import { Home } from './views/Home'
import { ProposalContractABI, PROPOSAL_CONTRACT_ADDRESS_GOERLI } from './config/artifacts'
import { Header } from './components/Header'


type Library = {
  active: boolean,
  error?: Error, 
  activate?: any,
  deactivate?: () => void,
  account?: null | string,
  chainId?: number,
  selectedLibrary : any,
  setSelectedLibrary:any 
}

const doSwitchLibrary = (isWeb3Library:any, setSelectedLibrary:any, library:any ) => {
    if (!isWeb3Library) {
      setSelectedLibrary(library.ethers)
    } else {
      setSelectedLibrary(library?.web3)
    }
}


export const LibraryContext = createContext<Library>({
  active: false,
  error: undefined,
  activate: undefined,
  deactivate: undefined,
  account: undefined,
  chainId: undefined,
  selectedLibrary: undefined ,
  setSelectedLibrary: undefined 
});

function App() {
  const { active, error, activate, deactivate, account, library, chainId } = useWeb3React<Providers>()

  const libraryStorage = localStorage.getItem('librarySelected')
  const [ selectedLibrary, setSelectedLibrary ] = useState(library?.web3)
  const [ switchLibrary, setSwitchLibrary ] = useState(!libraryStorage || libraryStorage === 'web3' ? true : false)

  useEffect(() => {
    if (library) {
      doSwitchLibrary(switchLibrary,setSelectedLibrary, library)
    }
  }, [switchLibrary, library, setSelectedLibrary])

  useMemo(
    () => {
      if (selectedLibrary && chainId && PROPOSAL_CONTRACT_ADDRESS_GOERLI) {
        return selectedLibrary.contractInstance(ProposalContractABI, PROPOSAL_CONTRACT_ADDRESS_GOERLI!!)
      }
    },
    [ chainId, selectedLibrary ]
  )

  return (
    <div className="App">
      <LibraryContext.Provider value={{active, account, activate, error, deactivate, chainId, selectedLibrary,setSelectedLibrary}}>
        <Header />
        <div className="App-body">
          <Home switchLibrary={switchLibrary} setSwitchLibrary={setSwitchLibrary} />
        </div>
      </LibraryContext.Provider>
      <a href="https://github.com/fkmurphy" className="text-sm text-gray-800 dark:text-gray-400">Created by Julian Murphy</a>
    </div>
  );
}

export default App;
