'use client'

import { useMemo } from 'react'
import useNFTs from './useNFTs'
import { isAddress } from 'viem'
import { QueryHookOptions } from '@apollo/client'
import {
  NfTsQueryVariables,
  NfTsQuery as NFTsQueryGQL,
} from 'src/queries/gql/graphql'

export const useNftBySlugOrAddress = (
  slugOrAddress?: string,
  options?: QueryHookOptions<NFTsQueryGQL, NfTsQueryVariables>
) => {
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
      ...options,
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
