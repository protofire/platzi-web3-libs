import { VotingRepository } from "./../repositories/voting_repositorie";
export class VotingService {
  private voting_repository: VotingRepository;
  constructor(voting_repository: VotingRepository) {
    this.voting_repository = voting_repository;
  }

  async makeVote(vote: string) {
    const result = await this.voting_repository.makeVote(vote);
    return result;
  }

  async connectWallet() {
    await this.voting_repository.connectWallet();
  }

  async getAddress() {
    const address = await this.voting_repository.getAddress();
    return address;
  }

  async getPositiveVotes() {
    const votes = await this.voting_repository.getPositiveVotes();
    return votes;
  }

  async getNegativeVotes() {
    const votes = await this.voting_repository.getNegativeVotes();
    return votes;
  }

  async getVote(address: string) {
    const result = await this.voting_repository.getVote(address);
    return result;
  }
}
