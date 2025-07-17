import { useTranslation } from 'react-i18next'
import {
  checkNetworkSupported,
  getActiveOrDefaultChain,
} from 'src/shared/utils'
import { useConfigStore } from 'src/shared/store/config-store'
import staticConfig from 'src/config'
import {
  useActiveWalletChain,
  useActiveWalletConnectionStatus,
  useSwitchActiveWalletChain,
} from 'thirdweb/react'
import Button from 'src/components/ui-kit/Button/Button'

const SwitchNetworkAlert: React.FC = () => {
  const chain = useActiveWalletChain()
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

  const isNetworkSupported = checkNetworkSupported(chain?.id)
  const isConnected = connected === 'connected'

  if (isNetworkSupported || !isConnected) return null

  return (
    <div className='flex justify-center items-center bg-gray-950 text-primary-contrast px-4 py-2 gap-5'>
      <p>{t('description', { networkName: supportedNetwork.name })}</p>
      <Button
        size='sm'
        color='primary-contrast'
        style={{ background: 'transparent' }}
        variant='outlined'
        onClick={handleSwitchNetwork}
      >
        {t('button')}
      </Button>
    </div>
  )
}

export default SwitchNetworkAlert
