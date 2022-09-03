import React, { useContext, useState } from "react";
import Switch from "react-switch";
import { WalletContext } from "../context/context";

const Switcher = () => {
  const [checked, setChecked] = useState(true);
  const { library, setLibrary } = useContext(WalletContext);

  const handleChange = () => {
    setChecked(prevState => !prevState);

    if (library == "ethers") {
      setLibrary("web3");
    } else {
      setLibrary("ethers");
    }
  };

  return (
    <Switch
      onChange={handleChange}
      checked={checked}
      offColor={"#8e06bc"}
      offHandleColor={"#190a54"}
      uncheckedIcon={
        <img
          className="w-[2.5rem] h-[2.5rem] object-contain relative top-[-1px] left-[11px]"
          src="ethers.png"
        />
      }
      onColor={"#ff7d12"}
      checkedIcon={
        <img
          className="w-[1.8rem] h-[1.6rem] object-contain relative top-[7px] left-[11px]"
          src="web3js.png"
        />
      }
      height={38}
      width={124}
      boxShadow={"0px 0px 1px rgba(1,1,1,1)"}
      activeBoxShadow={""}
      className={`switcher ${checked ? "switcherActive" : ""}`}
    />
  );
};

export default Switcher;
