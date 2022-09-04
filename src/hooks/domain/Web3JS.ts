import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import {Contract} from 'web3-eth-contract';
import { Provider, Votes, VoteType, VoteResponse, GAS_PRICE_LIMIT } from './Provider'

export class Web3JS implements Provider<Web3> {
  library: Web3
  contract?: Contract

  constructor(provider: any) {
    this.library = new Web3(provider) as Web3
  }

  getLibrary(): Web3 {
    return this.library
  }

  async getBalance(account: string): Promise<Number> {
    return  Number(await this.library.eth.getBalance(account!!))
  }

  contractInstance(abi:AbiItem[], address: string): any {
    this.contract = new this.library.eth.Contract(abi, address)
    return this.contract
  }

  async getVotes() : Promise<Votes> {
    const votesForNo: Number = Number(await this.contract?.methods.votesForNo().call())
    const votesForYes: Number = Number(await this.contract?.methods.votesForYes().call())
    return {
      voteForYes: votesForYes,
      voteForNo: votesForNo
    }
  }

  async sendVote(account: string, vote: VoteType) : Promise<VoteResponse> {
    const voteFee : Number = await this.getVoteFee()
    return await this.contract?.methods.vote(BigInt(vote)).send({
      from: account,
      gas: GAS_PRICE_LIMIT,
      value: voteFee // 0.01 ETH
    }).on('receipt', () => {
      return {
        message: "Transaction send successfull",
        result: true
      };
    }).on('error', (e: any) => {
      return {
        message: "Fail send transaction",
        result: false 
      };
    })
  }

  async getVoteFee() : Promise<Number> {
    return await this.contract?.methods.VOTE_FEE().call()
  }

  async getVoteAccount(account : string) : Promise<VoteType> {
    return await this.contract?.methods.getVote(account).call()
  }

  getVoteCastEvent(callbackEvent: any)  :void {
    const options = {
      filter: {
        value: []
      },
      fromBlock: 0
    }
    this.contract?.events.VoteCasted(options)
      .on('data', (event: any) => {
        callbackEvent(callbackEvent)
      })
  }

}
