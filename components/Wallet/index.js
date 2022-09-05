import React, { useEffect, useState, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { connector } from '../../config/web3Config';
import { Button, useToast } from '@chakra-ui/react';
import { VscDebugDisconnect } from 'react-icons/vsc';
import { TbExchange } from 'react-icons/tb';
import { AnimationButtonLayout } from '../Layouts/animationButtonLayout';
import { CloseIcon } from '@chakra-ui/icons';
const targetNetworkId = '0x5';

const checkNetwork = async () => {
  if (window.ethereum) {
    const currentChainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    if (currentChainId == targetNetworkId) return true;
    return false;
  }
};

const useTruncatedAddress = (account) => {
  const truncated = useMemo(
    () => `${account?.slice(0, 6)}...${account?.substr(-4)}`,
    [account]
  );
  return truncated;
};

export const Wallet = () => {
  const { active, activate, account, error, deactivate, library } =
    useWeb3React();
  const [isCorrectChain, setIsCorrectChain] = useState();
  const [disableWallet, setDisableWallet] = useState();
  const [currentChain, setCurrentChain] = useState();
  const truncatedAddress = useTruncatedAddress(account);
  const [metamask, setMetamask] = useState();
  const toast = useToast();

  useEffect(() => {
    if (!window.ethereum) {
      toast({
        title: 'You need to install metamask ',
        description: 'No window.ethereum found',
        status: 'error',
        duration: 10000,
      });
      setDisableWallet(true);
    } else setMetamask(window.ethereum);
  }, []);

  useEffect(() => {
    const check = async () => {
      const correctChain = await checkNetwork();
      setIsCorrectChain(correctChain);
    };
    check();
  }, [currentChain]);

  useEffect(() => {
    if (metamask) {
      metamask.on('chainChanged', (e) => {
        setCurrentChain(e);
        deactivate();
      });
    }
  }, [metamask]);

  const switchNetwork = async () => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: targetNetworkId }],
    });
    setIsCorrectChain(true);
  };

  const connect = () => {
    activate(connector);
  };

  const disconnect = () => {
    deactivate(connector);
  };

  return (
    <>
      {active ? (
        <AnimationButtonLayout>
          <Button
            rightIcon={<CloseIcon />}
            colorScheme="green"
            variant="outline"
            onClick={disconnect}
          >
            {truncatedAddress}
          </Button>
        </AnimationButtonLayout>
      ) : (
        <AnimationButtonLayout>
          <Button
            rightIcon={isCorrectChain ? <VscDebugDisconnect /> : <TbExchange />}
            colorScheme="blue"
            variant="outline"
            onClick={isCorrectChain ? connect : switchNetwork}
            disabled={disableWallet}
          >
            {isCorrectChain ? 'Connect wallet' : 'Change to goerli'}
          </Button>
        </AnimationButtonLayout>
      )}
    </>
  );
};
