import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { mainStore } from "../../../data/stores/main_store";

function NavBar() {
  const { walletConnected, connectWallet, disconnectWallet, addressConnected } =
    mainStore();
  return (
    <section className="g-0 m-0 row col-12 mt-3">
      <div className="col col-6 text-start px-5">
        <h1>Imagen</h1>
      </div>
      <div className="col col-6 text-end px-5">
        {walletConnected ? (
          <Button colorScheme="red" onClick={disconnectWallet}>
            {addressConnected}
            Disconnect Wallet
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </div>
    </section>
  );
}

export default NavBar;
