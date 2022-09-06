import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import LibraryOptions from "../components/LibraryOptions";
import VoteContract from "../containers/VoteContract";
import { home } from "./index.module.scss";

export default function Home() {
  const [library, setLibrary] = useState("ethers");
  return (
    <div className={home}>
      <LibraryOptions active={library} setLibrary={setLibrary} />
      <VoteContract library={library} />
    </div>
  );
}
