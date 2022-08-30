import { Web3Provider } from '@ethersproject/providers'
import Web3 from 'web3'

export interface Proposal {
  proposalId: () => Promise<number>
  votesForYes: () => Promise<number>
  votesForNo: () => Promise<number>
  VOTE_FEE: () => Promise<string>
  getVote(): Promise<Vote | undefined>
  vote(vote: Vote): Promise<string>
}

export type MultiLibraries = {
  ethers: Web3Provider
  web3: Web3
}

export enum Vote {
  No = 1,
  Yes = 2,
}
