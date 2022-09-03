import { useState, useContext } from "react";
import { Radio, Loading, Tooltip } from "@nextui-org/react";
import { ethers } from "ethers";
import { LibraryContext } from "../context/libraryContext";
import Web3 from "web3";

const description = "This is the description of a binary proposal";

const Options = ({
  isAllowed,
  address,
  walletAddress,
  abi,
  successfulVote,
}) => {
  const [selectedValue, setSelectedValue] = useState(2);
  const [isPending, setIsPending] = useState(false);

  const { library } = useContext(LibraryContext);

  const voteHandler = async () => {
    if (window.ethereum) {
      setIsPending(true);

      if (library === "etherjs") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);
        const options = { value: ethers.utils.parseEther("0.01") };

        const voteTx = await contract
          .vote(selectedValue, options)
          .catch((error) => {
            setIsPending(false);
          });

        if (voteTx != undefined) {
          const voteTxReceipt = await voteTx.wait();

          if (voteTxReceipt.status === 1) {
            setIsPending(false);

            successfulVote();
          } else {
            setIsPending(false);
            console.log("Voting failed!");
          }
        } else {
          setIsPending(false);
        }
      } else if (library === "web3js") {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, address);
        const options = {
          from: walletAddress,
          value: web3.utils.toWei("0.01", "ether"),
        };

        const voteTx = await contract.methods
          .vote(selectedValue)
          .send(options)
          .catch((error) => {
            setIsPending(false);
          });

        if (voteTx.status === true) {
          setIsPending(false);

          successfulVote();
        } else {
          setIsPending(false);
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Radio.Group
        color="secondary"
        labelColor="secondary"
        label="Binary proposal"
        defaultValue={2}
        onChange={(value) => {
          setSelectedValue(value);
        }}
      >
        <div className="flex flex-col gap-3">
          <div
            className={`flex p-3 rounded-lg w-[500px] ${
              selectedValue === 2
                ? "selected"
                : "bg-[rgba(153,102,255,0.1)] border-[3px] border-[rgba(153,102,255,0.2)]"
            }`}
          >
            <Radio value={2} description={description} css={{ width: "100%" }}>
              <p className="font-bold">Positive</p>
            </Radio>
          </div>

          <div
            className={`flex p-3 rounded-lg w-[500px] ${
              selectedValue === 1
                ? "selected"
                : "bg-[rgba(153,102,255,0.1)] border-[3px] border-[rgba(153,102,255,0.1)]"
            }`}
          >
            <Radio value={1} description={description} css={{ width: "100%" }}>
              <p className="font-bold">Negative</p>
            </Radio>
          </div>
        </div>
      </Radio.Group>

      {isPending ? (
        <button
          disabled
          className="flex justify-center items-center w-auto rounded-lg shadow-lg min-h-[39px] buttonGradient"
        >
          <Loading
            size={"lg"}
            color="secondary"
            type="points"
            gradientBackground={null}
          />
        </button>
      ) : (
        <button
          disabled={!isAllowed}
          onClick={voteHandler}
          className="flex items-center justify-center w-auto font-bold rounded-lg shadow-lg cursor-pointer min-h-[39px] buttonGradient text-white hover:shadow-lg hover:-translate-y-2 transition-all duration-150"
        >
          {isAllowed ? (
            <Tooltip
              content="Vote cost 0.01 ETH"
              color="invert"
              contentColor="secondary"
              placement="bottom"
              hideArrow
            >
              <p className="w-[30rem]">VOTE</p>
            </Tooltip>
          ) : (
            "Not allowed to vote"
          )}
        </button>
      )}
    </div>
  );
};

export default Options;
