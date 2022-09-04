import { useCallback, useEffect } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'

// Components
import Logo from '../Logo'
import LibSelector from '../LibSelector/indext'
import Button from '../Button'
import Address from '../Addres'

// Web3 connectors
import { connector } from '../../config/web3'

import styles from './Navbar.module.scss'

export default function Navbar() {
  const { active, activate, error } = useWeb3React()
  const isUnsupportedChain = error instanceof UnsupportedChainIdError

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', 'true')
  }, [activate])

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') connect()
  }, [connect])

  return (
    <div className={`${styles.navbar} shadow-md`}>
      <Logo className={styles.navbar__logo} />
      <LibSelector />
      {active
        ? <Address />
        : <Button onClick={connect}>
          {isUnsupportedChain ? 'Red no soportada' : 'Conectar Wallet'}
        </Button>
      }
    </div>
  )
}
