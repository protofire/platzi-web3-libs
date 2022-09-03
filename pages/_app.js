import { ContextProvider } from "../context/context";
import "../styles/globals.css";
import abi from "../abi.json";
export const contract = ["0xAcFC7725527bA2Ee4311574F65e5d76F9F9585E9", abi];

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
