import "../styles/globals.css";

import { NextUIProvider } from "@nextui-org/react";
import { LibraryContextProvider } from "../context/libraryContext";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider disableBaseline>
      <LibraryContextProvider>
        <Component {...pageProps} />
      </LibraryContextProvider>
    </NextUIProvider>
  );
}

export default MyApp;
