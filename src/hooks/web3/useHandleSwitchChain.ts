import { useSearchParams } from 'react-router-dom'
import {
  useActiveWalletConnectionStatus,
  useSwitchActiveWalletChain,
} from 'thirdweb/react'
import useActiveOrDefaultChain from './useActiveOrDefaultChain'
import { useEffect } from 'react'
import { getChainByName } from 'src/shared/utils'
import { useConfigStore } from 'src/shared/store/config-store'
import useEffectCompare from '../useEffectCompare'
import { baseChainConfig } from 'src/environment/networks/base'

const useHandleSwitchChain = () => {
  const chain = useActiveOrDefaultChain()
  const setLastChainId = useConfigStore(state => state.setLastChainId)
  const [searchParams] = useSearchParams()
  const switchChain = useSwitchActiveWalletChain()

  const status = useActiveWalletConnectionStatus()

  const chainNameSearchParam = searchParams.get('chain')
  const chainBySearchParam = chainNameSearchParam
    ? getChainByName(chainNameSearchParam)
    : getChainByName(baseChainConfig.name || 'Base')

  useEffect(() => {
    const handleChainChange = async () => {
      if (status === 'connected') {
        await switchChain(chain)
      }

      if (chainBySearchParam) {
        {
          setLastChainId(chainBySearchParam?.id)
        }
      }
    }
    handleChainChange()
  }, [status])

  useEffectCompare(() => {
    setLastChainId(chain.id)
    window.location.reload()
  }, [chain.id])
}

export default useHandleSwitchChain
