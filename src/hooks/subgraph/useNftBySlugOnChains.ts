import { ApolloClient } from '@apollo/client'
import { useMemo } from 'react'
import { baseChainConfig, baseEnvironment } from 'src/environment/networks/base'
import {
  polygonChainConfig,
  polygonEnvironment,
} from 'src/environment/networks/polygon'
import { commonAppoloClientConfig } from 'src/services/apollo'
import { useNftBySlugOrAddress } from './useNftBySlugOrAddress'

/**
 * Query the same slug across Base and Polygon to detect availability on each network.
 */
const useNftBySlugOnChains = (slug?: string) => {
  const baseClient = useMemo(
    () =>
      new ApolloClient({
        ...commonAppoloClientConfig,
        uri: baseEnvironment.subgraphURL,
      }),
    []
  )

  const polygonClient = useMemo(
    () =>
      new ApolloClient({
        ...commonAppoloClientConfig,
        uri: polygonEnvironment.subgraphURL,
      }),
    []
  )

  const baseQuery = useNftBySlugOrAddress(slug, {
    client: baseClient,
    fetchPolicy: 'no-cache',
  })

  const polygonQuery = useNftBySlugOrAddress(slug, {
    client: polygonClient,
    fetchPolicy: 'no-cache',
  })

  const baseNft = useMemo(() => {
    const nft = baseQuery.nft
    return nft ? { ...nft, chain: baseChainConfig.id } : undefined
  }, [baseQuery.nft])

  const polygonNft = useMemo(() => {
    const nft = polygonQuery.nft
    return nft ? { ...nft, chain: polygonChainConfig.id } : undefined
  }, [polygonQuery.nft])

  const loading = baseQuery.loading || polygonQuery.loading

  return {
    baseNft,
    polygonNft,
    loading,
    error: baseQuery.error || polygonQuery.error,
  }
}

export default useNftBySlugOnChains
