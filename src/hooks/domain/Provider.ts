import { Web3Provider } from '@ethersproject/providers'
import Web3 from 'web3'
// T = Web3 | Web3Provider

export type Votes = {
  voteForNo: Number,
  voteForYes: Number,
}

export interface Provider<T>{
  getLibrary(): T
  getBalance(address: string): Promise<Number>
  getContract(): any
  getVotes() : Votes

}
