import { createContext } from "react";
import { useState } from "react";

export const WalletContext = createContext();

export const ContextProvider = ({ children }) => {
  const [wallet, setWallet] = useState({ address: null, connected: false, balance: null });
  const [chain, setChain] = useState({name: null, id: null})
  const [library, setLibrary] = useState("ethers"); // ethers or web3

  return (
    <WalletContext.Provider value={{ wallet, setWallet, library, setLibrary, chain, setChain }}>
      {children}
    </WalletContext.Provider>
  );
};
