import React from "react";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { hooks as metaMaskHooks, metaMask } from "../../connectors/metamask";
import ContractCo from "../../components/ContractCo";

export default function Vote({ library }) {
  const connectors = [[metaMask, metaMaskHooks]]

  return (
    <Web3ReactProvider connectors={connectors}>
      <ContractCo library={library}/>
    </Web3ReactProvider>
  );
}
