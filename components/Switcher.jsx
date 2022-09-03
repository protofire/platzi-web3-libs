import { useState, useContext } from "react";
import { LibraryContext } from "../context/libraryContext";
import Switch from "react-switch";

const Switcher = () => {
  const { library, setLibrary } = useContext(LibraryContext);

  const switchHandler = () => {
    setLibrary(library === "web3js" ? "etherjs" : "web3js");
  };

  return (
    <div className="flex flex-row gap-4">
      <Switch
        onChange={switchHandler}
        onColor="#151857"
        offColor="#cc8400"
        uncheckedIcon={
          <img
            className="w-[1rem] h-[1rem] object-contain relative top-[5px] left-[6px]"
            src="web3.png"
            alt="web3icon"
          />
        }
        checkedIcon={
          <img
            className="w-[1rem] h-[1rem] object-contain relative top-[5px] left-[9px]"
            src="ethersjs.png"
            alt="ethersicon"
          />
        }
        checked={library == "etherjs"}
      />
      <p className="text-white text-xl textShadow">
        {library == "etherjs" ? "Using Ether.js" : "Using Web3.js"}
      </p>
    </div>
  );
};

export default Switcher;
