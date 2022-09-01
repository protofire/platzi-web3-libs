import create from "zustand";
import { VotingRepository } from "../../domain/repositories/voting_repositorie";
import { MetamaskProvider } from "../connector_providers/metamask_provider";
import { EthersjsGateway } from "../repositories_impl/voting_repositories/etherjs_impl";
import { Web3Gateway } from "../repositories_impl/voting_repositories/web3_impl";

interface AppState {
  isWalletConnected: boolean;
  addressConnected: string;
  selectedLibrary: { name: string; gateway: VotingRepository };
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
  selectedLibrary: { name: "Web3", gateway: ethersGateway },
  libraries: [
    { id: "1", name: "Web3", gateway: web3Gateway },
    { id: "2", name: "EthersJs", gateway: ethersGateway },
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
