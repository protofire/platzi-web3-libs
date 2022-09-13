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
      <main className="py-1">
        <div>
          <p>Web3</p>
          <ReactSwitch
            checked={state.library === "ethers"}
            onChange={changeLibrary}
          />
          <p>EtherJS</p>
        </div>
        {active ? (
          <>
            <div className="grid gap-4 grid-cols-2">
              <div className="grid justify-items-center h-full p-12">
                <h5>Vote for yes</h5>
                <p>{positiveVotes}</p>
                <p>{`${percentYes}%`}</p>
                <button
                  className="w-32"
                  isLoading={voting}
                  disabled={isVoted}
                  onClick={() => handleVote(2)}
                >
                  Yes
                </button>
              </div>
              <div className="grid justify-items-center h-full p-12">
                <h5>Vote for no</h5>
                <p><b>{negativesVotes}</b></p>
                <p>{`${percentNo}%`}</p>
                <button
                  className="w-32"
                  isLoading={voting}
                  disabled={isVoted}
                  onClick={() => handleVote(1)}
                >
                  No
                </button>
              </div>
          </div>
            {isVoted ? (
              <p>You are emitted vote for this proposal</p>
            ) : (
              "You can vote for the proposal"
            )}
          </>
        ) : (
          <div>Wallet desconectado</div>
        )}
      </main>
    </section>
  );
};

export default Home;