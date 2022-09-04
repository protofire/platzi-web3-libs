import React, {useState} from "react"
import { FaVoteYea } from "react-icons/fa"

import DropDown from "./DropDown"

//import Account from "./Account"
import { AbstractConnector } from '@web3-react/abstract-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { UnsupportedChainIdError } from '@web3-react/core'
import {
  useCustomWeb3React,
  useEagerConnect,
  useInactiveListener,
} from '../hooks'

import { injected } from '../connectors'

enum ConnectorNames {
    Injected = 'MetaMask',
  }
  
  const connectorsByName: { [key: string]: AbstractConnector } = {
    [ConnectorNames.Injected]: injected,
  }

const Header = () => {

    const { connector, library, account, activate, deactivate, active, error } = useCustomWeb3React()

    const [activatingConnector, setActivatingConnector] = React.useState<any>()
    React.useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector])

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect()

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector)

    return (
        <header className="sticky top-0 z-50 h-14 flex bg-cyan-800 text-slate-200 px-2 ">
            <div className="flex flex-row justify-start items-center w-screen pl-4">
                <FaVoteYea size={40} />
                <div className="text-1xl hover:text-base pl-2">Proposal</div>
            </div>

            <div className="flex flex-row justify-end items-center w-screen">
                {/*<ConnectButton moralisAuth={false} />*/}
                {/*<DropDown />*/}
               {!active ? (
                    <>
                    {Object.keys(connectorsByName).map((name) => {
                      const currentConnector = connectorsByName[name]
                      const activating = currentConnector === activatingConnector
                      const connected = currentConnector === connector
                      const disabled =
                        !triedEager || !!activatingConnector || connected || !!error
          
                      return (
                        <div className="bg-cyan-50 text-cyan-800 rounded px-2">
                          <button
                            
                              style={{
                                height: '3rem',
                                borderRadius: '1rem',
                                borderColor: activating
                                  ? 'orange'
                                  : connected
                                  ? 'green'
                                  : 'unset',
                                cursor: disabled ? 'unset' : 'pointer',
                                position: 'relative',
                              }}
                              disabled={disabled}
                              key={name}
                              onClick={() => {
                                setActivatingConnector(currentConnector)
                                activate(connectorsByName[name], (error) => {
                                  if (error) {
                                    setActivatingConnector(undefined)
                                  }
                                })
                              }}
                            >
                              <div>{activating && <>🟡 Connecting</>}</div>
                              Connect {name}
                            </button>
                        </div>                        
                      )
                    })}
                  </>
                )
                :
                null
                }

                  <div className="bg-cyan-50 text-cyan-800 rounded px-2">
                    {(active || error) && (
                    <button
                        style={{
                        height: '3rem',
                        borderRadius: '1rem',
                        borderColor: 'red',
                        cursor: 'pointer',
                        }}
                        onClick={() => {
                        deactivate()
                        }}
                    >
                        {account.slice(0,6)}...{account.slice(account.length - 4)}
                    </button>
                    )}

                    {!!error && (
                    <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>
                        {/*getErrorMessage(error)*/}
                    </h4>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
