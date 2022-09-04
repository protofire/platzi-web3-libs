import { ConnectorProvider } from "../../../domain/repositories/connector_provider";
import { VotingRepository } from "../../../domain/repositories/voting_repositorie";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import contractABI from "../../../assets/contract_ABI.json";

export class Web3Gateway implements VotingRepository {
  private provider: Web3;
  private contract_address = import.meta.env.VITE_CONTRACT_ADDRES;

  constructor(connector_provider: ConnectorProvider) {
    const connector = connector_provider.getConnectorProvider();
    this.provider = new Web3(connector);
  }

  private getUnsignedContract() {
    const contract = new this.provider.eth.Contract(
      contractABI as AbiItem[],
      this.contract_address
    );
    return contract;
  }

  async getVote(address: string) {
    console.log("# Using Web3Js Library");
    const contract = this.getUnsignedContract();
    const vote = await contract.methods.getVote(address).call();
    return vote.toString();
  }

  async getNegativeVotes() {
    console.log("# Using Web3Js Library");

    const contract = this.getUnsignedContract();
    const votes = await contract.methods.votesForNo().call();
    return votes.toString();
  }

  async getPositiveVotes() {
    console.log("# Using Web3Js Library");

    const contract = this.getUnsignedContract();
    const votes = await contract.methods.votesForYes().call();
    return votes.toString();
  }

  async getAddress() {
    console.log("# Using Web3Js Library");
    const accounts = await this.provider.eth.getAccounts();
    return accounts[0];
  }

  async makeVote(vote: string) {
    console.log("# Using Web3Js Library");
    const contract = this.getUnsignedContract();
    const fee = await contract.methods.VOTE_FEE().call();
    const address = await this.getAddress();
    const result = await contract.methods.vote(vote).send({
      from: address,
      value: fee,
    });
    return result;
  }

  async connectWallet() {
    await this.provider.eth.requestAccounts();
  }
}
