import React from "react";
import { useVoteContract } from "../../hooks/useVoteContract";
import Votes from "../Votes";
import Vote from "../Vote";

export default function ContractCo({ library }) {
  const { contract, votes } = useVoteContract(library);
  return (
    <>
    <Votes yes={votes.yes} no={votes.no} />
    <Vote library={library} />
    </>
  );
}
