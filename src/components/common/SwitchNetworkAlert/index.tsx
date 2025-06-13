import Text from 'src/components/ui/Text'
import { checkNetworkSupported } from 'src/shared/utils'
import {
  useChainId,
  useConnectionStatus,
  useSupportedChains,
  useSwitchChain,
} from '@thirdweb-dev/react'
import { useTranslation } from 'react-i18next'
import { AlertWrap, StyledButton } from './styled-components'
import { useConfigStore } from 'src/shared/store/config-store'

const SwitchNetworkAlert: React.FC = () => {
  const chainId = useChainId()
  const { t } = useTranslation('common', { keyPrefix: 'switchNetwork' })
  const supportedChains = useSupportedChains()
  const connected = useConnectionStatus()
  const { setLastChainId } = useConfigStore()

  const switchChain = useSwitchChain()
  const supportedNetwork = supportedChains[0]

  const handleSwitchNetwork = () => {
    switchChain(supportedNetwork.chainId)
    setLastChainId(supportedNetwork.chainId)
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
