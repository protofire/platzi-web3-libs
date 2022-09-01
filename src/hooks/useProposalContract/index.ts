import { useMemo } from 'react'
import {useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { ProposalContractABI } from '../../config/artifacts'
import { Providers } from '../../config/web3'


const { address, abi } = ProposalContractABI

export const useProposalContract = () => {
  const { 
    active, library, chainId
  } = useWeb3React<Providers>()
  const contract  = useMemo(
    () => {
      if (active && library)
        return new library.web3Library.eth.Contract(abi, address[5])
    },
    [ active, chainId, library?.web3Library.eth.Contract, address ]
  )

  return contract

}
