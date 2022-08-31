import { ConnectorProvider } from "./../repositories/provider_repository";
import { VotingRepository } from "../repositories/voting_repository";

export class VotingService {
  voting_repository: VotingRepository;
  constructor(voting_repository: VotingRepository) {
    this.voting_repository = voting_repository;
  }

  async makeVote(vote: boolean) {
    await this.voting_repository.makeVote(vote);
  }

  async connectWallet(connector_provider: ConnectorProvider) {
    await this.voting_repository.connectWallet(connector_provider);
  }
  async disconnectWallet(connector_provider: ConnectorProvider) {
    await this.voting_repository.disconnectWallet(connector_provider);
  }
}
