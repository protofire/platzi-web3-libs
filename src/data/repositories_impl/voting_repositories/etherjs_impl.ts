import { Contract, ethers } from "ethers";
import { ConnectorProvider } from "../../../domain/repositories/connector_provider";
import { VotingRepository } from "../../../domain/repositories/voting_repositorie";
import contractABI from "../../../assets/contract_ABI.json";

export class EthersjsGateway implements VotingRepository {
  private provider: ethers.providers.Web3Provider;
  private contract_address: string;

  constructor(connector_provider: ConnectorProvider) {
    const connector = connector_provider.getConnectorProvider();
    this.provider = new ethers.providers.Web3Provider(connector);
    this.contract_address = import.meta.env.VITE_CONTRACT_ADDRES;
  }

  private getContract() {
    const signer = this.provider.getSigner();
    const contract = new Contract(this.contract_address, contractABI, signer);
    return contract;
  }

  async getVote(address: string) {
    const contract = this.getContract();
    const vote = await contract.getVote(address);
    return vote.toString();
  }

  async getNegativeVotes() {
    const contract = this.getContract();
    const votes = await contract.votesForNo();
    return votes.toString();
  }

  async getPositiveVotes() {
    const contract = this.getContract();
    const votes = await contract.votesForYes();
    return votes.toString();
  }

  async getAddress() {
    const signer = this.provider.getSigner();
    const address = await signer.getAddress();
    return address;
  }

  async makeVote(vote: string) {
    const contract = this.getContract();
    const fee = await contract.VOTE_FEE();
    await contract.vote(vote, { value: fee });
  }

  async connectWallet() {
    await this.provider.send("wallet_requestPermissions", [
      {
        eth_accounts: {},
      },
    ]);
  }
}
