import { createContext, useEffect, useState } from 'react';

const useInitialState = () => {
  const [library, setState] = useState('web3');
  const changeLibrary = () => {
    if (library == 'web3') {
      setState('ethers');
    } else setState('web3');
  };
  return { library, changeLibrary };
};

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const initial = useInitialState();
  return <AppContext.Provider value={initial}>{children}</AppContext.Provider>;
};
