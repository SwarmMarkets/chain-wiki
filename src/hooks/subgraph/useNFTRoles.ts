import { NetworkStatus, useQuery } from '@apollo/client'
import { useMemo } from 'react'

import { NFTAccessRolesQuery } from 'src/queries'
import { QueryNftArgs } from 'src/queries/gql/graphql'

const POLL_INTERVAL = 15000

const useNFTRoles = (id?: QueryNftArgs['id']) => {
  const { data, loading, error, fetchMore, networkStatus, refetch } = useQuery(
    NFTAccessRolesQuery,
    {
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      pollInterval: POLL_INTERVAL,
      skip: !id,
      variables: {
        id: id || '',
      },
    }
  )

  return useMemo(
    () => ({
      nft: data?.nft,
      loadingNft:
        loading ||
        ![
          NetworkStatus.ready,
          NetworkStatus.error,
          NetworkStatus.poll,
        ].includes(networkStatus),
      error,
      refetch,
      refetchingNft: [NetworkStatus.poll].includes(networkStatus),
      fetchMoreNfts: fetchMore,
    }),
    [data?.nft, error, fetchMore, loading, networkStatus, refetch]
  )
}

export default useNFTRoles
