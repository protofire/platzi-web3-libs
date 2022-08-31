import { ConnectorProvider } from "./../../../domain/repositories/provider_repository";
import { ethers } from "ethers";

export class MetamaskProvider implements ConnectorProvider {
  private ethereum = window.ethereum;
  private provider = new ethers.providers.Web3Provider(this.ethereum);
  getProvider = () => this.provider;
}