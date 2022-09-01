import React from "react";
import { Button } from "@chakra-ui/react";
import { mainStore } from "../../../../data/stores/main_store";
import { VotingService } from "../../../../domain/services/voting_service";
import "./Card.css";

export function Card(props: {
  votes: string;
  voteFor: string;
  name: string;
  buttonName: string;
}) {
  const { selectedLibrary, isWalletConnected } = mainStore();

  const service = new VotingService(selectedLibrary.gateway);

  async function makeVote(vote: string) {
    await service.makeVote(vote);
  }
  return (
    <div className="col col-5 text-center mt-5 card-container mx-5">
      <h2 className="mt-5 card-title">{props.name}</h2>
      <h2 className="mt-5 card-subtitle">{props.votes}</h2>
      <Button
        className="my-5"
        colorScheme="blue"
        isDisabled={!isWalletConnected}
        onClick={() => makeVote(props.voteFor)}
      >
        {props.buttonName}
      </Button>
    </div>
  );
}
