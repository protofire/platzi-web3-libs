import {
  Flex,
  Button,
  Tag,
  TagLabel,
  Badge,
  TagCloseButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { connector } from "../config/web3";
import { useCallback, useContext, useEffect, useState } from "react";
import useTruncatedAddress from "../hooks/useTruncatedAddress";
import { AppContext } from "../context/AppContext";

const WalletData = () => {
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
    <Flex alignItems={"center"}>
      {active ? (
        <Tag colorScheme="purple" borderRadius="full">
          <TagLabel>
            {truncatedAddress}
          </TagLabel>
          <Badge
            d={{
              base: "none",
              md: "block",
            }}
            variant="solid"
            fontSize="0.8rem"
            ml={1}
            colorScheme='purple'
          >
            ~{balance} Ξ
          </Badge>
          <TagCloseButton onClick={disconnect} />
        </Tag>
      ) : (
        <Button
          variant={"solid"}
          colorScheme={"green"}
          size={"sm"}
          leftIcon={<AddIcon />}
          onClick={connect}
          disabled={isUnsupportedChain}
        >
          {isUnsupportedChain ? "Net is not sopported" : "Conect your wallet"}
        </Button>
      )}
    </Flex>
  );
};

export default WalletData;
