import { arbitrumSepolia } from './networks/arbitrum-sepolia'

export const environment = Object.freeze({
  subgraphURL: arbitrumSepolia.subgraphURL,
  contractsAddresses: arbitrumSepolia.contracts,
  thirdWebClientId: process.env.REACT_APP_THIRD_WEB_CLIENT_ID,
})
