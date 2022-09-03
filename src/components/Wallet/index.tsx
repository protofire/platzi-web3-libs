import { useEffect, useState, useContext, useCallback } from "react"
import { LibraryContext } from "../../App"
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError } from '@web3-react/core'
import { connector } from '../../config/web3'
import { walletParse } from "../../hooks/helpers/walletParser"

enum ConnectorNames {
  Injected = 'MetaMask',
}

const connectorsByName: { [key: string]: AbstractConnector } = {
  [ConnectorNames.Injected]: connector,
}

export const Wallet = () => {
  const { active, error, activate, deactivate, account, selectedLibrary } =  useContext(LibraryContext)
  const [ balance, setBalance ] = useState(0)

  const connect = useCallback(()  => {
    localStorage.setItem('previouslyConnected', 'true')
    activate(connector)
  }, [activate])

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
    if (localStorage.getItem('previouslyConnected') === 'true') {
      connect()
    }
  }, [connect])

  useEffect(() => {
    if (active) {
      getBalance()
    }
  }, [active, getBalance])

  return (
    <div>
    {
      active && account ?
        <div>
          <p>{walletParse(account)} - {balance}</p>
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
