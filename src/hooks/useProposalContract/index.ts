import { useMemo } from 'react'
import {useWeb3React } from '@web3-react/core'

const useProposalContract = () => {
  const {active, library, chainId } = useWeb3React()

  const contract = useMemo(
    () => new library.eeth.Contract("address", abi),
    [ active, chainId, library?.eth?.Contract]
  )
}
