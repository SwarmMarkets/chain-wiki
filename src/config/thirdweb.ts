import { lightTheme } from 'thirdweb/react'
import { createWallet } from 'thirdweb/wallets'
import staticConfig from '.'
import { thirdwebClient } from 'src/shared/api-clients/thirdweb'

export const thirdwebTheme = lightTheme({
  colors: {
    primaryButtonBg: '#511DD7',
    connectedButtonBg: '#511DD7',
    connectedButtonBgHover: '#511DD7',
  },
})

export const thirdwebCommonConnectConfig = {
  client: thirdwebClient,
  theme: thirdwebTheme,
  chain: staticConfig.defaultChain,
  chains: staticConfig.supportedChains,
  wallets: [
    createWallet('io.metamask'),
    createWallet('com.coinbase.wallet'),
    createWallet('walletConnect'),
  ],
  recommendedWallets: [createWallet('com.coinbase.wallet')],
}
