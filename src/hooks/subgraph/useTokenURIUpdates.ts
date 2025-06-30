import { NetworkStatus, QueryHookOptions, useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

import { TokenURIUpdatesQuery } from 'src/queries'
import {
  TokenQueryVariables,
  TokenUriUpdatesQuery as TokenURIUpdatesQueryGQL,
  TokenUriUpdatesQueryVariables,
} from 'src/queries/gql/graphql'
import { unifyAddressToId } from 'src/shared/utils'
import {
  IpfsTokenContent,
  TokenUriUpdatesQueryFullData,
} from 'src/shared/utils/ipfs/types'
import { useIpfsDownload } from '../web3/useIpfsDownload'

const PAGE_LIMIT = 10
const POLL_INTERVAL = 15000

interface UseTokenURIUpdatesConfig {
  fetchFullData?: boolean
}

const useTokenURIUpdates = (
  id: TokenQueryVariables['id'],
  options?: QueryHookOptions<
    TokenURIUpdatesQueryGQL,
    TokenUriUpdatesQueryVariables
  >,
  config?: UseTokenURIUpdatesConfig
) => {
  const [fullData, setFullData] = useState<
    TokenUriUpdatesQueryFullData[] | null
  >(null)

  const { download } = useIpfsDownload()

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
      async onCompleted(data) {
        if (!config?.fetchFullData) {
          return
        }

        const newUriPromises = data.tokenURIUpdates.map(item =>
          download<IpfsTokenContent>(item.newURI)
        )
        const prevUriPromises = data.tokenURIUpdates.map(item =>
          download<IpfsTokenContent>(item.previousURI)
        )
        const newUriData = await Promise.all(newUriPromises)
        const prevUriData = await Promise.all(prevUriPromises)

        const fullData = data.tokenURIUpdates.map((item, index) => {
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
      tokenUriUpdates: data?.tokenURIUpdates,
      fullTokenUriTokens: fullData,
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
    [data, error, fetchMore, fullData, loading, networkStatus, refetch]
  )
}

export default useTokenURIUpdates
