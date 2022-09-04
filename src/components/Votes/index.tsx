import { useCallback, useEffect, useState } from 'react'
import { useContract } from '../../hooks/useContract'

import styles from './Votes.module.scss'

function Votes() {
  const { contract, read, events, unsubscribe } = useContract()

  const [votesForYes, setVotesForYes] = useState(0)
  const [votesForNo, setVotesForNo] = useState(0)

  const getData = useCallback(async () => {
    if (contract) {
      unsubscribe('VoteCasted')
      setVotesForYes(await read('votesForYes'))
      setVotesForNo(await read('votesForNo'))
      events('VoteCasted', getData);
    }
  }, [contract])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    return () => unsubscribe('VoteCasted')
  }, [])
  return (
    <div className={styles.votes}>
      <b>Votos por si</b>: {votesForYes}<br />
      <b>Votos por no</b>: {votesForNo}
    </div>
  )
}

export default Votes
