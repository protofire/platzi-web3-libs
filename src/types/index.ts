import { Web3Provider } from '@ethersproject/providers'
import Web3 from 'web3'

export interface Proposal {
  proposalId: () => Promise<number>
  votesForYes: () => Promise<number>
  votesForNo: () => Promise<number>
  VOTE_FEE: () => Promise<string>
}

export type MultiLibraries = {
  ethers: Web3Provider
  web3: Web3
}
