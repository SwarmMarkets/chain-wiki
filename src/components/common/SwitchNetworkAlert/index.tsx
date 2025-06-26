import Text from 'src/components/ui/Text'
import {
  checkNetworkSupported,
  getActiveOrDefaultChain,
} from 'src/shared/utils'

import { useTranslation } from 'react-i18next'
import { AlertWrap, StyledButton } from './styled-components'
import { useConfigStore } from 'src/shared/store/config-store'
import useActiveOrDefaultChain from 'src/hooks/web3/useActiveOrDefaultChain'
import staticConfig from 'src/config'
import {
  useActiveWalletConnectionStatus,
  useSwitchActiveWalletChain,
} from 'thirdweb/react'

const SwitchNetworkAlert: React.FC = () => {
  const { id: chainId } = useActiveOrDefaultChain()
  const { t } = useTranslation('common', { keyPrefix: 'switchNetwork' })
  const supportedChains = staticConfig.supportedChains
  const connected = useActiveWalletConnectionStatus()
  const { setLastChainId } = useConfigStore()

  const switchChain = useSwitchActiveWalletChain()
  const supportedNetwork = supportedChains[0]

  const handleSwitchNetwork = () => {
    switchChain(getActiveOrDefaultChain(supportedNetwork.id))
    setLastChainId(supportedNetwork.id)
    window.location.reload()
  }

  const isNetworkSupported = checkNetworkSupported(chainId)
  const isConnected = connected === 'connected'

  if (isNetworkSupported || !isConnected) return null

  return (
    <AlertWrap>
      <Text.p color='white'>
        {t('description', { networkName: supportedNetwork.name })}
      </Text.p>
      <StyledButton ml={3} color='white' onClick={handleSwitchNetwork}>
        {t('button')}
      </StyledButton>
    </AlertWrap>
  )
}

export default SwitchNetworkAlert
