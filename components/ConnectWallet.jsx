import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/context";
import { getEthAddressShortcut } from "../helperFuncions";
import { ethers } from "ethers";
import Web3 from "web3";

const ConnectWallet = () => {
  const { wallet, setWallet, library, chain, setChain } = useContext(WalletContext);
  const [loadingWallet, setLoadingWallet] = useState(true);
  const [hoverLogout, setHoverLogout] = useState(false);

  const getBalance = async address => {
    if (library == "ethers") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      return +(+ethers.utils.formatEther(await provider.getBalance(address))).toFixed(4);
    } else if (library == "web3") {
      const web3 = new Web3(window.ethereum);
      return +(+Web3.utils.fromWei(await web3.eth.getBalance(address))).toFixed(4);
    }
  };

  const getNetwork = async () => {
    if (window.ethereum) {
      if (library == "ethers") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const actualChain = await provider.getNetwork();
        setChain({
          name: actualChain.name,
          id: actualChain.chainId,
          supported: actualChain.chainId === 5,
        });
      } else if (library == "web3") {
        const web3 = new Web3(window.ethereum);
        const actualChainId = await web3.eth.net.getId();
        const actualChainName = await web3.eth.net.getNetworkType();
        setChain({
          name: actualChainId,
          id: actualChainName,
          supported: actualChainId === 5,
        });
      }
    }
  };

  // request for eth_accounts permission. (first log-in)
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const balance = await getBalance(accounts[0]);
        setWallet({ address: accounts[0], connected: true, balance: balance });
      } catch (error) {
        console.log("Error at connectWallet", error);
      }
    }
  };

  const disconnectWallet = async () => {
    setWallet({ address: null, connected: false, balance: null });
  };

  const retrieveSession = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts[0]) {
        const balance = await getBalance(accounts[0]);
        setWallet({ address: accounts[0], connected: true, balance: balance });
      } else {
        setWallet({ address: null, connected: false, balance: null });
      }
      setLoadingWallet(false);
    }
  };

  // Retrieve address, if permission has been given before. (re-connect)
  useEffect(() => {
    retrieveSession();
    getNetwork();
  }, []);

  useEffect(() => {
    if (!chain.supported) {
      setWallet({ address: null, connected: false, balance: null });
    }
  }, [chain]);

  // Listen for account change and update the data.
  // Listen for chain changes and reload the page.
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        retrieveSession();
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      return () => {
        window.ethereum.removeAllListeners();
      };
    }
  }, []);

  const switchChain = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }], // Goerli
        });
      } catch (error) {
        // @dev Note: automatic networking addition can be implemented here.
        alert("Please manually add the Goerli Testnet.");
      }
    }
  };

  return (
    <>
      {loadingWallet ? (
        <button className="btn--proto--opacity" disabled={true}>
          loading...
        </button>
      ) : !chain.supported ? (
        <button className="btn--proto--opacity !text-white/50 !text-lg" onClick={switchChain}>
          UNSUPPORTED CHAIN
        </button>
      ) : wallet?.connected ? (
        <button
          className="btn--proto"
          onClick={disconnectWallet}
          onMouseEnter={() => {
            setHoverLogout(true);
          }}
          onMouseOut={() => {
            setHoverLogout(false);
          }}
        >
          {!hoverLogout ? (
            <span className="flex items-center">{getEthAddressShortcut(wallet?.address)}</span>
          ) : (
            "Sign out"
          )}
        </button>
      ) : (
        <button className="btn--proto" onClick={connectWallet}>
          Connect wallet
        </button>
      )}
    </>
  );
};

export default ConnectWallet;
