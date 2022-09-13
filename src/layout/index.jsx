import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { connector } from "@connectors/index";
import { useCallback, useContext, useEffect, useState } from "react";
import useTruncatedAddress from "@hooks/useTruncatedAddress";
import { AppContext } from "@context/AppContext";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const { state } = useContext(AppContext);
  const { active, activate, deactivate, account, error, library } =
    useWeb3React();

  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  const getBalance = useCallback(async () => {
    let toSet = 0;
    if (state.library === "web3") {
      toSet = await library.web3.eth.getBalance(account);
    } else {
      toSet = await library.ethers.getBalance(account);
    }

    setBalance((toSet / 1e18).toFixed(2));
  }, [library?.web3.eth, account]);

  useEffect(() => {
    if (active) getBalance();
  }, [active, getBalance]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  const truncatedAddress = useTruncatedAddress(account);

  return (
    <div>
      {active ? (
          <button 
            className="text-sm py-1 tracking-wider inline-block px-2 mt-5" 
            onClick={disconnect}
          >
            <p>{truncatedAddress}</p>
            <p>{balance}</p>
          </button>
      ) : (
        <button
          className=""
          onClick={connect}
          disabled={isUnsupportedChain}
        >
          {isUnsupportedChain ? "Change to Goerli Network" : "Connect Metamask wallet"}
        </button>
      )}
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <section className="text-center px-4 py-16 mx-auto max-w-screen-lg sm:px-6 lg:px-8">
      <h1 className="text-4xl mb-5 leading-12 lg:w-1/2 md:w-2/3 lg:px-4 m-auto mb-16">
        Do you prefer decentralization over scalability?
      </h1>
      <p className="text-sm lg:pt-0 md:pt-5 lg:w-1/2 md:w-2/3 lg:px-4 m-auto mb-16">
        This poll is made up for blockchain specialists that help decentralized protocols and developer platforms to accelerate growth of their ecosystems.
      </p>
      <Wallet />
      <main className="py-4">
        {children}
      </main>
    </section>
  );
};

export default Layout;
