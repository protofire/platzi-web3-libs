import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Web3 from 'web3'

type Providers = {
  ethersLibrary: Web3Provider,
  web3Library: Web3
}

function getLibrary(provider: any):  Providers {
  const ethersLibrary = new Web3Provider(provider)
  const web3Library = new Web3(provider)
  ethersLibrary.pollingInterval = 12000
  return {ethersLibrary, web3Library}
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
    <App />
    </Web3ReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
