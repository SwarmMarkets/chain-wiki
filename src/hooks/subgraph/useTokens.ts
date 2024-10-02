import { NetworkStatus, QueryHookOptions, useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

import {
  TokensQuery as TokensQueryGQL,
  TokensQueryVariables,
} from '@src/queries/gql/graphql'
import { TokensQueryFullData } from '@src/shared/types/ipfs'
import { useStorage } from '@thirdweb-dev/react'
import { TokensQuery } from '@src/queries'

const PAGE_LIMIT = 50
const POLL_INTERVAL = 15000

interface UseTokensConfig {
  fetchFullData?: boolean
}

const useTokens = (
  options?: QueryHookOptions<TokensQueryGQL, TokensQueryVariables>,
  config?: UseTokensConfig
) => {
  const storage = useStorage()
  const [fullData, setFullData] = useState<TokensQueryFullData[] | null>(null)

  const { data, loading, error, fetchMore, networkStatus, refetch } = useQuery(
    TokensQuery,
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

        const promises = data.tokens.map(
          item => item.uri && storage?.downloadJSON(item.uri)
        )

        const additionalData = await Promise.all(promises)

        const fullData = data.tokens.map((item, index) => {
          if (additionalData[index].error) {
            return item
          }

          return {
            ...item,
            ipfsContent: additionalData[index],
          }
        })

        setFullData(fullData)
      },
    }
  )

  return useMemo(
    () => ({
      tokens: data?.tokens,
      fullTokens: fullData,
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
    [data?.tokens, error, fetchMore, fullData, loading, networkStatus, refetch]
  )
}

export default useTokens
