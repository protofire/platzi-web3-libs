import React, { useEffect, useState } from "react";
import NavBar from "./components/organisms/navbar/NavBar";
import { mainStore } from "../data/stores/main_store";
import { VotingService } from "../domain/services/voting_service";
import { Card } from "./components/molecules/card/Card";
import { CheckVote } from "./components/organisms/check_vote/CheckVote";
import { Footer } from "./components/organisms/footer/Footer";
import { ChallengerBanner } from "./components/organisms/challenger_banner/ChallengeBanner";
import "./App.css";


function App() {
  const {
    selectedLibrary,
    isWalletConnected,
    alreadyVoted,
    positiveVotes,
    negativeVotes,
    getVotes,
  } = mainStore();

  useEffect(() => {
    const requestVotes = async () => {
      const service = new VotingService(selectedLibrary.gateway);
      await getVotes(service);
    };
    requestVotes();
  }, [isWalletConnected]);

  return (
    <div className="container-fluid normalize app-container">
      <div className="normalize row col-12 app-content">
        <NavBar></NavBar>
        <section className="normalize col col-12 col-lg-6 px-5 mt-4">
          <ChallengerBanner></ChallengerBanner>
        </section>
        <section className="normalize col col-12 col-lg-6  mt-4">
          <div className="normalize row col-12 justify-content-center">
            <Card
              votes={positiveVotes}
              voteFor={"2"}
              name="YES"
              buttonName="Vote YES"
            ></Card>
            <Card
              votes={negativeVotes}
              voteFor={"1"}
              name="NO"
              buttonName="Vote NO"
            ></Card>
            <div className="col col-12">
              {alreadyVoted ? (
                <h2 className="text-center fw-bold mt-5">
                  Congratulations! You have already voted for this cause
                </h2>
              ) : null}
            </div>
          </div>
          <div className="normalize row col-12 justify-content-center mt-3 mb-5 text-center">
            <CheckVote></CheckVote>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
