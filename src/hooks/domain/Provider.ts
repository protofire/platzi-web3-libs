import { Web3Provider } from '@ethersproject/providers'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
// T = Web3 | Web3Provider

export type Votes = {
  voteForNo: Number,
  voteForYes: Number,
}

export interface Provider<T>{
  getLibrary(): T
  getBalance(address: string): Promise<Number>
  contractInstance(abi:AbiItem[], address: string): any
  getVotes() : Promise<Votes>

}
