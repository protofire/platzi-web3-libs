import { Web3Provider } from '@ethersproject/providers'
import { Contract, ContractInterface, utils } from "ethers"
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
    let provider = this.library?.send("eth_requestAccounts", [])
    const signer = this.library.getSigner()
    this.contract = new Contract(address, abi as ContractInterface, signer)
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
        value: Number(await this.getVoteFee()),
        gasLimit: GAS_PRICE_LIMIT
      })
      await voteTx.wait()
      return {
        message: "sended",
        result: true
      };
    } catch (error) {
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

  getVoteCastEvent(callbackEvent: any)  :void {
    const options = {
      address: this.contract?.address,
      topics: [
        utils.id('VoteCasted(uint256,address,uint256)')

      ]
    }
    this.contract?.provider.on(options, () => {
        callbackEvent()
    })
  }

}
