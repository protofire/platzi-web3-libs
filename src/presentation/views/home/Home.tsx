import React, { useEffect } from "react";
import { mainStore } from "../../../data/stores/main_store";
import { VotingService } from "../../../domain/services/voting_service";
import { Card } from "../../components/molecules/card/Card";
import { ChallengerBanner } from "../../components/organisms/challenger_banner/ChallengeBanner";
import { CheckVote } from "../../components/organisms/check_vote/CheckVote";
import NavBar from "../../components/organisms/navbar/NavBar";

function Home() {
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
    <>
      <div className="normalize row col-12">
        <NavBar></NavBar>
        <section className="normalize col col-12 col-lg-6 px-5 mt-4">
          <ChallengerBanner></ChallengerBanner>
        </section>
        <section className="normalize col col-12 col-lg-6  mt-4">
          <div className="normalize row col-12 justify-content-center">
            <h2 className="fw-bold text-center">Please use Goerli Network</h2>
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
    </>
  );
}

export default Home;
