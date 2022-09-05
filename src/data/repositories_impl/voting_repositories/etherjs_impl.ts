import { Contract, ethers } from "ethers";
import { ConnectorProvider } from "../../../domain/repositories/connector_provider";
import { VotingRepository } from "../../../domain/repositories/voting_repositorie";
import contractABI from "../../../assets/contract_ABI.json";

export class EthersjsGateway implements VotingRepository {
  private provider: ethers.providers.Web3Provider;
  private contract_address = import.meta.env.VITE_CONTRACT_ADDRES;

  constructor(connector_provider: ConnectorProvider) {
    const connector = connector_provider.getConnectorProvider();
    this.provider = new ethers.providers.Web3Provider(connector);
  }

  private getUnsignedContract() {
    const contract = new Contract(
      this.contract_address,
      contractABI,
      this.provider
    );
    return contract;
  }

  async getVote(address: string) {
    console.log("# Using EtherJs Library");
    const contract = this.getUnsignedContract();
    const vote = await contract.getVote(address);
    return vote.toString();
  }

  async getNegativeVotes() {
    console.log("# Using EtherJs Library");
    const contract = this.getUnsignedContract();
    const votes = await contract.votesForNo();
    return votes.toString();
  }

  async getPositiveVotes() {
    console.log("# Using EtherJs Library");
    const contract = this.getUnsignedContract();
    const votes = await contract.votesForYes();
    return votes.toString();
  }

  async getAddress() {
    const signer = this.provider.getSigner();
    const address = await signer.getAddress();
    return address;
  }

  async makeVote(vote: string) {
    console.log("# Using EtherJs Library");
    const signer = this.provider.getSigner();
    const contract = new Contract(this.contract_address, contractABI, signer);
    const fee = await contract.VOTE_FEE();
    const transaction = await contract.vote(vote, { value: fee });
    const result = await transaction.wait();
    return result;
  }

  async connectWallet() {
    await this.provider.send("eth_requestAccounts", [
      {
        eth_accounts: {},
      },
    ]);
  }
}
