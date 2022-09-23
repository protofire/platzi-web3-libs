import { ethers } from "ethers";
import ContractArtifact from "../artifacts/Contract";

const { address, etherABI } = ContractArtifact;

export class EthersMethod {
  constructor(chainId, provider) {
    this.contract = new ethers.Contract(
      address[chainId],
      etherABI,
      provider.getSigner()
    );
  }

  async proposalId() {
    const proposalId = await this.contract.proposalId();
    return proposalId.toNumber();
  }

  async votesForYes() {
    const votesForYes = await this.contract.votesForYes();
    return votesForYes.toNumber();
  }

  async votesForNo() {
    const votesForNo = await this.contract.votesForNo();
    return votesForNo.toNumber();
  }

  async VOTE_FEE() {
    const VOTE_FEE = await this.contract.VOTE_FEE();
    return ethers.utils.formatEther(VOTE_FEE);
  }

  async getVote() {
    const address = await this.contract.signer.getAddress();
    const vote = await this.contract.getVote(address);
    return vote.toNumber() || undefined;
  }

  async vote(vote) {
    const fee = await this.VOTE_FEE();
    const tx = await this.contract.vote(vote, {
      value: ethers.utils.parseEther(fee),
    });

    return tx.hash;
  }
}

export default EthersMethod;
