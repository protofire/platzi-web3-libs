import React, { useEffect, useState } from "react";
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
  const {
    selectedLibrary,
    isWalletConnected,
    alreadyVoted,
    getVotes,
    setAlreadyVoted,
  } = mainStore();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  async function makeVote(vote: string) {
    const service = new VotingService(selectedLibrary.gateway);
    try {
      setIsLoading(true);
      await service.makeVote(vote);
      await getVotes(service);
      setIsLoading(false);
      setAlreadyVoted();
      toast({
        title: "Completed",
        description: "Your vote has been registered",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      setIsLoading(false);
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
        isLoading={isLoading}
        loadingText="Loading"
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
