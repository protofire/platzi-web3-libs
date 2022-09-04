import { ethers } from 'ethers'
import { Web3Provider, TransactionResponse } from '@ethersproject/providers'
import { Proposal, Vote } from '../types'

import { PROPOSAL_ADDRESS, SupportedChainId, ABI } from '../constants'

export class EthersProposal<T extends SupportedChainId> implements Proposal {
    private proposalContract: ethers.Contract
  
    constructor(public chainId: T, provider: Web3Provider) {
      this.proposalContract = new ethers.Contract(
        PROPOSAL_ADDRESS[chainId],
        ABI,
        provider.getSigner()
      )
    }
  
    async proposalId(): Promise<number> {
      const proposalId = await this.proposalContract.proposalId()
      return proposalId.toNumber()
    }
  
    async votesForYes(): Promise<number> {
      const votesForYes = await this.proposalContract.votesForYes()
      return votesForYes.toNumber()
    }
  
    async votesForNo(): Promise<number> {
      const votesForNo = await this.proposalContract.votesForNo()
      return votesForNo.toNumber()
    }
  
    async VOTE_FEE(): Promise<string> {
      const VOTE_FEE = await this.proposalContract.VOTE_FEE()
      return ethers.utils.formatEther(VOTE_FEE)
    }
  
    async getVote(): Promise<Vote | undefined> {
      const address = await this.proposalContract.signer.getAddress()
      const vote = await this.proposalContract.getVote(address)
      return vote.toNumber() || undefined
    }
  
    async vote(vote: Vote): Promise<string> {
      const fee = await this.VOTE_FEE()
      const tx: TransactionResponse = await this.proposalContract.vote(vote, {
        value: ethers.utils.parseEther(fee),
      })
  
      return tx.hash
    }
  }
  