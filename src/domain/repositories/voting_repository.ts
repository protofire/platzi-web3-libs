import { ConnectorProvider } from "./provider_repository";

export interface VotingRepository {
  makeVote(vote: boolean): Promise<void>;
  connectWallet(connector_provider: ConnectorProvider): Promise<void>;
  disconnectWallet(connector_provider: ConnectorProvider): Promise<void>;
}
