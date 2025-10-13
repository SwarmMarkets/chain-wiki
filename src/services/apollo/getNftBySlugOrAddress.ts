import { isAddress } from 'viem'
import { getNfts } from './getNfts'
import { getNft } from './getNft'

/**
 * Server-side version of useNftBySlugOrAddress.
 * Fetches an NFT by slug or address. Returns the first matching NFT.
 */
export async function getNftBySlugOrAddress(slugOrAddress?: string) {
  if (!slugOrAddress) return { nft: null }

  const isValidAddress = isAddress(slugOrAddress)

  const { nfts } = await getNfts(
    {
      filter: isValidAddress ? { id: slugOrAddress } : { slug: slugOrAddress },
      limit: 1,
    },
    { fetchFullData: false }
  )

  const { nft } = await getNft(nfts?.[0]?.id || '', { fetchFullData: true })

  return { nft }
}
