import React from "react";
import { useToast, Button } from "@chakra-ui/react";
import { mainStore } from "../../../../data/stores/main_store";
import { VotingService } from "../../../../domain/services/voting_service";
import "./Card.css";

export function Card(props: {
  votes: string;
  voteFor: string;
  name: string;
  buttonName: string;
}) {
  const { selectedLibrary, isWalletConnected, alreadyVoted } = mainStore();
  const toast = useToast();

  const service = new VotingService(selectedLibrary.gateway);

  async function makeVote(vote: string) {
    try {
      await service.makeVote(vote);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
    <div className="col col-10 col-lg-3 text-center mt-5 card-container mx-5">
      <h2 className="mt-3 card-title">{props.name}</h2>
      <h2 className="mt-3 card-subtitle">{props.votes}</h2>
      <Button
        className="my-3"
        colorScheme="blue"
        isDisabled={!isWalletConnected || alreadyVoted}
        onClick={() => makeVote(props.voteFor)}
      >
        {props.buttonName}
      </Button>
    </div>
  );
}
