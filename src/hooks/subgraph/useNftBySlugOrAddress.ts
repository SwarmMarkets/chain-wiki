import { useMemo } from 'react'
import useNFTs from './useNFTs'
import { isAddress } from 'viem' // или ethers.js: import { isAddress } from 'ethers'

export const useNftBySlugOrAddress = (slugOrAddress?: string) => {
  const isValidAddress = !!slugOrAddress && isAddress(slugOrAddress)

  const { nfts, loadingNfts, refetchingNfts, ...rest } = useNFTs(
    {
      variables: {
        filter: isValidAddress
          ? { id: slugOrAddress }
          : { slug: slugOrAddress || '' },
        limit: 1,
      },
      pollInterval: undefined,
      skip: !slugOrAddress,
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
