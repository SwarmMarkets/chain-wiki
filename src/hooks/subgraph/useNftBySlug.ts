import { useMemo } from 'react'
import useNFTs from './useNFTs'

export const useNftBySlug = (slug?: string) => {
  const { nfts, loadingNfts, refetchingNfts, ...rest } = useNFTs(
    {
      variables: { filter: { slug: slug || '' }, limit: 100 },
    },
    { fetchFullData: false }
  )

  return {
    nft: useMemo(() => nfts?.[0], [nfts]),
    loading: loadingNfts && !refetchingNfts,
    refetching: refetchingNfts,
    ...rest,
  }
}
