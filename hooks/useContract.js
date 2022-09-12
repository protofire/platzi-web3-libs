import { useContext, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { contractArtifact } from '../config/contract';
import { AppContext } from '../components/context/appContext';

export const useContract = () => {
  const { active, library, chainId } = useWeb3React();
  const context = useContext(AppContext);
  const contract = useMemo(() => {
    if (active) return library[context.library];
  }, [active, chainId, library, context.library]);

  return contract;
};
