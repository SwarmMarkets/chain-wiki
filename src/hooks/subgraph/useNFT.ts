import { NetworkStatus, useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { NFTQuery } from '@src/queries'
import { QueryNftArgs } from '@src/queries/gql/graphql'

const POLL_INTERVAL = 5000

const useNFT = (id: QueryNftArgs['id']) => {
  const {
    data,
    loading,
    error,
    fetchMore,
    networkStatus,
    refetch,
  } = useQuery(NFTQuery, {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    pollInterval: POLL_INTERVAL,
    variables: {
      id
    },
  })

  return useMemo(
    () => ({
      nft: data?.nft,
      loadingOffers:
        loading ||
        ![
          NetworkStatus.ready,
          NetworkStatus.error,
          NetworkStatus.poll,
        ].includes(networkStatus),
      error,
      refetch,
      fetchMore,
    }),
    [data?.nft, error, fetchMore, loading, networkStatus, refetch],
  )
}

export default useNFT
