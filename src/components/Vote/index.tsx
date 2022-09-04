import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useContract from '../../hooks/useContract'

import styles from './Vote.module.scss'

function Vote() {
  const { account } = useWeb3React()
  const { contract, read } = useContract()

  const [vote, setVote] = useState(0)

  const getData = useCallback(async () => {
    if (contract) {
      setVote(1 || await read('getVote', [account]))
    }
  }, [contract])

  useEffect(() => {
    getData()
  }, [getData])
  return (
    <div className={styles.vote}>
      <h1 className='text-2xl'>
        {vote === 0
          ? 'Usted todavia no ha votado'
          : (<>
            Usted voto por {' '}
            <b>{vote === 1 ? 'si' : 'no'}</b>
          </>)}
      </h1>
    </div>
  )
}

export default Vote
