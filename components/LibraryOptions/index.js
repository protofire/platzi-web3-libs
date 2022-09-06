import React from "react";
import { library, ethers } from "./index.module.scss";

export default function LibraryOptions({ active, setLibrary }) {
  return (
    <div className={`${library} ${active === "ethers" && ethers}`}>
      <button onClick={() => setLibrary("ethers")}>ETHERS</button>
      <button onClick={() => setLibrary("web3")}>WEB3</button>
    </div>
  );
}
