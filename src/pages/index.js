import { useWeb3React } from "@web3-react/core";
import { AppContext } from "@context/AppContext";
import ReactSwitch from 'react-switch';
import { useContext } from "react";
import useProposalStatus from "@hooks/useProposalStatus";
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const { active } = useWeb3React();
  const { state, changeLibrary } = useContext(AppContext);
  const {
    positiveVotes,
    negativesVotes,
    voting,
    handleVote,
    isVoted,
    percentNo,
    percentYes,
  } = useProposalStatus();

  return (
    <section>
      <main className="py-2">
        <p className="mb-2 mt-4">You can choose between two methods to vote.</p>
        <div className="flex flex-row justify-center">
          <p>Web3</p>
          <ReactSwitch
            className="px-2"
            checked={state.library === "ethers"}
            onChange={changeLibrary}
            uncheckedIcon= {false}
            checkedIcon= {false}
          />
          <p>EtherJS</p>
        </div>
        {active ? (
          <>
            <div className="justify-center grid gap-4 sm:grid-cols-2 p-12 mb-8">
              <div className="w-72 border-2 border-white rounded-xl grid justify-items-center p-6 sm:p-12">
                <h5>Votes for "YES"</h5>
                <p className="text-2xl">
                  {positiveVotes}
                </p>
                <p className="mb-2">
                  {`${percentYes}%`}
                </p>
                <button
                  className="w-32"
                  disabled={isVoted}
                  onClick={() => handleVote(2)}
                >
                  Yes
                </button>
              </div>
              <div className="w-72 border-2 border-white rounded-xl grid justify-items-center p-6 sm:p-12">
                <h5>Votes for "NO"</h5>
                <p className="text-2xl">
                  {negativesVotes}
                </p>
                <p className="mb-2">
                  {`${percentNo}%`}
                </p>
                <button
                  className="w-32"
                  disabled={isVoted}
                  onClick={() => handleVote(1)}
                >
                  No
                </button>
              </div>
          </div>
            {isVoted ? (
              <p>Thanks for voting!</p>
            ) : (
              "You are allowed to vote."
            )}
          </>
        ) : (
          <div className="mt-8">Your wallet is disconnected.</div>
        )}
      </main>
    </section>
  );
};

export default Home;