import React from 'react'
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
import Account from './Account'
import Balance from './Balance'
import BlockNumber from './BlockNumber'
import ChainId from './ChainId'
import logo from '../protofire-logo.svg'
import { injected } from '../connectors'

enum ConnectorNames {
  Injected = 'MetaMask',
}

const connectorsByName: { [key: string]: AbstractConnector } = {
  [ConnectorNames.Injected]: injected,
}

function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

function Header() {
  const { connector, library, account, activate, deactivate, active, error } =
    useCustomWeb3React()

  // handle logic to recognize the connector currently being activated
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
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 style={{ margin: '1rem', textAlign: 'right' }}>
        {active ? '🟢' : error ? '🔴' : '🟠'}
      </h1>
      <h5
        style={{
          display: 'grid',
          gridGap: '1rem',
          gridTemplateColumns: '1fr min-content 1fr',
          maxWidth: '20rem',
          lineHeight: '2rem',
          margin: 'auto',
        }}
      >
        <ChainId />
        <BlockNumber />
        <Account />
        <Balance />
      </h5>

      {!active ? (
        <>
          {Object.keys(connectorsByName).map((name) => {
            const currentConnector = connectorsByName[name]
            const activating = currentConnector === activatingConnector
            const connected = currentConnector === connector
            const disabled =
              !triedEager || !!activatingConnector || connected || !!error

            return (
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
            )
          })}
        </>
      ) : null}

      <>
        {(active || error) && (
          <button
            style={{
              height: '3rem',
              marginTop: '2rem',
              borderRadius: '1rem',
              borderColor: 'red',
              cursor: 'pointer',
            }}
            onClick={() => {
              deactivate()
            }}
          >
            Deactivate
          </button>
        )}

        {!!error && (
          <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>
            {getErrorMessage(error)}
          </h4>
        )}
      </>

      <>
        {!!(library && account) && (
          <button
            style={{
              height: '3rem',
              marginTop: '2rem',
              borderRadius: '1rem',
              cursor: 'pointer',
            }}
            onClick={() => {
              library.ethers
                .getSigner(account)
                .signMessage('👋')
                .then((signature: any) => {
                  window.alert(`Success!\n\n${signature}`)
                })
                .catch((error: any) => {
                  window.alert(
                    'Failure!' +
                      (error && error.message ? `\n\n${error.message}` : '')
                  )
                })
            }}
          >
            Sign Message
          </button>
        )}
      </>
    </header>
  )
}

export default Header
