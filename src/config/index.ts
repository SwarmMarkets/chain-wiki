import { environment } from 'src/environment'
import {
  mainNetworks,
  networksEnvironments,
  testNetworks,
} from 'src/environment/networks'
import { arbitrumSepoliaChainConfig } from 'src/environment/networks/arbitrum-sepolia'
import { baseChainConfig } from 'src/environment/networks/base'

const { isProdMode, isDevMode } = environment

const defaultChain = isProdMode ? baseChainConfig : arbitrumSepoliaChainConfig

const defaultNetworkEnv = networksEnvironments[defaultChain.chainId]

const supportedChains = isProdMode ? mainNetworks : testNetworks

const staticConfig = Object.freeze({
  defaultChain,
  supportedChains,
  thirdWebClientId: environment.thirdWebClientId,
  defaultNetworkEnv,
  isDevMode,
})

export default staticConfig
