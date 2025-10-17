import { ApolloClient } from '@apollo/client'
import { baseChainConfig, baseEnvironment } from 'src/environment/networks/base'
import {
  polygonChainConfig,
  polygonEnvironment,
} from 'src/environment/networks/polygon'
import { commonAppoloClientConfig } from 'src/services/apollo'
import { getNftBySlugOrAddress } from './getNftBySlugOrAddress'

/**
 * Server-side version of useNftBySlugOnChains.
 * Queries the same slug across Base and Polygon to detect availability on each network.
 */
export async function getNftBySlugOnChains(slug?: string) {
  if (!slug) {
    return {
      baseNft: undefined,
      polygonNft: undefined,
      loading: false,
      error: null,
    }
  }

  try {
    const baseClient = new ApolloClient({
      ...commonAppoloClientConfig,
      uri: baseEnvironment.subgraphURL,
    })

    const polygonClient = new ApolloClient({
      ...commonAppoloClientConfig,
      uri: polygonEnvironment.subgraphURL,
    })

    const [baseResult, polygonResult] = await Promise.all([
      getNftBySlugOrAddress(slug, { client: baseClient }),
      getNftBySlugOrAddress(slug, { client: polygonClient }),
    ])

    const baseNft = baseResult.nft
      ? { ...baseResult.nft, chain: baseChainConfig.id }
      : undefined

    const polygonNft = polygonResult.nft
      ? { ...polygonResult.nft, chain: polygonChainConfig.id }
      : undefined

    return {
      baseNft,
      polygonNft,
      loading: false,
      error: null,
    }
  } catch (error) {
    console.error('Error fetching NFTs on chains:', error)
    return {
      baseNft: undefined,
      polygonNft: undefined,
      loading: false,
      error,
    }
  }
}
