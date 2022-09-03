import { Web3ReactProvider } from '@web3-react/core'
import { AppProps } from 'next/app'

// Context
import GlobalContext from '../src/context/GlobalContext'
import { useGlobalContext } from '../src/context/GlobalContext/useContext'

// Libraries orquestation
import { getLibrary } from '../src/config/web3'

import '../styles/globals.scss'

function App({ Component, pageProps }: AppProps) {
  const ctx = useGlobalContext()
  return (
    <GlobalContext.Provider value={ctx}>
      <Web3ReactProvider getLibrary={getLibrary(ctx.currentLib)}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </GlobalContext.Provider>
  )
}

export default App
