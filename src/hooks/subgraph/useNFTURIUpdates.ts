import { NetworkStatus, QueryHookOptions, useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

import { NFTURIUpdatesQuery } from 'src/queries'
import {
  NfturiUpdatesQuery as NFTURIUpdatesQueryGQL,
  NftQueryVariables,
  NfturiUpdatesQueryVariables,
} from 'src/queries/gql/graphql'
import { unifyAddressToId } from 'src/shared/utils'
import {
  IpfsNftContent,
  NftUriUpdatesQueryFullData,
} from 'src/shared/utils/ipfs/types'
import { useIpfsDownload } from '../web3/useIpfsDownload'

const PAGE_LIMIT = 10
const POLL_INTERVAL = 15000

interface UseNftURIUpdatesConfig {
  fetchFullData?: boolean
}

const useNFTURIUpdates = (
  id: NftQueryVariables['id'],
  options?: QueryHookOptions<
    NFTURIUpdatesQueryGQL,
    NfturiUpdatesQueryVariables
  >,
  config?: UseNftURIUpdatesConfig
) => {
  const [fullData, setFullData] = useState<NftUriUpdatesQueryFullData[] | null>(
    null
  )
  const { download } = useIpfsDownload()

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
      async onCompleted(data) {
        if (!config?.fetchFullData) {
          return
        }

        const newUriPromises = data.nfturiupdates.map(item =>
          download<IpfsNftContent>(item.newURI)
        )
        const prevUriPromises = data.nfturiupdates.map(item =>
          download<IpfsNftContent>(item.previousURI)
        )
        const newUriData = await Promise.all(newUriPromises)
        const prevUriData = await Promise.all(prevUriPromises)

        const fullData = data.nfturiupdates.map((item, index) => {
          return {
            ...item,
            ipfsNewUriContent: newUriData[index],
            ipfsPrevUriContent: prevUriData[index],
          }
        })
        setFullData(fullData)
      },
    }
  )

  return useMemo(
    () => ({
      nftUriUpdates: data?.nfturiupdates,
      fullNftUriUpdates: fullData,
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
    [
      data?.nfturiupdates,
      error,
      fetchMore,
      fullData,
      loading,
      networkStatus,
      refetch,
    ]
  )
}

export default useNFTURIUpdates
