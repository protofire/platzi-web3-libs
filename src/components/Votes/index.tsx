import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useContract from '../../hooks/useContract'

import styles from './Votes.module.scss'

function Votes() {
  const { contract, read } = useContract()

  const [votesForYes, setVotesForYes] = useState(0)
  const [votesForNo, setVotesForNo] = useState(0)

  const getData = useCallback(async () => {
    if (contract) {
      setVotesForYes(await read('votesForYes'))
      setVotesForNo(await read('votesForNo'))
    }
  }, [contract])

  useEffect(() => {
    getData()
  }, [getData])
  return (
    <div className={styles.votes}>
      <b>Votos por si</b>: {votesForYes}<br />
      <b>Votos por no</b>: {votesForNo}
    </div>
  )
}

export default Votes
