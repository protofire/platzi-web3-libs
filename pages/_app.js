import "../styles/globals.css"
import "../styles/casilla_votacion.css"
//import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Web3 from 'web3'
//import { MultiLibraries } from './types'


function MyApp({ Component, pageProps }) {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </Web3ReactProvider>
        
    )
    {/*
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
        */}
}


function getLibrary(provider) {
    const ethersProvider = new Web3Provider(provider)
    const web3Provider = new Web3(provider)
    ethersProvider.pollingInterval = 12000
    return { ethers: ethersProvider, web3: web3Provider }
  }
  

export default MyApp
