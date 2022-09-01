import React, { useEffect, useState } from "react";
import "./App.css";

import NavBar from "./components/organisms/navbar/NavBar";
import { Button, Input } from "@chakra-ui/react";
import { mainStore } from "../data/stores/main_store";
import { VotingService } from "../domain/services/voting_service";
import { Card } from "./components/organisms/card/Card";

function App() {
  const { selectedLibrary, isWalletConnected } = mainStore();

  const service = new VotingService(selectedLibrary.gateway);

  const [positiveVotes, setPositiveVotes] = useState("0");
  const [negativeVotes, setNegative] = useState("0");

  useEffect(() => {
    const getVotes = async () => {
      const positiveVotes = await service.getPositiveVotes();
      const negativeVotes = await service.getNegativeVotes();
      setPositiveVotes(positiveVotes);
      setNegative(negativeVotes);
    };
    getVotes();
  }, [isWalletConnected]);

  const [checkAddress, setCheckAddress] = useState("");

  const handleAddressChange = (event) => {
    setCheckAddress(event.target.value);
  };

  async function checkAddressVote() {
    await service.getVote(checkAddress);
  }

  return (
    <div className="container-fluid normalize ">
      <div className="normalize row col-12">
        <NavBar></NavBar>
        <section className="normalize row col-12 justify-content-center mt-5">
          <Card
            votes={positiveVotes}
            voteFor={"2"}
            name="POSITIVE VOTES"
            buttonName="Vote YES"
          ></Card>
          <Card
            votes={negativeVotes}
            voteFor={"1"}
            name="NEGATIVE VOTES"
            buttonName="Vote NO"
          ></Card>
        </section>
        <section className="normalize row col-12 justify-content-center mt-5 text-center">
          <div className="col col-5 mx-auto">
            <h2 className="text-center my-4">Check address vote</h2>
            <Input
              className="text-center"
              placeholder="Enter address"
              onChange={handleAddressChange}
              value={checkAddress}
            />
            <Button
              className="my-4"
              colorScheme="green"
              isDisabled={!isWalletConnected}
              onClick={() => checkAddressVote()}
            >
              Check Address Vote
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
