import React, { useEffect, useState } from "react";
import "./App.css";

import NavBar from "./components/organisms/navbar/NavBar";
import { Button, Input } from "@chakra-ui/react";
import { mainStore } from "../data/stores/main_store";
import { VotingService } from "../domain/services/voting_service";
import { Card } from "./components/organisms/card/Card";
import { CheckVote } from "./components/organisms/check_vote/CheckVote";

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
          <CheckVote></CheckVote>
        </section>
      </div>
    </div>
  );
}

export default App;
