import { unifyAddressToId } from 'src/shared/utils'
import { getTokens } from './getTokens'
import { TokensQueryFullData } from 'src/shared/utils/ipfs/types'

/**
 * Server-side version of useTokenBySlug.
 * Fetches a token by NFT ID and slug. Returns the first matching token.
 */
export async function getTokenBySlug(
  nftId: string,
  slug?: string
): Promise<{
  token: TokensQueryFullData | null
}> {
  if (!nftId || !slug) return { token: null }

  const { fullTokens } = await getTokens(
    {
      filter: {
        nft: unifyAddressToId(nftId),
        slug,
      },
      limit: 100,
    },
    { fetchFullData: true }
  )

  const token = fullTokens?.[0] ?? null

  return { token }
}
