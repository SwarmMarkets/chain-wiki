import { NetworkStatus, QueryHookOptions, useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { NFTURIUpdatesQuery } from '@src/queries'
import {
  NfturiUpdatesQuery as NFTURIUpdatesQueryGQL,
  NftQueryVariables,
  NfturiUpdatesQueryVariables,
} from '@src/queries/gql/graphql'
import { unifyAddressToId } from '@src/shared/utils'

const PAGE_LIMIT = 10
const POLL_INTERVAL = 15000

const useNFTURIUpdates = (
  id: NftQueryVariables['id'],
  options?: QueryHookOptions<NFTURIUpdatesQueryGQL, NfturiUpdatesQueryVariables>
) => {
  const { data, loading, error, networkStatus, refetch, fetchMore } = useQuery(
    NFTURIUpdatesQuery,
    {
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      pollInterval: POLL_INTERVAL,
      skip: !id,
      ...options,
      variables: {
        limit: PAGE_LIMIT,
        skip: 0,
        filter: {
          nft: unifyAddressToId(id),
        },
        ...options?.variables,
      },
    }
  )

  return useMemo(
    () => ({
      nftUriUpdates: data?.nfturiupdates,
      loadingUriUpdates:
        loading ||
        ![
          NetworkStatus.ready,
          NetworkStatus.error,
          NetworkStatus.poll,
        ].includes(networkStatus),
      error,
      refetch,
      refetchingUriUpdates: [NetworkStatus.poll].includes(networkStatus),
      fetchMoreNfts: fetchMore,
    }),
    [data?.nfturiupdates, error, fetchMore, loading, networkStatus, refetch]
  )
}

export default useNFTURIUpdates
