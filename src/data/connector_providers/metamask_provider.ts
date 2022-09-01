import { ConnectorProvider } from "./../../domain/repositories/connector_provider";

export class MetamaskProvider implements ConnectorProvider {
  private ethereum = window.ethereum;
  getConnectorProvider = () => this.ethereum;
}
