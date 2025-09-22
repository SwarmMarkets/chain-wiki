import { useParams, useSearchParams } from 'react-router-dom'
import {
  useActiveWalletConnectionStatus,
  useSwitchActiveWalletChain,
} from 'thirdweb/react'
import useActiveOrDefaultChain from './useActiveOrDefaultChain'
import { useEffect, useState } from 'react'
import { getChainByName } from 'src/shared/utils'
import { useConfigStore } from 'src/shared/store/config-store'
import useEffectCompare from '../useEffectCompare'
import { baseChainConfig } from 'src/environment/networks/base'
import { polygonChainConfig } from 'src/environment/networks/polygon'
import useNftBySlugOnChains from '../subgraph/useNftBySlugOnChains'

const useHandleSwitchChain = (disabled?: boolean) => {
  const chain = useActiveOrDefaultChain()
  const setLastChainId = useConfigStore(state => state.setLastChainId)
  const [searchParams, setSearchParams] = useSearchParams()
  const switchChain = useSwitchActiveWalletChain()
  const status = useActiveWalletConnectionStatus()

  const chainNameSearchParam = searchParams.get('chain')
  const chainBySearchParam =
    chainNameSearchParam && getChainByName(chainNameSearchParam)

  const { nftIdOrSlug = '' } = useParams()

  const { baseNft, polygonNft, loading } = useNftBySlugOnChains(nftIdOrSlug)

  const [conflict, setConflict] = useState(false)

  useEffect(() => {
    if (disabled || loading) return

    const handleChainChange = async () => {
      if (baseNft && polygonNft && !chainBySearchParam) {
        setConflict(true)
        return
      }

      let targetChain = chainBySearchParam
      if (baseNft && polygonNft && chainBySearchParam) {
        targetChain = chainBySearchParam
      } else if (baseNft && !polygonNft) {
        targetChain = baseChainConfig
      } else if (!baseNft && polygonNft) {
        targetChain = polygonChainConfig
      }

      if (status === 'connected' && targetChain) {
        await switchChain(targetChain)
      }

      if (targetChain) {
        setLastChainId(targetChain.id)
        setSearchParams([['chain', targetChain.name ?? '']])
      }
    }

    handleChainChange()
  }, [status, disabled, loading, baseNft, polygonNft])

  useEffectCompare(() => {
    if (disabled) return
    setLastChainId(chain.id)
    window.location.reload()
  }, [chain.id, disabled])

  return { conflict }
}

export default useHandleSwitchChain
