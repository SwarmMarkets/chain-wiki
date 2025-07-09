import { useTranslation } from 'react-i18next'
import {
  checkNetworkSupported,
  getActiveOrDefaultChain,
} from 'src/shared/utils'
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
    <div className='flex items-center justify-center border border-white bg-black text-white px-4 py-2 gap-3'>
      <p className='text-white'>
        {t('description', { networkName: supportedNetwork.name })}
      </p>
      <button
        onClick={handleSwitchNetwork}
        className='text-white border border-white px-3 py-1 hover:bg-white hover:text-black transition'
      >
        {t('button')}
      </button>
    </div>
  )
}

export default SwitchNetworkAlert
