import { createContext, useState } from "react";

const initialState = {
  library: "web3",
  yes: 0,
  no: 0,
  vote: undefined,
};

export const AppContext = createContext();

export const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const changeLibrary = () => {
    if (state.library === "web3") {
      setState({
        ...state,
        library: "ether",
      });
    } else {
      setState({
        ...state,
        library: "web3",
      });
    }
  };

  return { state, changeLibrary };
};

const AppContextProvider = ({ children }) => {
  const initial = useInitialState();
  return <AppContext.Provider value={initial}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
