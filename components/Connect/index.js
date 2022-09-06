import React from "react";
import { useMetamask } from "../../hooks/useMetamask";
import { connect_container } from "./index.module.scss";

export default function Connect() {
  const { connect } = useMetamask();

  const handleClick = () => {
    connect();
  };

  return (
    <div className={connect_container}>
      <button onClick={handleClick}>Conecta con metamask</button>
    </div>
  );
}
