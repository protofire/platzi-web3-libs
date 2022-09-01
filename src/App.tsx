import { useCallback, useEffect, useState }from 'react';
import logo from './logo.svg';
import './App.css';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import {Providers} from './config/web3'

enum ConnectorNames {
  Injected = 'MetaMask',
}

const injected = new InjectedConnector({
  supportedChainIds: [5],
})

const connectorsByName: { [key: string]: AbstractConnector } = {
  [ConnectorNames.Injected]: injected,
}

function App() {
  const [ balance, setBalance ] = useState(0)
  const { active, error, activate, deactivate, account, library} = useWeb3React<Providers>()
  const { ethereum } = window as any
  const connect = useCallback(()  => {
    localStorage.setItem('previouslyConnected', 'true')
    activate(injected)
  }, [activate])

  const getBalance = useCallback(async () => {
    const web3 = library?.web3Library
    const balanceFromAccount = await web3?.eth.getBalance(account!!);
    const balanceJS : Number = (Number(balanceFromAccount) / 1e18)
    setBalance(Number(balanceJS.toFixed(2)))
  }, [library?.ethersLibrary, account])


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
  //if (ethereum && ethereum.on && !active && !error) {
  //    const handleConnect = () => {
  //      console.log("Handling 'connect' event")
  //      activate(injected)
  //    }
  //  const handleChainChanged = (chainId: string | number) => {
  //      console.log("Handling 'chainChanged' event with payload", chainId)
  //      activate(injected)
  //    }
  //  const handleAccountsChanged = (accounts: string[]) => {
  //     console.log("Handling 'accountsChanged' event with payload", accounts)
  //     if (accounts.length > 0) {
  //       activate(injected)
  //     }
  //  }
  //  const handleNetworkChanged = (networkId: string | number) => {
  //     console.log("Handling 'networkChanged' event with payload", networkId)
  //     activate(injected)
  //   }

  //   ethereum.on('connect', handleConnect)
  //   ethereum.on('chainChanged', handleChainChanged)
  //   ethereum.on('accountsChanged', handleAccountsChanged)
  //   ethereum.on('networkChanged', handleNetworkChanged)
  //}

  return (
    <div className="App">
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
          //return (  <button key={name} onClick={() => activate(connectorsByName[name], err => console.log)}>Text</button>)
        }
      </header>
    </div>
  );
}

export default App;
