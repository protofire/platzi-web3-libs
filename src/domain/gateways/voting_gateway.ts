import { ConnectorProvider } from "../repositories/provider_repository";

export interface VotingGateway {
  makeVote(vote: boolean): Promise<void>;

}
