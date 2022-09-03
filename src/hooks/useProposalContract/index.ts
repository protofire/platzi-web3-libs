import { useMemo, useContext, createContext } from 'react'
import {useWeb3React } from '@web3-react/core'
import { ProposalContractABI, PROPOSAL_CONTRACT_ADDRESS_GOERLI } from '../../config/artifacts'
import { Providers } from '../../config/web3'
import { LibraryContext } from "../../App"

const abi = ProposalContractABI

export const useProposalContract = () => {
  const { 
    active, selectedLibrary, chainId
  } = useContext(LibraryContext)
  const contract  = useMemo(
    () => {
      if (active && selectedLibrary && chainId) {
        console.log('get contract')
        return selectedLibrary.contractInstance(abi, PROPOSAL_CONTRACT_ADDRESS_GOERLI)
      }
    },
    [ active, chainId, selectedLibrary, PROPOSAL_CONTRACT_ADDRESS_GOERLI]
  )

  return contract

}
