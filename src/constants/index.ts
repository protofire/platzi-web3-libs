export enum SupportedChainId {
  GOERLI = 5,
}

export const SUPPORTED_NETWORKS: Record<SupportedChainId, string> = {
  5: 'Görli',
}

export const PROPOSAL_ADDRESS: Record<SupportedChainId, string> = {
  5: '0xacfc7725527ba2ee4311574f65e5d76f9f9585e9',
}

const INFURA_NETWORK_MAP: Record<SupportedChainId, string> = {
  5: 'goerli',
}

export const getInfuraUrl = function (chainId: SupportedChainId) {
  return `https://${INFURA_NETWORK_MAP[chainId]}.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
}
