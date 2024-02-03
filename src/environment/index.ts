import { mumbai } from "./networks/mumbai";

export const environment = Object.freeze({
  subgraphURL: mumbai.subgraphURL,
  contractsAddresses: mumbai.contracts,
  thirdWebClientId: import.meta.env.VITE_THIRD_WEB_CLIENT_ID
})
