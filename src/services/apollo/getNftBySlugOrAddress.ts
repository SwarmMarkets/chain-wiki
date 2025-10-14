import { isAddress } from 'viem'
import { getNfts } from './getNfts'
import { getNft } from './getNft'
import { ApolloClient } from '@apollo/client'

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

  const { nft } = await getNft(nfts?.[0]?.id || '', {
    fetchFullData: true,
    client: config?.client,
  })

  return { nft }
}
