import { createContext, useEffect, useState } from "react";

const initialState = {
  library: "web3",
};

export const AppContext = createContext();

export const useInitialState = () => {
  const [state, setState] = useState(initialState);
  useEffect(() => {
    setState({
      ...state,
      library: localStorage.getItem("web3-library") || "web3",
    });
  }, [state.library]);

  const changeLibrary = () => {
    if (state.library === "web3") {
      setState({
        ...state,
        library: "ether",
      });
      localStorage.setItem("web3-library", "ethers");
    } else {
      setState({
        ...state,
        library: "web3",
      });
      localStorage.setItem("web3-library", "web3");
    }
  };

  return { state, changeLibrary };
};

const AppContextProvider = ({ children }) => {
  const initial = useInitialState();
  return <AppContext.Provider value={initial}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
