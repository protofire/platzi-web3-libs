import { ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/providers'
import ProposalArtifact from '../config/artifacts/proposal'

// A Human-Readable ABI; for interacting with the contract, we
// must include any fragment we wish to use
const abi = [
  // Read-Only Functions
  'function proposalId() view returns (uint256)',
  'function votesForNo() view returns (uint256)',
  'function votesForYes() view returns (uint256)',
  'function VOTE_FEE() view returns (uint256)',
  'function getVote(address _user) external view returns (uint256)',

  // Authenticated Functions
  'function vote(uint256 _vote) external payable',

  // Events
  'event VoteCasted(uint256 indexed proposalId, address indexed from, uint256 vote)',
]

export class EthersProposal {
  constructor(chainId, provider) {
    let contractAddress = ProposalArtifact.address[chainId]
    let abi = ProposalArtifact.abi
    this.proposalContract = new ethers.Contract(
      contractAddress,
      abi,
      provider.getSigner()
    )
  }

  async proposalId() {
    const proposalId = await this.proposalContract.proposalId()
    return proposalId.toNumber()
  }

  async votesForYes() {
    const votesForYes = await this.proposalContract.votesForYes()
    return votesForYes.toNumber()
  }

  async votesForNo() {
    const votesForNo = await this.proposalContract.votesForNo()
    return votesForNo.toNumber()
  }

  async VOTE_FEE() {
    const VOTE_FEE = await this.proposalContract.VOTE_FEE()
    return ethers.utils.formatEther(VOTE_FEE)
  }

  async getVote() {
    const address = await this.proposalContract.signer.getAddress()
    const vote = await this.proposalContract.getVote(address)
    return vote.toNumber() || undefined
  }

  // 1 no | 2 yes
  async vote(vote) {
    const fee = await this.VOTE_FEE()
    try {
      const tx = await this.proposalContract.vote(vote, {
        value: ethers.utils.parseEther(fee),
      })
      return tx
    } catch (error) {
      console.log(">", error)
    }
  }
}
