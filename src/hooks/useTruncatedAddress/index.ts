import { useMemo } from 'react'

const useTruncatedAddress = (account: string) => {
  const truncated = useMemo(
    () => `${account?.slice(0, 6)}...${account?.slice(-4)}`,
    [account]
  )

  return truncated
}

export default useTruncatedAddress
