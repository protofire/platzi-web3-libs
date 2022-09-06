import React from "react";
import { votes, votes_container } from "./index.module.scss";

export default function Votes({ yes, no }) {
  return (
    <div className={votes}>
      <h3>Votos Actuales</h3>
      <div className={votes_container}>
        <p>{`Por el si ${yes || "-"}`}</p>
        <p>{`Por el no ${no || "-"}`}</p>
      </div>
    </div>
  );
}
