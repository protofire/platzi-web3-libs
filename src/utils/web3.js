import Web3 from 'web3'
import ProposalArtifact from '../config/artifacts/proposal'

export class Web3Proposal {
  constructor(chainId, provider) {
    const contractAddress = ProposalArtifact.address[chainId]
    const abi = ProposalArtifact.abi
    this.web3 = new Web3(provider)

    this.proposalContract = new this.web3.eth.Contract(
        abi,
        contractAddress
    )
  }

  async proposalId() {
    const proposalId = await this.proposalContract.methods.proposalId().call()
    return Number(proposalId)
  }

  async votesForYes() {
    const votesForYes = await this.proposalContract.methods.votesForYes().call()
    return Number(votesForYes)
  }

  async votesForNo() {
    const votesForNo = await this.proposalContract.methods.votesForNo().call()
    return Number(votesForNo)
  }

  async VOTE_FEE() {
    const VOTE_FEE = await this.proposalContract.methods.VOTE_FEE().call()
    return Web3.utils.fromWei(VOTE_FEE)
  }

  async getVote() {
    const accounts = await this.web3.eth.getAccounts()
    const vote = await this.proposalContract.methods.getVote(accounts[0]).call()
    return Number(vote) || undefined
  }

  // 1 no | 2 yes
  async vote(vote) {
    const fee = await this.VOTE_FEE()
    try {
      const accounts = await this.web3.eth.getAccounts()
      const receipt = await this.proposalContract.methods
        .vote(vote)
        .send({
          from: accounts[0],
          value: Web3.utils.toWei(fee),
        })
  
      return receipt
    } catch (error) {
      console.log(">err", error)
    }
  }
}
