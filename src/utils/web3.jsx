import Web3 from "web3";
import ContractArtifact from "../artifacts/Contract";

class Web3Method {
  constructor(provider, chainId) {
    this.address = ContractArtifact.address;
    this.abi = ContractArtifact.abi;
    this.web3 = new Web3(provider);
    this.contract = new this.web3.eth.Contract(this.abi, this.address[chainId]);
  }

  async VOTE_FEE() {
    const VOTE_FEE = await this.contract.methods.VOTE_FEE().call();
    return Web3.utils.fromWei(VOTE_FEE);
  }

  async proposalId() {
    const proposalId = await this.contract.methods.proposalId().call();
    return Number(proposalId);
  }

  async votesForYes() {
    const votesForYes = await this.contract.methods.votesForYes().call();
    return Number(votesForYes);
  }

  async votesForNo() {
    const votesForNo = await this.contract.methods.votesForNo().call();
    return Number(votesForNo);
  }

  async getVote() {
    const accounts = await this.web3.eth.getAccounts();
    const vote = await this.contract.methods.getVote(accounts[0]).call();
    return Number(vote) || undefined;
  }

  async vote(vote) {
    const fee = await this.VOTE_FEE();
    const accounts = await this.web3.eth.getAccounts();
    const receipt = await this.contract.methods.vote(vote).send({
      from: accounts[0],
      value: Web3.utils.toWei(fee),
    });

    return receipt.transactionHash;
  }
}

export default Web3Method;
