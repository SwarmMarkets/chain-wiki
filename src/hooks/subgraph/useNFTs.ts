import { NetworkStatus, QueryHookOptions, useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

import { NFTsQuery } from '@src/queries'
import { NfTsQuery, NfTsQueryVariables } from '@src/queries/gql/graphql'
import { useStorage } from '@thirdweb-dev/react'
import { NfTsQueryFullData } from '@src/shared/types/ipfs'

const PAGE_LIMIT = 10
const POLL_INTERVAL = 15000

interface UseNftConfig {
  fetchFullData?: boolean
}

const useNFTs = (options?: QueryHookOptions<NfTsQuery, NfTsQueryVariables>, config?: UseNftConfig) => {
  const storage = useStorage()
  const [fullData, setFullData] = useState<NfTsQueryFullData[] | null>(null)

  const { data, loading, error, fetchMore, networkStatus, refetch } = useQuery(
    NFTsQuery,
    {
      fetchPolicy: 'cache-first',
      notifyOnNetworkStatusChange: true,
      pollInterval: POLL_INTERVAL,
      ...options,
      variables: {
        limit: PAGE_LIMIT,
        skip: 0,
        ...options?.variables,
      },
      async onCompleted(data) {
        if (!config?.fetchFullData) {
          return
        }

        const promises = data.nfts.map(item => storage?.downloadJSON(item.uri))

        const additionalData = await Promise.all(promises)

        const fullData = data.nfts.map((item, index) => {
          if (additionalData[index].error) {
            return item
          }

          return {
            ...item,
            ...additionalData[index],
          }
        })

        setFullData(fullData)
      },
    }
  )

  return useMemo(
    () => ({
      nfts: data?.nfts,
      fullNfts: fullData,
      loadingNfts:
        loading ||
        ![
          NetworkStatus.ready,
          NetworkStatus.error,
          NetworkStatus.poll,
        ].includes(networkStatus),
      error,
      refetch,
      refetchingNfts: [NetworkStatus.poll].includes(networkStatus),
      fetchMoreNfts: fetchMore,
    }),
    [data?.nfts, error, fetchMore, fullData, loading, networkStatus, refetch]
  )
}

export default useNFTs
