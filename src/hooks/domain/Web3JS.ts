import { Web3Provider } from '@ethersproject/providers'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import {Contract} from 'web3-eth-contract';
import { Provider, Votes } from './Provider'
// T = Web3 | Web3Provider

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
    console.log('Votes in web3js',votesForYes, votesForNo)
    return {voteForYes:votesForNo, voteForNo: votesForYes}
  }
}
