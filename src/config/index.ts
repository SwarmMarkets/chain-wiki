import { environment } from 'src/environment'
import {
  mainNetworks,
  networksEnvironments,
  testNetworks,
} from 'src/environment/networks'
import { arbitrumSepoliaChainConfig } from 'src/environment/networks/arbitrum-sepolia'
import { baseChainConfig } from 'src/environment/networks/base'

const { isProdMode, isDevMode } = environment

const lastChainId = localStorage.getItem('last-chain-id')
  ? Number(
      JSON.parse(localStorage.getItem('last-chain-id') || '').state?.lastChainId
    )
  : undefined
const lastChain = mainNetworks.find(chain => chain.id === lastChainId)
const prodDefaultChain = lastChain || baseChainConfig

const defaultChain = isProdMode ? prodDefaultChain : arbitrumSepoliaChainConfig
const defaultNetworkEnv = networksEnvironments[defaultChain.id]

const supportedChains = isProdMode ? mainNetworks : testNetworks

const staticConfig = Object.freeze({
  defaultChain,
  supportedChains,
  thirdWebClientId: environment.thirdWebClientId,
  defaultNetworkEnv,
  isDevMode,
})

export default staticConfig
