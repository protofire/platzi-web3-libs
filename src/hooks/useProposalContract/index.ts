import { useMemo } from 'react'
import {useWeb3React } from '@web3-react/core'
import { ProposalContractABI, PROPOSAL_CONTRACT_ADDRESS_GOERLI } from '../../config/artifacts'
import { Providers } from '../../config/web3'

const abi = ProposalContractABI

export const useProposalContract = () => {
  const { 
    active, library, chainId
  } = useWeb3React<Providers>()
  const contract  = useMemo(
    () => {
      if (active && library && chainId)
        return new library.web3Library.eth.Contract(abi, PROPOSAL_CONTRACT_ADDRESS_GOERLI)
    },
    [ active, chainId, library?.web3Library.eth.Contract, PROPOSAL_CONTRACT_ADDRESS_GOERLI]
  )

  return contract

}
