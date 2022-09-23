import { useToast } from "@chakra-ui/react";
import { AppContext } from "../context/AppContext";
import EthersMethod from "../utils/ether";
import Web3Method from "../utils/web3";
import { useWeb3React } from "@web3-react/core";
import { useContext, useMemo, useState } from "react";
import { usePercent } from "./useTruncatedAddress";

const useProposalStatus = () => {
  const { state } = useContext(AppContext);
  const { library, chainId, active } = useWeb3React();
  const [positiveVotes, setPositiveVotes] = useState(0);
  const [negativesVotes, setNegativeVotes] = useState(0);
  const [voting, setVoting] = useState(false);
  const [isVoted, setIsVoted] = useState(false);

  const getData = async () => {
    if (active) {
      let web3;
      if (state.library === "web3") {
        web3 = new Web3Method(library?.web3.currentProvider, chainId);
      } else {
        web3 = new EthersMethod(chainId, library?.ethers);
      }

      const [votesForYes, votesForNo, voted] = await Promise.all([
        web3.votesForYes(),
        web3.votesForNo(),
        web3.getVote(),
      ]);
      setNegativeVotes(votesForNo);
      setPositiveVotes(votesForYes);
      setIsVoted(voted !== undefined);
    }
  };

  useMemo(() => {
    getData();
  }, [library, chainId, active]);

  const toast = useToast();

  const handleVote = async (vote) => {
    setVoting(true);
    let web3;
    if (state.library === "web3") {
      web3 = new Web3Method(library?.web3.currentProvider, chainId);
    } else {
      web3 = new EthersMethod(chainId, library?.ethers);
    }
    try {
      const txHash = await web3.vote(vote);
      toast({
        title: "Vote emitted",
        description: txHash,
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error has ocurred",
        status: "error",
      });
    }
    getData();
    setVoting(false);
  };

  const percentYes = usePercent(positiveVotes, positiveVotes + negativesVotes);
  const percentNo = usePercent(negativesVotes, positiveVotes + negativesVotes);

  return {
    positiveVotes,
    percentYes,
    percentNo,
    negativesVotes,
    voting,
    isVoted,
    handleVote,
  };
};

export default useProposalStatus;
