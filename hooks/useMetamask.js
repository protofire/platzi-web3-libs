import { useEffect, useState } from 'react';
import {hooks, metaMask} from '../connectors/metamask';

export const useMetamask = () =>{
  const { useIsActive, useProvider } = hooks;
  const isActive = useIsActive();
  const provider = useProvider();

  const connect = async () =>{
    await metaMask.activate(5)
  }

  return {
    isActive,
    connect,
    provider
  }
}