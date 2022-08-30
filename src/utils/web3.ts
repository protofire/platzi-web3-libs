import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { Contract } from 'web3-eth-contract'
import { provider } from 'web3-core'
import { PROPOSAL_ADDRESS, SupportedChainId } from '../constants'
import abi from '../constants/proposal-abi.json'
import { Proposal } from '../types'

export class Web3Proposal<T extends SupportedChainId> implements Proposal {
  private proposalContract: Contract

  constructor(public chainId: T, signer: provider) {
    const contractAddress = PROPOSAL_ADDRESS[chainId]
    const web3 = new Web3(signer)
    this.proposalContract = new web3.eth.Contract(
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
}
