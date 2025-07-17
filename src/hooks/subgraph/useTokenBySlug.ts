import { useMemo } from 'react'
import { unifyAddressToId } from 'src/shared/utils'
import useTokens from './useTokens'

export const useTokenBySlug = (nftId: string, slug?: string) => {
  const { fullTokens, loading, refetching, ...rest } = useTokens(
    {
      variables: {
        filter: { nft: unifyAddressToId(nftId), slug },
        limit: 100,
      },
      pollInterval: undefined,
      skip: !slug || !nftId,
    },
    { fetchFullData: true }
  )

  return {
    token: useMemo(() => fullTokens?.[0], [fullTokens]),
    loading: loading && !refetching,
    refetching,
    ...rest,
  }
}
