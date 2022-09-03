import { Tooltip } from "@nextui-org/react";

const ConnectButton = ({
  walletAccount,
  network,
  connectWallet,
  isAllowedVote,
}) => {
  const switchNetwork = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }], // Goerli
        });
      } catch (error) {
        alert("Please add the Goerli Testnet.");
      }
    }
  };

  return (
    <>
      {walletAccount.connected === false ? (
        <Tooltip
          content="You've to be connected in order to vote."
          color="invert"
          contentColor="secondary"
          placement="bottomEnd"
          css={{ width: "276px" }}
          hideArrow
        >
          <button onClick={connectWallet} className="button py-2 px-8 ">
            Connect Wallet
          </button>
        </Tooltip>
      ) : (
        <div className="selected shadow-2xl text-white text-xl rounded-lg p-4">
          {network.chainId == 5 && (
            <p>
              <label className="text-purple-500 font-bold">Balance:</label>{" "}
              {walletAccount.balance}
            </p>
          )}

          <p>
            <label className="text-purple-500 font-bold">Address:</label>{" "}
            {walletAccount.address}
          </p>

          {network.chainId == 5 ? (
            <p className="mt-3 text-center">
              {isAllowedVote ? "You can vote!" : "You've already voted"}
            </p>
          ) : (
            <div className="flex flex-row justify-center items-center mt-2 gap-3">
              <p className="text-center">
                You are in the wrong network, use Goerli instead:
              </p>
              <button className="button p-1 " onClick={switchNetwork}>
                Switch Network
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ConnectButton;
