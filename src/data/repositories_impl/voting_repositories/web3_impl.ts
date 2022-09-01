import { ConnectorProvider } from "../../../domain/repositories/connector_provider";
import { VotingRepository } from "../../../domain/repositories/voting_repositorie";

export class Web3Gateway implements VotingRepository {
  connector_provider: ConnectorProvider;

  constructor(connector_provider: ConnectorProvider) {
    this.connector_provider = connector_provider;
  }
  getVote(address: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getNegativeVotes(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getPositiveVotes(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  getAddress(): Promise<string> {
    throw new Error("Method not implemented.");
  }

  makeVote(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async connectWallet() {
    const connector = this.connector_provider.getConnectorProvider();
    console.log('Libreria Web3')
    // const provider = new ethers.providers.Web3Provider(connector);
    // await provider.send("eth_requestAccounts", []);
  }
  
  disconnectWallet(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}