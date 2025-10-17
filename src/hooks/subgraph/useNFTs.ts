'use client'

import { NetworkStatus, QueryHookOptions, useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

import { NFTsQuery } from 'src/queries'
import {
  NfTsQuery as NFTsQueryGQL,
  NfTsQueryVariables,
} from 'src/queries/gql/graphql'
import { IpfsNftContent, NFTsQueryFullData } from 'src/shared/utils/ipfs/types'
import { unifyAddressToId, verifyNftValid } from 'src/shared/utils'
import useIpfsData from '../web3/useIpfsData'

export const PAGE_LIMIT = 10
const POLL_INTERVAL = 15000

interface UseNftConfig {
  fetchFullData?: boolean
}

const useNFTs = (
  options?: QueryHookOptions<NFTsQueryGQL, NfTsQueryVariables>,
  config?: UseNftConfig
) => {
  const [fullData, setFullData] = useState<NFTsQueryFullData[] | null>(null)
  const { fetch: fetchIpfsData, loading: ipfsDataLoading } =
    useIpfsData<IpfsNftContent>({
      validator: verifyNftValid,
      mapping: content => unifyAddressToId(content.address),
    })

  const { data, loading, error, fetchMore, networkStatus, refetch } = useQuery(
    NFTsQuery,
    {
      fetchPolicy: 'cache-and-network',
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
        const uris = data.nfts.map(nft => nft.uri)
        const { mappedResults } = await fetchIpfsData(uris)

        const fullData = data.nfts.map(item => {
          const ipfsContent = mappedResults.get(item.id)
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
        ipfsDataLoading ||
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
    [
      data?.nfts,
      error,
      fetchMore,
      fullData,
      ipfsDataLoading,
      loading,
      networkStatus,
      refetch,
    ]
  )
}

export default useNFTs
