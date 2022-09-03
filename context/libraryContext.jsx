import React from "react";
import { createContext, useState } from "react";

export const LibraryContext = createContext();

export const LibraryContextProvider = ({ children }) => {
  const [library, setLibrary] = useState("etherjs");

  return (
    <LibraryContext.Provider value={{ library, setLibrary }}>
      {children}
    </LibraryContext.Provider>
  );
};
