import React from 'react'
import { formatEther } from 'ethers/lib/utils'
import { useCustomWeb3React } from '../hooks'

function Balance() {
  const { account, library, chainId } = useCustomWeb3React()
  const [balance, setBalance] = React.useState(null)

  React.useEffect((): any => {
    if (!!account && !!library) {
      let stale = false

      library.ethers
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null)
          }
        })

      return () => {
        stale = true
        setBalance(null)
      }
    }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <span>Balance</span>
      <span role="img" aria-label="gold">
        💰
      </span>
      <span>
        {balance === null ? 'Error' : balance ? `Ξ${formatEther(balance)}` : ''}
      </span>
    </>
  )
}

export default Balance
