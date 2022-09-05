import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "ethers";
import { useVoteContract } from "../../hooks/useVoteContract";

export default function ContractCo({ library }) {
  const { contract, votes } = useVoteContract(library);
  return (
    <>
      <p>{`votos por el si ${votes.yes}`}</p>
      <p>{`votos por el no ${votes.no}`}</p>
    </>
  );
}
