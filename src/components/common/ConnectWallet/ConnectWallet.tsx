import { thirdwebCommonConnectConfig } from 'src/config/thirdweb'
import { ConnectButtonProps } from 'thirdweb/react'
import ConnectWalletDesktop from './ConnectWallet.desktop'
import ConnectWalletMobile from './ConnectWallet.mobile'
import useBreakpoint from 'src/hooks/ui/useBreakpoint'

const connectWalletProps: ConnectButtonProps = {
  autoConnect: true,
  detailsModal: {
    showTestnetFaucet: false,
    hideReceiveFunds: true,
    hideBuyFunds: true,
  },
  ...thirdwebCommonConnectConfig,
}

const ConnectWallet: React.FC = () => {
  const isSm = useBreakpoint('xs')

  if (isSm) return <ConnectWalletMobile {...connectWalletProps} />
  return <ConnectWalletDesktop {...connectWalletProps} />
}

export default ConnectWallet
