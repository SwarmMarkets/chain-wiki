import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
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
import { Chain } from 'thirdweb'

const useHandleSwitchChain = (disabled?: boolean) => {
  const chain = useActiveOrDefaultChain()
  const setLastChainId = useConfigStore(state => state.setLastChainId)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const switchChain = useSwitchActiveWalletChain()
  const status = useActiveWalletConnectionStatus()

  const chainNameSearchParam = searchParams.get('chain')
  const chainBySearchParam =
    chainNameSearchParam && getChainByName(chainNameSearchParam)

  const { nftIdOrSlug = '' } = useParams()

  const { baseNft, polygonNft, loading } = useNftBySlugOnChains(nftIdOrSlug)

  const switchLocalChain = async (chainParam: Chain, reload = false) => {
    if (chainParam.name !== chainNameSearchParam) {
      setLastChainId(chainParam.id)
      navigate({ search: `?chain=${chainParam.name}` }, {})
    }

    if (reload) window.location.reload()
  }

  const conflict = baseNft && polygonNft && !chainBySearchParam

  useEffect(() => {
    if (disabled || loading) return

    const handleChainChange = async () => {
      if (conflict) {
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

      if (targetChain) {
        switchLocalChain(targetChain)
        if (status === 'connected') await switchChain(chain)
      }
    }

    handleChainChange()
  }, [status, disabled, loading, baseNft, polygonNft])

  useEffectCompare(() => {
    if (disabled) return
    if (chainBySearchParam) {
      switchLocalChain(chainBySearchParam, true)
    }
  }, [chain.id, disabled])

  return { conflict, baseNft, polygonNft, loading, switchLocalChain }
}

export default useHandleSwitchChain
