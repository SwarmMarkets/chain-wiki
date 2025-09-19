import { NetworkStatus, QueryHookOptions, useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

import { CommentsQuery as CommentsQueryGQL } from 'src/queries'
import { CommentsQuery, CommentsQueryVariables } from 'src/queries/gql/graphql'
import { CommentsQueryFullData } from 'src/shared/utils/ipfs/types'
import { verifyAttestationValid } from 'src/shared/utils'
import useIpfsData from '../web3/useIpfsData'

const PAGE_LIMIT = 10
const POLL_INTERVAL = 15000

interface UseAttestationsConfig {
  fetchFullData?: boolean
}

const useComments = (
  options?: QueryHookOptions<CommentsQuery, CommentsQueryVariables>,
  config?: UseAttestationsConfig
) => {
  const [fullData, setFullData] = useState<CommentsQueryFullData[] | null>(null)
  const [fullDataLoading, setFullDataLoading] = useState(false)

  const { fetch: getBatchIpfsData } = useIpfsData({
    validator: verifyAttestationValid,
  })

  const { data, loading, error, fetchMore, networkStatus, refetch } = useQuery(
    CommentsQueryGQL,
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
        setFullDataLoading(true)

        const commentsIpfsData = await getBatchIpfsData(
          data.comments.map(item => item.uri)
        )

        setFullDataLoading(false)

        const fullData = data.comments.map((item, index) => {
          const ipfsData = commentsIpfsData.results[index]
          if (!ipfsData) return item

          return {
            ipfsContent: ipfsData,
            ...item,
          }
        })

        setFullData(fullData)
      },
    }
  )

  return useMemo(
    () => ({
      comments: data?.comments,
      fullComments: fullData,
      loadingComments:
        loading ||
        fullDataLoading ||
        ![
          NetworkStatus.ready,
          NetworkStatus.error,
          NetworkStatus.poll,
        ].includes(networkStatus),
      error,
      refetch,
      refetchingComments: [NetworkStatus.poll].includes(networkStatus),
      fetchMoreComments: fetchMore,
    }),
    [
      data?.comments,
      error,
      fetchMore,
      fullData,
      fullDataLoading,
      loading,
      networkStatus,
      refetch,
    ]
  )
}

export default useComments
