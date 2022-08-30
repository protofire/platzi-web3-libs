import React from 'react'
import { useCustomWeb3React } from '../hooks'

function BlockNumber() {
  const { chainId, library } = useCustomWeb3React()

  const [blockNumber, setBlockNumber] = React.useState<number | null>(null)

  React.useEffect((): any => {
    if (!!library) {
      let stale = false

      library.ethers
        .getBlockNumber()
        .then((blockNumber: number) => {
          if (!stale) {
            setBlockNumber(blockNumber)
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null)
          }
        })

      const updateBlockNumber = (blockNumber: number) => {
        setBlockNumber(blockNumber)
      }
      library.ethers.on('block', updateBlockNumber)

      return () => {
        stale = true
        library.ethers.removeListener('block', updateBlockNumber)
        setBlockNumber(null)
      }
    }
  }, [library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <span>Block Number</span>
      <span role="img" aria-label="numbers">
        🔢
      </span>
      <span>{blockNumber === null ? 'Error' : blockNumber ?? ''}</span>
    </>
  )
}

export default BlockNumber
