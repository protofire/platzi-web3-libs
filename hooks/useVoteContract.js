import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { abi, address } from "../config/contract/data.json";

export const useVoteContract = (library) => {
  const [contract, setContract] = useState();
  const [votes, setVotes] = useState({
    yes: "-",
    no: "-",
  });
  const [loading, setLoading] = useState(false);

  const web3Library = useCallback(() => {
    if (typeof window !== "undefined") {
      import("web3").then((Web3) => {
        const web3 = new Web3.default(Web3.default.givenProvider);
        const cont = new web3.eth.Contract(abi, address);
        setContract(cont);
      });
    }
  }, []);

  const ethersLibrary = useCallback(() => {
    if (typeof window !== "undefined") {
      import("ethers").then((ethers) => {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        const cont = new ethers.Contract(address, abi, provider);
        setContract(cont);
      });
    }
  }, []);

  useEffect(() => {
    if (library === "web3") web3Library();
    if (library === "ethers") ethersLibrary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library]);

  useEffect(() => {
    const votos = async () => {
      setLoading(true);
      let no, yes;
      if (contract) {
        if (contract.methods) {
          no = Number(await contract.methods.votesForNo().call());
          yes = Number(await contract.methods.votesForYes().call());
        } else {
          no = Number(await contract.votesForNo());
          yes = Number(await contract.votesForYes());
        }
      }
      setVotes({ yes, no });
      setLoading(false);
    };
    votos();
  }, [contract]);

  return {
    contract,
    votes,
  };
};
