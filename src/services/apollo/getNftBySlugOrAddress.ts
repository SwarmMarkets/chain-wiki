import { ApolloClient } from '@apollo/client'
import { isAddress } from 'viem'
import { fetchNftMetadata } from './fetchIpfsData'
import { getNfts } from './getNfts'

/**
 * Server-side version of useNftBySlugOrAddress.
 * Fetches an NFT by slug or address. Returns the first matching NFT.
 */
export async function getNftBySlugOrAddress(
  slugOrAddress?: string,
  config?: { client?: ApolloClient<any> }
) {
  if (!slugOrAddress) return { nft: null }

  const isValidAddress = isAddress(slugOrAddress)

  const { nfts } = await getNfts(
    {
      filter: isValidAddress ? { id: slugOrAddress } : { slug: slugOrAddress },
      limit: 1,
    },
    { fetchFullData: false, client: config?.client }
  )

  if (!nfts?.[0]) {
    return { nft: null }
  }

  const nft = await fetchNftMetadata(nfts?.[0])

  return { nft }
}
