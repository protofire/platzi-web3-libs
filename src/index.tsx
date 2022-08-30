import React from 'react'
import ReactDOM from 'react-dom/client'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Web3 from 'web3'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { MultiLibraries } from './types'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>
)

function getLibrary(provider: any): MultiLibraries {
  const ethersProvider = new Web3Provider(provider)
  const web3Provider = new Web3(provider)
  ethersProvider.pollingInterval = 12000
  return { ethers: ethersProvider, web3: web3Provider }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
