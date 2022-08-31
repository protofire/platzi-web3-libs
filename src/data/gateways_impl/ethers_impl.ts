import { VotingGateway } from "./../../domain/gateways/voting_gateway";
import { ethers } from "ethers";
import { ConnectorProvider } from "../../domain/repositories/provider_repository";

export class EthersGateway implements VotingGateway {
  connectWallet(connector_provider: ConnectorProvider) {
    connector_provider.getProvider();
  }
  disconnectWallet(connector_provider: ConnectorProvider) {
    connector_provider.getProvider();
  }

  makeVote(vote: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
