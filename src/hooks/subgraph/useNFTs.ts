import { NetworkStatus, useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { NFTQuery } from '@src/queries'

const PAGE_LIMIT = 10
const POLL_INTERVAL = 5000

const useNFTs = (
  options?: // QUERY OPTIONS VARIABLES FILTERS
) => {
  const {
    data,
    loading,
    error,
    called,
    fetchMore,
    networkStatus,
    refetch,
  } = useQuery(NFTQuery, {
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
    pollInterval: POLL_INTERVAL,
    ...options,
    variables: {
      limit: PAGE_LIMIT,
      skip: 0,
      filter: options.filter, // YOUR FILTER THERE
    },
  })

  return useMemo(
    () => ({
      nft: data.nfts,
      loadingOffers:
        loading ||
        ![
          NetworkStatus.ready,
          NetworkStatus.error,
          NetworkStatus.poll,
        ].includes(networkStatus),
      error,
      called,
      refetching: networkStatus === NetworkStatus.refetch,
      refetch,
      fetchMore,
    }),
    [called, data.nfts, error, fetchMore, loading, networkStatus, refetch],
  )
}

export default useNFTs
