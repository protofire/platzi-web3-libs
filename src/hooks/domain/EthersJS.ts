import { Web3Provider } from '@ethersproject/providers'
import { Contract, ContractInterface } from "ethers"
import { AbiItem } from 'web3-utils'
import { Provider, Votes, VoteType, VoteResponse, GAS_PRICE_LIMIT } from './Provider'
// T = Web3 | Web3Provider


export class EthersJS implements Provider<Web3Provider> {
  library: Web3Provider
  contract?: Contract

  constructor(provider: any, polling: number) {
    this.library = new Web3Provider(provider) as Web3Provider
    this.library.pollingInterval = polling
  }

  getLibrary(): Web3Provider {
    return this.library
  }

  async getBalance(account: string): Promise<Number> {
    return Number(await this.library.getBalance(account!!))
  }

  contractInstance(abi:AbiItem[], address: string) : any {
    this.contract = new Contract(address, abi as ContractInterface, this.library)
    return this.contract
  }

  async getVotes() : Promise<Votes> {
    const votesForNo = Number(await this.contract?.votesForNo())
    const votesForYes = Number(await this.contract?.votesForYes())
    return {
      voteForYes: votesForYes,
      voteForNo: votesForNo
    }
  }

  async sendVote(account: string, vote: VoteType) : Promise<VoteResponse> {

    try { 
      const voteTx = await this.contract?.vote(vote, {
        from: account,
        gasLimit: GAS_PRICE_LIMIT,
        value: await this.getVoteFee()
      })
      await voteTx.wait()
      return {
        message: "sended",
        result: true
      };
    } catch {
      return {
        message: "error",
        result: false 
      };
    }
  }

  async getVoteFee() : Promise<Number> {
    return await this.contract?.VOTE_FEE()
  }

  async getVoteAccount(account : string) : Promise<VoteType> {
    return await this.contract?.getVote(account)
  }
}
