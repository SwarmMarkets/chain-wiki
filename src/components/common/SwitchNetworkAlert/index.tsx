import {
  useChainId,
  useSupportedChains,
  useSwitchChain,
} from '@thirdweb-dev/react'
import { AlertWrap } from './styled-components'
import Button from '@src/components/ui/Button/Button'
import Flex from '@src/components/ui/Flex'
import Text from '@src/components/ui/Text'
import { checkNetworkSupported } from '@src/shared/utils'
import { useTranslation } from 'react-i18next'

interface SwitchNetworkAlertProps {}

const SwitchNetworkAlert: React.FC<SwitchNetworkAlertProps> = () => {
  const chainId = useChainId()
  const { t } = useTranslation('common', { keyPrefix: 'switchNetwork' })
  const supportedChains = useSupportedChains()

  const switchChain = useSwitchChain()
  const supportedNetwork = supportedChains[0]

  const handleSwitchNetwork = () => {
    switchChain(supportedNetwork.chainId)
  }

  const isNetworkSupported = checkNetworkSupported(chainId)

  if (isNetworkSupported) return null

  return (
    <AlertWrap mt={2} mb={4}>
      <Text.h2 mb={3}>{t('title')}</Text.h2>
      <Flex alignItems='center' justifyContent='space-between'>
        <Text.p>
          {t('description', { networkName: supportedNetwork.name })}
        </Text.p>
        <Button onClick={handleSwitchNetwork}>{t('button')}</Button>
      </Flex>
    </AlertWrap>
  )
}

export default SwitchNetworkAlert
