import { useCallback, useEffect, useState }from 'react';
import logo from './logo.svg';
import './App.css';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Providers, connector } from './config/web3'
import { Home } from './views/Home'
import { Header } from './components/Header'

enum ConnectorNames {
  Injected = 'MetaMask',
}

const connectorsByName: { [key: string]: AbstractConnector } = {
  [ConnectorNames.Injected]: connector,
}

function App() {
  const [ selectedLibrary, setSelectedLibrary ] = useState('web3')
  const [ balance, setBalance ] = useState(0)
  const { active, error, activate, deactivate, account, library} = useWeb3React<Providers>()

  const connect = useCallback(()  => {
    localStorage.setItem('previouslyConnected', 'true')
    activate(connector)
  }, [activate])

  const getBalance = useCallback(async () => {
    let balance : number;
    let web3;
    if (selectedLibrary === 'web3') {
      web3 = library?.web3Library.eth
    } else {
      web3 = library?.ethersLibrary
    }
    balance = Number((Number(await web3?.getBalance(account!!)) / 1e18).toFixed(2));
    setBalance(balance)
  }, [ library?.ethersLibrary, account ])


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

  return (
    <div className="App">
      <Header />
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
    </div>
  );
}

export default App;
