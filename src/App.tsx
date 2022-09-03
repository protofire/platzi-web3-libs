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

enum ConnectorNames {
  Injected = 'MetaMask',
}

const connectorsByName: { [key: string]: AbstractConnector } = {
  [ConnectorNames.Injected]: connector,
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
  const [ selectedLibrary, setSelectedLibrary ] = useState(library?.web3)
  const [ switchLibrary, setSwitchLibrary] = useState(true)
  const [ balance, setBalance ] = useState(0)

  const connect = useCallback(()  => {
    localStorage.setItem('previouslyConnected', 'true')
    activate(connector)
  }, [activate])

  const getBalance = useCallback(async () => {
    let balance : number;
    balance = Number((Number(await selectedLibrary?.getBalance(account!!)) / 1e18).toFixed(2));
    console.log(balance, selectedLibrary, await selectedLibrary?.getBalance(account!!))
    setBalance(balance)
  }, [ selectedLibrary, account ])


  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previouslyConnected')
  }
  const isUnsupportedChain = error instanceof UnsupportedChainIdError 

  useEffect(() => {
    if (active) {
      getBalance()
    }
  }, [active, getBalance])

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') {
      connect()
    }
  }, [connect])

  useEffect(() => {
    doSwitchLibrary(switchLibrary,setSelectedLibrary, library)
  }, [switchLibrary, library, setSelectedLibrary])

  useMemo(
    () => {
      if (active && selectedLibrary && chainId) {
        return selectedLibrary.contractInstance(ProposalContractABI, PROPOSAL_CONTRACT_ADDRESS_GOERLI!!)
      }
    },
    [ active, chainId, selectedLibrary, PROPOSAL_CONTRACT_ADDRESS_GOERLI]
  )

  return (
    <div className="App">
      <LibraryContext.Provider value={{active, account, activate, error, deactivate, chainId, selectedLibrary,setSelectedLibrary}}>
      <Header />
      <input 
        checked={switchLibrary}
        type="checkbox"
        onChange={() => { setSwitchLibrary(!switchLibrary) }}
      />
      <header className="App-header">
        <Home />
        {
          active ?
            <div>
              <p>{account} - {balance}</p>
              <button onClick={disconnect}> Desconectar </button>
            </div>
          : 
          isUnsupportedChain ? 
            'Red no soportada'
            :
            Object.keys(connectorsByName).map((name) => {
              return (
                <button key={name} onClick={connect}>
                 Connect
                </button>
              )
            })
        }
      </header>
      </LibraryContext.Provider>
    </div>
  );
}

export default App;
