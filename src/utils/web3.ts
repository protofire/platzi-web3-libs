import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { Contract } from 'web3-eth-contract'
import { provider, TransactionReceipt } from 'web3-core'
import { PROPOSAL_ADDRESS, SupportedChainId } from '../constants'
import abi from '../constants/proposal-abi.json'
import { Proposal, Vote } from '../types'

export class Web3Proposal<T extends SupportedChainId> implements Proposal {
  private proposalContract: Contract
  private web3: Web3

  constructor(public chainId: T, provider: provider) {
    const contractAddress = PROPOSAL_ADDRESS[chainId]
    this.web3 = new Web3(provider)

    this.proposalContract = new this.web3.eth.Contract(
      abi as AbiItem[],
      contractAddress
    )
  }

  async proposalId(): Promise<number> {
    const proposalId = await this.proposalContract.methods.proposalId().call()
    return Number(proposalId)
  }

  async votesForYes(): Promise<number> {
    const votesForYes = await this.proposalContract.methods.votesForYes().call()
    return Number(votesForYes)
  }

  async votesForNo(): Promise<number> {
    const votesForNo = await this.proposalContract.methods.votesForNo().call()
    return Number(votesForNo)
  }

  async VOTE_FEE(): Promise<string> {
    const VOTE_FEE = await this.proposalContract.methods.VOTE_FEE().call()
    return Web3.utils.fromWei(VOTE_FEE)
  }

  async getVote(): Promise<Vote | undefined> {
    const accounts = await this.web3.eth.getAccounts()
    const vote = await this.proposalContract.methods.getVote(accounts[0]).call()
    return Number(vote) || undefined
  }

  async vote(vote: Vote): Promise<string> {
    const fee = await this.VOTE_FEE()
    const accounts = await this.web3.eth.getAccounts()
    const receipt: TransactionReceipt = await this.proposalContract.methods
      .vote(vote)
      .send({
        from: accounts[0],
        value: Web3.utils.toWei(fee),
      })

    return receipt.transactionHash
  }
}
