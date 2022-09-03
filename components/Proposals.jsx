import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import React from "react";
import { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { WalletContext } from "../context/context";
import { contract } from "../pages/_app";

const proposalName = "EIP-2236690448";

// @dev Web3.js doesn't able me to desectructure inside web3.eth.Contract()
const [contractAddress, abi] = contract;

const Proposals = () => {
  const [waitingConfirmation, setWaitingConfirmation] = useState(false);
  const [waitingTx, setWaitingTx] = useState(false);
  const [proposal, setProposal] = useState({ yes: 0, no: 0 });

  const { wallet, library } = useContext(WalletContext);

  const handleVote = async value => {
    setWaitingConfirmation(true);
    if (window.ethereum) {
      if (library == "ethers") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(...contract, signer);
        const options = { value: ethers.utils.parseEther("0.01") };
        const voteTx = await contractInstance.vote(value, options).catch(error => {
          console.log(error);
        });
        setWaitingConfirmation(false);
        // User can reject transaction or something else can fail.
        if (voteTx) {
          setWaitingTx(true);
          try {
            const voteTxReceipt = await voteTx.wait();
            console.log("Transaction Mined!");
          } catch (error) {
            console.log("Transaction Failed.");
            console.log(error);
          }
        } else {
          console.log("Something went wrong. Looks like the user Rejected the tx.");
        }
        setWaitingTx(false);
      } else if (library == "web3") {
        //  @dev Note for devs: I still can't find out how to differentiate in Web3.js
        //  between confirmed transaction and mined transaction, as I do in Ethers.js.
        //  If you are reading this and know if this is possible, please message me :)
        const web3 = new Web3(window.ethereum);
        const contractInstance = new web3.eth.Contract(abi, contractAddress);
        const options = { from: wallet.address, value: web3.utils.toWei("0.01", "ether") };
        try {
          const receipt = await contractInstance.methods
            .vote(value)
            .send(options)
            .catch(error => console.log(error));
        } catch (error) {
          console.log("transaction failed, error");
        }
        setWaitingConfirmation(false);
      }
    }
  };

  const getProposal = async () => {
    if (window.ethereum) {
      if (library == "ethers") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractInstance = new ethers.Contract(...contract, provider);

        await Promise.all([
          contractInstance.proposalId(),
          contractInstance.votesForYes(),
          contractInstance.votesForNo(),
          contractInstance.VOTE_FEE(),
          // If user is not connected, don't call getVote().
          wallet.connected && contractInstance.getVote(wallet.address),
        ])
          .then(response => {
            setProposal({
              id: +response[0],
              yes: +response[1],
              no: +response[2],
              fee: +formatEther(response[3]),
              userVote: +response[4], // 1 or 2 if has voted. 0 if has not voted or is not connected.
            });
          })
          .catch(error => console.log(error));
      } else if (library == "web3") {
        const web3 = new Web3(window.ethereum);
        const contractInstance = new web3.eth.Contract(abi, contractAddress);
        await Promise.all([
          contractInstance.methods.proposalId().call(),
          contractInstance.methods.votesForYes().call(),
          contractInstance.methods.votesForNo().call(),
          contractInstance.methods.VOTE_FEE().call(),
          wallet.connected && contractInstance.methods.getVote(wallet.address).call(),
        ])
          .then(response => {
            console.log(response);
            setProposal({
              id: +response[0],
              yes: +response[1],
              no: +response[2],
              fee: +formatEther(response[3]),
              userVote: +response[4],
            });
          })
          .catch(error => console.log(error));
      }
    }
  };

  // Should be initially called even if the wallet it's not connected.
  // getVote will be called only if wallet is connected.
  // Should be re-called if voteCasted or accountChange are listened.
  useEffect(() => {
    getProposal();
  }, [wallet]);

  // event listeners set-up
  useEffect(() => {
    if (window.ethereum) {
      if (library == "ethers") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractInstance = new ethers.Contract(...contract, provider);
        contractInstance.on("VoteCasted", () => {
          getProposal();
        });

        return () => {
          contractInstance.removeAllListeners();
        };
      } else if (library == "web3") {
        const web3 = new Web3(window.ethereum);
        const contractInstance = new web3.eth.Contract(abi, contractAddress);
        contractInstance.events.VoteCasted(() => {
          getProposal();
        });

        return () => {
          web3.eth.clearSubscriptions();
        };
      }
    }
  }, []);

  return (
    <div className="bg-primaryDark w-11/12 h-[45vh] min-h-[380px] mx-auto flex p-20 px-24">
      <div className="flex flex-col items-center justify-center relative min-w-[470px]">
        <div className="text-blue-200/50 flex justify-between w-full">
          <span>Nº{proposal.id}</span>
          <span>Fee: {proposal.fee} ETH</span>
        </div>

        <p className="text-blue-100 text-3xl border-l-[1px] border-blue-100/10 py-6 mt-3 mb-6 px-16">
          Proposal: {proposalName}
        </p>

        <div className="flex w-full justify-around mb-4">
          <p className="text-gradient text-xl font-semibold">Votes for YES: {proposal.yes}</p>
          <p className="text-gradient text-xl font-semibold">Votes for NO: {proposal.no}</p>
        </div>
        <div className="flex gap-5 w-full">
          {waitingConfirmation || waitingTx ? (
            <button className="btn--proto--opacity !w-full" disabled={true}>
              <p className="text-gradient text-lg font-semibold">
                {waitingConfirmation ? "WAITING FOR CONFIRMATION.." : "WAITING TRANSACTION.."}
              </p>
            </button>
          ) : wallet.connected ? (
            proposal.userVote !== 0 ? (
              <button className="btn--proto--opacity !w-full" disabled={true}>
                <p className="text-gradient text-lg font-semibold">
                  YOU HAVE VOTED FOR {proposal.userVote == 1 ? "NO" : "YES"}
                </p>
              </button>
            ) : (
              <>
                <button
                  className="btn--proto--opacity !w-full"
                  onClick={() => {
                    handleVote(2);
                  }}
                >
                  <p className="text-gradient text-lg font-semibold">VOTE YES</p>
                </button>
                <button
                  className="btn--proto--opacity !w-full"
                  onClick={() => {
                    handleVote(1);
                  }}
                >
                  <p className="text-gradient text-lg font-semibold">VOTE NO</p>
                </button>
              </>
            )
          ) : (
            <button className="btn--proto--opacity !w-full" disabled={true}>
              <p className="text-gradient text-lg font-semibold">CONNECT WALLET TO VOTE</p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Proposals;
