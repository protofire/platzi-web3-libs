import { useEffect, useState, useContext, useCallback } from "react"
import { LibraryContext } from "../../App"
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Providers, connector } from '../../config/web3'

enum ConnectorNames {
  Injected = 'MetaMask',
}

const connectorsByName: { [key: string]: AbstractConnector } = {
  [ConnectorNames.Injected]: connector,
}

export const Wallet = () => {
  const { active, error, activate, deactivate, account, selectedLibrary, setSelectedLibrary, chainId } =  useContext(LibraryContext)
  const [ balance, setBalance ] = useState(0)


  const connect = useCallback(()  => {
    localStorage.setItem('previouslyConnected', 'true')
    activate(connector)
  }, [activate])



  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') {
      connect()
    }
  }, [connect])
  const disconnect = () => {
    if (deactivate) {
      deactivate()
      localStorage.removeItem('previouslyConnected')
    }
  }

  const getBalance = useCallback(async () => {
    let balance : number;
    balance = (await selectedLibrary?.getBalance(account!!)) as number ?? 0 
    balance = Number(( balance / 1e18).toFixed(2));
    setBalance(balance)
  }, [ selectedLibrary, account ])

  const isUnsupportedChain = error instanceof UnsupportedChainIdError 

  useEffect(() => {
    if (active) {
      getBalance()
    }
  }, [active, getBalance])

  return (
    <div>
    {
      active ?
        <div>
          <p>{account} - {balance}</p>
          <button onClick={disconnect}> Desconectar </button>
        </div>
      : 
      isUnsupportedChain ? 
        'Network unsupported - Use Goerli'
        :
        Object.keys(connectorsByName).map((name) => {
          return (
            <button key={name} onClick={connect}>
             Connect
            </button>
          )
        })
    }
    </div>
  )
}
