import { useEffect, useState, useContext, useCallback } from "react"
import { LibraryContext } from "../../App"
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError } from '@web3-react/core'
import { connector } from '../../config/web3'
import { walletParse } from "../../hooks/helpers/walletParser"
import { Button } from "./Button"

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
    <div className="mt-2 h-20">
    {
      active && account ?
        <>
          <p>
            <span className="bg-slate-300 p-2 rounded-md">{walletParse(account)}</span>
            <span className="bg-amber-300 p-2 ml-1 rounded-md">{balance} ETH</span>
          </p>
          <Button useStyle="disconnect" onClick={disconnect} text="Disconnect" />
        </>
      : 
      isUnsupportedChain ? 
        'Network unsupported - Use Goerli'
        :
        Object.keys(connectorsByName).map((name) => {
          return (
            <Button useStyle="connect" onClick={connect} text="Connect" />
          )
        })
    }
    </div>
  )
}
