import { Web3Provider } from '@ethersproject/providers'
import Web3 from 'web3'
import { Provider, Votes } from './Provider'
// T = Web3 | Web3Provider

export class Web3JS implements Provider<Web3> {
  library: Web3

  constructor(provider: any) {
    this.library = new Web3(provider) as Web3
  }

  getLibrary(): Web3 {
    return this.library
  }

  async getBalance(account: string): Promise<Number> {
    return  Number(await this.library.eth.getBalance(account!!))
  }

  getContract(): any {

  }

  getVotes() : Votes {
    return {voteForYes:0, voteForNo: 0}
  }
}
