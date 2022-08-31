import create from "zustand";

interface AppState {
  walletConnected: boolean;
  addressConnected:string
  connectWallet: () => void;
  disconnectWallet: () => void;
}


export const mainStore = create<AppState>((set) => ({
  walletConnected: true,
  addressConnected: '',
  connectWallet: () => {
    set((state) => ({
      walletConnected: true,
    }));
  },
  disconnectWallet: () => {
    set((state) => ({
      walletConnected: false,
    }));
  },
}));
