import { InjectedConnector } from "@web3-react/injected-connector";
const config = {
  supportedNet: [
    5, //goerli
  ],
};

export const connector = new InjectedConnector({
  supportedChainIds: config.supportedNet,
});
