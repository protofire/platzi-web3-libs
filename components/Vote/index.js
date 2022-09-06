import React from "react";
import { useMetamask } from "../../hooks/useMetamask";
import { useVoteContract } from "../../hooks/useVoteContract";
import Connect from "../Connect";
import { vote_for} from "./index.module.scss"

export default function Vote({ library }) {
  const { isActive, provider } = useMetamask();
  const { voteFor } = useVoteContract(library, provider);

  if (!isActive) return <Connect />;
  return (
    <div className={vote_for}>
      <button onClick={()=>{voteFor(2)}}>Votar por Si</button>
      <button onClick={()=>{voteFor(1)}}>Votar por No</button>
    </div>
  );
}
