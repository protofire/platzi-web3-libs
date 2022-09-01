import React, { useEffect, useState } from "react";
import { Radio, RadioGroup, Stack, Button } from "@chakra-ui/react";
import { mainStore } from "../../../../data/stores/main_store";
import { VotingService } from "../../../../domain/services/voting_service";

function NavBar() {
  const [library, setLibraryId] = useState("1");

  useEffect(() => {
    changeGateway(library);
  }, [library]);

  const {
    isWalletConnected,
    connectedWallet,
    disconnectedWallet,
    addressConnected,
    selectedLibrary,
    changeGateway,
    libraries,
  } = mainStore();

  async function connectWallet() {
    const voting_service = new VotingService(selectedLibrary.gateway);
    await voting_service.connectWallet();
    const address = await voting_service.getAddress();
    connectedWallet(address);
  }

  const availableLibraries = libraries.map((library) => (
    <Radio key={library.name} value={library.id}>
      {library.name}
    </Radio>
  ));

  return (
    <section className="g-0 m-0 row col-12 mt-3">
      <div className="col col-6 text-start px-5">
        <h2 className="my-2">Select your preferred Library</h2>
        <RadioGroup onChange={setLibraryId} value={library}>
          <Stack direction="row">{availableLibraries}</Stack>
        </RadioGroup>
      </div>
      <div className="col col-6 text-end px-5">
        {isWalletConnected ? (
          <Button colorScheme="red" onClick={disconnectedWallet}>
            Disconnect Wallet <br />
            {addressConnected}
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
