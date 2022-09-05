import React, { useEffect, useState } from "react";
import { Radio, RadioGroup, Stack, Button, Divider } from "@chakra-ui/react";
import { mainStore } from "../../../../data/stores/main_store";
import { VotingService } from "../../../../domain/services/voting_service";
import "./NavBar.css"

function NavBar() {
  const {
    isWalletConnected,
    connectedWallet,
    disconnectedWallet,
    addressConnected,
    selectedLibrary,
    changeGateway,
    libraries,
    setAlreadyVoted,
  } = mainStore();

  const [library, setLibraryId] = useState(selectedLibrary.id);

  useEffect(() => {
    changeGateway(library);
  }, [library]);

  async function connectWallet() {
    const voting_service = new VotingService(selectedLibrary.gateway);
    await voting_service.connectWallet();
    const address = await voting_service.getAddress();
    const alreadyVoted = await voting_service.getVote(address);
    connectedWallet(address);
    if (alreadyVoted != "0") {
      setAlreadyVoted();
    }
  }

  const availableLibraries = libraries.map((library) => (
    <Radio key={library.name} value={library.id}>
      {library.name}
    </Radio>
  ));

  return (
    <div className="col col-12 mt-3 app-navbar">
    <section className="g-0 m-0 row col-12">
      <div className="col col-6 text-start px-5 my-auto">
        <h2 className="my-2">Select your preferred Library</h2>
        <RadioGroup onChange={setLibraryId} value={library}>
          <Stack direction="row">{availableLibraries}</Stack>
        </RadioGroup>
      </div>
      <div className="col col-6 text-end px-5 my-auto">
        {isWalletConnected ? (
          <Button className="app-button" colorScheme="red" onClick={disconnectedWallet}>
            Disconnect Wallet <br />
            {addressConnected}
          </Button>
        ) : (
          <Button className="app-button" colorScheme="blue" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </div>
      {/* <Divider className="mt-3" /> */}
    </section>
    </div>
  );
}

export default NavBar;
