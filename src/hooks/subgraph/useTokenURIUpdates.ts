import { NetworkStatus, QueryHookOptions, useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { TokenURIUpdatesQuery } from '@src/queries'
import {
  TokenQueryVariables,
  TokenUriUpdatesQuery as TokenURIUpdatesQueryGQL,
  TokenUriUpdatesQueryVariables,
} from '@src/queries/gql/graphql'
import { unifyAddressToId } from '@src/shared/utils'

const PAGE_LIMIT = 10
const POLL_INTERVAL = 15000

const useTokenURIUpdates = (
  id: TokenQueryVariables['id'],
  options?: QueryHookOptions<
    TokenURIUpdatesQueryGQL,
    TokenUriUpdatesQueryVariables
  >
) => {
  const { data, loading, error, networkStatus, refetch, fetchMore } = useQuery(
    TokenURIUpdatesQuery,
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
          token: unifyAddressToId(id),
        },
        ...options?.variables,
      },
    }
  )

  return useMemo(
    () => ({
      tokenUriUpdates: data?.tokenURIUpdates,
      loading:
        loading ||
        ![
          NetworkStatus.ready,
          NetworkStatus.error,
          NetworkStatus.poll,
        ].includes(networkStatus),
      error,
      refetch,
      refetching: [NetworkStatus.poll].includes(networkStatus),
      fetchMore: fetchMore,
    }),
    [data?.tokenURIUpdates, error, fetchMore, loading, networkStatus, refetch]
  )
}

export default useTokenURIUpdates
