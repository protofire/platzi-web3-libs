import create from "zustand";
import { VotingRepository } from "../../domain/repositories/voting_repositorie";
import { MetamaskProvider } from "../connector_providers/metamask_provider";
import { EthersjsGateway } from "../repositories_impl/voting_repositories/etherjs_impl";
import { Web3Gateway } from "../repositories_impl/voting_repositories/web3_impl";

interface AppState {
  isWalletConnected: boolean;
  addressConnected: string;
  selectedLibrary: { id: string; name: string; gateway: VotingRepository };
  libraries: {
    id: string;
    name: string;
    gateway: VotingRepository;
  }[];
  connectedWallet: (address: string) => void;
  disconnectedWallet: () => void;
  changeGateway: (id: string) => void;
}

const connector_provider = new MetamaskProvider();

const ethersGateway = new EthersjsGateway(connector_provider);
const web3Gateway = new Web3Gateway(connector_provider);

export const mainStore = create<AppState>((set) => ({
  isWalletConnected: false,
  addressConnected: "",
  selectedLibrary:  { id: "2", name: "Web3", gateway: web3Gateway },
  libraries: [
    { id: "1", name: "EthersJs", gateway: ethersGateway },
    { id: "2", name: "Web3", gateway: web3Gateway },

  ],

  connectedWallet: (address: string) => {
    set((state) => ({
      isWalletConnected: true,
      addressConnected: address,
    }));
  },

  disconnectedWallet: () => {
    set((state) => ({
      isWalletConnected: false,
      addressConnected: "",
    }));
  },

  changeGateway: (id: string) => {
    set((state) => ({
      selectedLibrary: state.libraries.find((library) => library.id == id),
    }));
  },
}));
