import { NetworkStatus, useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { NFTURIUpdatesQuery } from '@src/queries'
import { QueryNftArgs } from '@src/queries/gql/graphql'
import { unifyAddressToId } from '@src/shared/utils'

const POLL_INTERVAL = 5000

const useNFTURIUpdates = (id: QueryNftArgs['id']) => {
  const { data, loading, error, networkStatus, refetch } = useQuery(
    NFTURIUpdatesQuery,
    {
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      pollInterval: POLL_INTERVAL,
      skip: !id,
      variables: {
        filter: {
          nft: unifyAddressToId(id),
        },
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
    }),
    [data?.nfturiupdates, error, loading, networkStatus, refetch]
  )
}

export default useNFTURIUpdates
