import { useState, useEffect, useContext } from "react";

import Head from "next/head";
import Chart from "../components/Chart";
import Options from "../components/Options";
import Confetti from "../components/Confetti";
import Switcher from "../components/Switcher";
import ConnectButton from "../components/ConnectButton";
import { LibraryContext } from "../context/libraryContext";

import Web3 from "web3";
import { ethers } from "ethers";
import abi from "../abi.json";

export default function Home() {
  const [firstRender, setFirstRender] = useState(true);

  const [votes, setVotes] = useState({ voteYes: 0, voteNo: 0 });
  const [voteFee, setVoteFee] = useState(0);
  const [isAllowedVote, setIsAllowedVote] = useState(false);
  const [successfulVote, setSuccessfulVote] = useState(false);

  const [network, setNetwork] = useState({ name: "", chainId: null });

  const [walletAccount, setWalletAccount] = useState({
    connected: false,
    address: "",
    balance: 0,
  });

  const { library } = useContext(LibraryContext);

  const addressContract = "0xacfc7725527ba2ee4311574f65e5d76f9f9585e9";

  let metamask = null;
  let browserProvider;
  let contract;
  let bigNumber;
  let formatEther;

  if (!firstRender) {
    metamask = window.ethereum;

    if (metamask != null) {
      if (library === "etherjs") {
        browserProvider = new ethers.providers.Web3Provider(metamask, "any");
        contract = new ethers.Contract(addressContract, abi, browserProvider);
        bigNumber = ethers.BigNumber.from;
        formatEther = ethers.utils.formatEther;
      } else if (library === "web3js") {
        browserProvider = new Web3(metamask);
        contract = new browserProvider.eth.Contract(abi, addressContract);
        bigNumber = browserProvider.utils.toBN;
        formatEther = browserProvider.utils.fromWei;
      }
    }
  }

  /*
    @dev - useEffect to setup listener for network and account change, and to check if user is connected to the right network
  */

  useEffect(() => {
    if (!firstRender && metamask != null) {
      getNetwork();
      checkConnection();

      metamask.on("chainChanged", () => {
        // @dev - To prevent issues and critical bugs, the best practice is to reload the page when the user changes the network
        window.location.reload();
      });

      metamask.on("accountsChanged", () => {
        // @dev - if user changes account, we need to reset the address and the balance, also check if user is allowed to vote

        checkConnection();
        voteCheck();
      });

      return () => {
        metamask.removeAllListeners();
      };
    }

    if (firstRender) {
      setFirstRender(false);
    }
  }, [firstRender]);

  useEffect(() => {
    const suscribeEvent = () => {
      if (library === "etherjs") {
        contract.on("VoteCasted", (proposalId, from, vote) => {
          voteCheck();
          getVotes();
        });
      } else if (library === "web3js") {
        contract.events.VoteCasted((error, event) => {
          voteCheck();
          getVotes();
        });
      }
    };

    if (!firstRender && metamask != null) {
      if (network.name == "goerli" && network.chainId == 5) {
        getVotes();
        suscribeEvent();
      }

      return () => {
        if (library === "etherjs") {
          contract.removeAllListeners();
        } else if (library === "web3js") {
          browserProvider.eth.clearSubscriptions();
        }
      };
    }
  }, [network, library]);

  useEffect(() => {
    if (!firstRender) {
      voteCheck();
    }
  }, [walletAccount]);

  const connectWallet = async () => {
    if (metamask) {
      try {
        const account = await metamask.request({
          method: "eth_requestAccounts",
        });

        if (network.name == "goerli" && network.chainId == 5) {
          getBalance(account[0]).then((balance) => {
            setWalletAccount({
              connected: true,
              address: account[0],
              balance,
            });
          });
        } else {
          setWalletAccount({
            connected: true,
            address: account[0],
            balance: 0,
          });
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  const checkConnection = async () => {
    if (metamask) {
      const account = await metamask.request({
        method: "eth_accounts",
      });

      if (account[0] != undefined) {
        getBalance(account[0]).then((balance) => {
          setWalletAccount({
            connected: true,
            address: account[0],
            balance: balance,
          });
        });
      } else {
        setWalletAccount({
          connected: false,
          address: "",
          balance: 0,
        });
      }
    }
  };

  const voteCheck = () => {
    if (
      walletAccount.connected === true &&
      walletAccount.balance >= voteFee &&
      network.chainId == 5 &&
      network.name == "goerli"
    ) {
      if (library === "etherjs") {
        contract.getVote(walletAccount.address).then((votes) => {
          const value = bigNumber(votes).toNumber();

          if (value === 0) {
            setIsAllowedVote(true);
          } else {
            setIsAllowedVote(false);
          }
        });
      } else if (library === "web3js") {
        contract.methods
          .getVote(walletAccount.address)
          .call({ from: walletAccount.address })
          .then((votes) => {
            const value = bigNumber(votes).toNumber();

            if (value === 0) {
              setIsAllowedVote(true);
            } else {
              setIsAllowedVote(false);
            }
          });
      }
    } else {
      setIsAllowedVote(false);
    }
  };

  const getVotes = () => {
    if (metamask) {
      if (library === "etherjs") {
        Promise.all([
          contract.votesForYes(),
          contract.votesForNo(),
          contract.VOTE_FEE(),
        ]).then((response) => {
          const voteYes = bigNumber(response[0]).toNumber();
          const voteNo = bigNumber(response[1]).toNumber();
          const voteFee = parseFloat(formatEther(response[2]));

          setVotes({ voteYes, voteNo });
          setVoteFee(voteFee);
        });
      } else if (library === "web3js") {
        Promise.all([
          contract.methods.votesForYes().call({ from: walletAccount.address }),
          contract.methods.votesForNo().call({ from: walletAccount.address }),
          contract.methods.VOTE_FEE().call({ from: walletAccount.address }),
        ]).then((response) => {
          const voteYes = bigNumber(response[0]).toNumber();
          const voteNo = bigNumber(response[1]).toNumber();
          const voteFee = parseFloat(formatEther(response[2], "ether"));

          setVotes({ voteYes, voteNo });
          setVoteFee(voteFee);
        });
      }
    }
  };

  const getBalance = async (address) => {
    if (metamask) {
      if (library === "etherjs") {
        const balance = formatEther(await browserProvider.getBalance(address));

        return parseFloat(balance);
      } else if (library === "web3js") {
        const balance = await browserProvider.eth.getBalance(address);

        return parseFloat(formatEther(balance, "ether"));
      }
    }
  };

  const getNetwork = async () => {
    if (library === "etherjs") {
      const network = await browserProvider.getNetwork();

      setNetwork({ name: network.name, chainId: network.chainId });
    } else if (library === "web3js") {
      const network = await browserProvider.eth.net.getNetworkType();
      const networkId = await browserProvider.eth.net.getId();
      setNetwork({ name: network, chainId: networkId });
    }
  };

  const successfulVoteTrigger = () => {
    setSuccessfulVote(true);

    setTimeout(() => {
      setSuccessfulVote(false);
    }, 60000);
  };

  return (
    !firstRender && (
      <div className="min-h-screen h-screen backgroundGradient">
        <Head>
          <title>Vote dApp</title>
          <meta name="description" content="Protofire dApp challenge" />
          <link rel="icon" href="/favicon.png" />
        </Head>

        {successfulVote && <Confetti />}

        <main className="flex flex-col h-full justify-between">
          <div className="p-10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-5">
                <h1 className="text-white text-3xl textShadow">
                  VOTING SYSTEM 🦄💫
                </h1>

                <Switcher />
              </div>

              <ConnectButton
                network={network}
                walletAccount={walletAccount}
                connectWallet={connectWallet}
                isAllowedVote={isAllowedVote}
              />
            </div>

            <div className="flex flex-row h-full justify-center items-center gap-10">
              <div>
                <Options
                  successfulVote={successfulVoteTrigger}
                  isAllowed={isAllowedVote}
                  walletAddress={walletAccount.address}
                  address={addressContract}
                  abi={abi}
                />
              </div>

              <div>
                <Chart
                  options={[
                    { name: "Positive", votes: votes.voteYes },
                    { name: "Negative", votes: votes.voteNo },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center items-center border-t-[0.1px] border-gray-500 py-2 gap-3">
            <p className="text-center text-white">
              This project was made by Ignacio Presas for #EthDevProgram
            </p>
            <div className="flex flex-row gap-2 items-center justify-center">
              <a
                href="https://github.com/nv-cho/binary-proposal-voting-system"
                target="_blank"
                rel="noreferrer"
              >
                <img className="w-8" src="icons8-github.svg" />
              </a>
              <a
                href="https://www.linkedin.com/in/igpresas/"
                target="_blank"
                rel="noreferrer"
              >
                <img className="w-8" src="icons8-linkedin.svg" />
              </a>
              <a
                href="https://cv-web3.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                <img className="w-8" src="icons8-currículum-64.png" />
              </a>
              <a
                href="https://twitter.com/nv_cho"
                target="_blank"
                rel="noreferrer"
              >
                <img className="w-8" src="icons8-twitter.svg" />
              </a>
            </div>
          </div>
        </main>
      </div>
    )
  );
}
