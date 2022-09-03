import { useCallback, useEffect, useState, createContext }from 'react';
import logo from './logo.svg';
import './App.css';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { Providers, connector } from './config/web3'
///import { Home } from './views/Home'
import { Header } from './components/Header'

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


function App() {
  const { active, error, activate, deactivate, account, library} = useWeb3React<Providers>()
  const [ selectedLibrary, setSelectedLibrary ] = useState(library?.web3)
  const [ switchLibrary, setSwitchLibrary] = useState(true)
  const [ balance, setBalance ] = useState(0)

  const LibraryContext = createContext({
    selectedLibrary,
    setSelectedLibrary 
  });

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


  //<Home />
  return (
    <div className="App">
      <LibraryContext.Provider value={{selectedLibrary,setSelectedLibrary}}>
      <Header />
      <input 
        checked={switchLibrary}
        type="checkbox"
        onChange={() => { setSwitchLibrary(!switchLibrary) }}
      />
      <header className="App-header">
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
