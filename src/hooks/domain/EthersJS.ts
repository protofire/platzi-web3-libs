import { Web3Provider } from '@ethersproject/providers'
import { Provider, Votes } from './Provider'
// T = Web3 | Web3Provider


export class EthersJS implements Provider<Web3Provider> {
  library: Web3Provider

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

  getContract(): any {

  }

  getVotes() : Votes {
    return {voteForYes:0, voteForNo: 0}
  }
}
