import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useContract } from '../../hooks/useContract'

import styles from './Vote.module.scss'

function Vote() {
  const { account } = useWeb3React()
  const { contract, read, send, events, unsubscribe } = useContract()

  const [vote, setVote] = useState(0)

  const handleClick = (val: number) => send('vote', [val], {
    from: account,
    value: 0.01
  })

  const getData = useCallback(async () => {
    if (contract) {
      unsubscribe('VoteCasted')
      setVote(await read('getVote', [account]))
      events('VoteCasted', getData)
    }
  }, [contract])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    return () => unsubscribe('VoteCasted')
  }, [])
  return (
    <div className={styles.vote}>
      <h1 className='text-2xl'>
        Tu voto es por:
      </h1>
      <div className={`flex space-x-1 justify-between rounded-lg bg-slate-100 p-0.5 ${styles.lib_selector}`}>
        {[{ label: 'Si', val: 2 }, { label: 'No', val: 1 }].map(item => (
          <button
            key={item.label}
            className={(item.val.toString() === vote.toString())
              ? 'flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3 hover:bg-gray-400 bg-white shadow'
              : 'flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3 hover:bg-gray-400'}
            type='button'
            onClick={() => handleClick(item.val)}
            disabled={vote.toString() !== '0'}>
            <span className={(item.val.toString() === vote.toString())
              ? 'sr-only lg:not-sr-only lg:ml-2 text-slate-900'
              : 'sr-only lg:not-sr-only lg:ml-2 text-slate-600'}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Vote
