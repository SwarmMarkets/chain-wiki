'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  useActiveWalletConnectionStatus,
  useSwitchActiveWalletChain,
} from 'thirdweb/react'
import useActiveOrDefaultChain from './useActiveOrDefaultChain'
import { getChainByName } from 'src/shared/utils'
import { useConfigStore } from 'src/shared/store/config-store'
import useEffectCompare from '../useEffectCompare'
import { baseChainConfig } from 'src/environment/networks/base'
import { polygonChainConfig } from 'src/environment/networks/polygon'
import useNftBySlugOnChains from '../subgraph/useNftBySlugOnChains'
import { Chain } from 'thirdweb'
import Routes, { ReadParams } from 'src/shared/consts/routes'

const useHandleSwitchChain = (disabled?: boolean) => {
  const chain = useActiveOrDefaultChain()
  const setLastChainId = useConfigStore(state => state.setLastChainId)
  // const searchParams = useSearchParams()
  const { nftIdOrSlug, chain: chainNameParam } = useParams<ReadParams['nft']>()
  const router = useRouter()
  const switchChain = useSwitchActiveWalletChain()
  const status = useActiveWalletConnectionStatus()

  const chainNameSearchParam =
    chainNameParam[0].toUpperCase() + chainNameParam.slice(1)
  const chainBySearchParam =
    chainNameSearchParam && getChainByName(chainNameSearchParam)

  const { baseNft, polygonNft, loading } = useNftBySlugOnChains(nftIdOrSlug)

  const switchLocalChain = async (chainParam: Chain, reload = false) => {
    if (chainParam.name !== chainNameSearchParam) {
      setLastChainId(chainParam.id)

      // Формируем новый query-параметр и заменяем URL
      // const currentParams = Object.fromEntries(searchParams.entries())
      // const newParams = new URLSearchParams({
      //   ...currentParams,
      //   chain: chainParam.name ?? '',
      // })

      router.replace(
        Routes.read.nft(nftIdOrSlug, chainParam.name?.toLowerCase())
      )
    }

    if (reload) window.location.reload()
  }

  const conflict = baseNft && polygonNft && !chainBySearchParam

  useEffect(() => {
    if (disabled || loading) return

    const handleChainChange = async () => {
      if (conflict) return

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
