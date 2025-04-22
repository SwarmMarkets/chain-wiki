import { NetworkStatus, QueryHookOptions, useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

import { CommentsQuery as CommentsQueryGQL } from 'src/queries'
import { CommentsQuery, CommentsQueryVariables } from 'src/queries/gql/graphql'
import {
  CommentsQueryFullData,
  IpfsAttestationContent,
} from 'src/shared/utils/ipfs/types'
import { verifyAttestationValid } from 'src/shared/utils'
import { useStorage } from '@thirdweb-dev/react'

const PAGE_LIMIT = 10
const POLL_INTERVAL = 15000

interface UseAttestationsConfig {
  fetchFullData?: boolean
}

const useComments = (
  options?: QueryHookOptions<CommentsQuery, CommentsQueryVariables>,
  config?: UseAttestationsConfig
) => {
  const storage = useStorage()
  const [fullData, setFullData] = useState<CommentsQueryFullData[] | null>(null)
  const [fullDataLoading, setFullDataLoading] = useState(false)

  const getBatchIpfsData = async (comments: CommentsQuery['comments']) => {
    const results = new Map<string, IpfsAttestationContent>()

    const promises = comments.map(item =>
      storage
        ?.downloadJSON(item.uri)
        .then(res => {
          verifyAttestationValid(res)
          results.set(item.id, res)
        })
        .catch(e => e)
    )

    await Promise.all(promises)
    return results
  }

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

        const commentsIpfsData = await getBatchIpfsData(data.comments)

        setFullDataLoading(false)

        const fullData = data.comments.map(item => {
          const ipfsData = commentsIpfsData.get(item.id)
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
