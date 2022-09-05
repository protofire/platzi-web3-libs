import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { hooks as metaMaskHooks, metaMask } from "../../connectors/metamask";

export default function Vote({ library }) {
  const connectors = [[metaMask, metaMaskHooks]];
  function Child() {
    const { connector } = useWeb3React();
    console.log(`Priority Connector is: ${getName(connector)}`);
    return null;
  }

  return (
    <Web3ReactProvider connectors={connectors}>
      <Child />
      <p>Estoy</p>
    </Web3ReactProvider>
  );
}
