import { VotingGateway } from "./../../../domain/gateways/voting_gateway";
import { VotingRepository } from "./../../../domain/repositories/voting_repository";

export class VotingRepositoryImpl implements VotingRepository {
  voting_gateway: VotingGateway;

  constructor(voting_gateway: VotingGateway) {
    this.voting_gateway = voting_gateway;
  }

  async makeVote(vote: boolean) {
   await this.voting_gateway.makeVote(vote)
  }
}
