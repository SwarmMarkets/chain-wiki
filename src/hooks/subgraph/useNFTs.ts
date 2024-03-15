import { NetworkStatus, QueryHookOptions, useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

import { NFTsQuery } from '@src/queries'
import {
  NfTsQuery as NFTsQueryGQL,
  NfTsQueryVariables,
} from '@src/queries/gql/graphql'
import { IpfsProjectContent, NFTQueryFullData } from '@src/shared/types/ipfs'
import { verifyProjectValid } from '@src/shared/utils'
import { useStorage } from '@thirdweb-dev/react'

const PAGE_LIMIT = 10
const POLL_INTERVAL = 15000

interface UseNftConfig {
  fetchFullData?: boolean
}

const useNFTs = (
  options?: QueryHookOptions<NFTsQueryGQL, NfTsQueryVariables>,
  config?: UseNftConfig
) => {
  const storage = useStorage()
  const [fullData, setFullData] = useState<NFTQueryFullData[] | null>(null)

  const getBatchIpfsData = async (nfts: NFTsQueryGQL['nfts']) => {
    const results = new Map<string, IpfsProjectContent>()

    const promises = nfts.map(item =>
      storage
        ?.downloadJSON(item.uri)
        .then(res => {
          verifyProjectValid(res)
          results.set(item.id, res)
        })
        .catch(e => e)
    )

    await Promise.all(promises)
    return results
  }

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
        if (!config?.fetchFullData) return

        const nftsIpfsData = await getBatchIpfsData(data.nfts)

        const fullData = data.nfts.map(item => {
          const ipfsContent = nftsIpfsData.get(item.id)
          if (!ipfsContent) return item

          return {
            ...item,
            ipfsContent,
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
