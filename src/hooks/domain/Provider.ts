import { Web3Provider } from '@ethersproject/providers'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
// T = Web3 | Web3Provider

export type Votes = {
  voteForNo: Number,
  voteForYes: Number,
}

export type VoteResponse = {
  message: string,
  result: boolean
}

export enum VoteType {
  YES,
  NO
}

export const GAS_PRICE_LIMIT = 200000

export interface Provider<T>{
  getLibrary(): T
  getBalance(address: string): Promise<Number>
  contractInstance(abi:AbiItem[], address: string): any
  getVotes() : Promise<Votes>
  sendVote(address: string, vote: VoteType): Promise<VoteResponse>
  getVoteAccount(account: string) : Promise<VoteType>
  getVoteFee(): Promise<Number>
  getVoteCastEvent(callbackEvent: any) : void

}
