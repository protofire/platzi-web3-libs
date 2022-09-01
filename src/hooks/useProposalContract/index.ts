import { useMemo } from 'react'
import {useWeb3React } from '@web3-react/core'
import { ProposalContractABI } from '../../config/artifacts'


const { address, abi } = ProposalContractABI

const useProposalContract = () => {
  const {active, library, chainId } = useWeb3React()

  const contract = useMemo(
    () => {
      if (active)
        return new library.eeth.Contract(abi, address[chainId])
    },
    [ active, chainId, library?.eth?.Contract ]
  )
}
