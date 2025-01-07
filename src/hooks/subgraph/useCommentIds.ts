import { NetworkStatus, QueryHookOptions, useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { CommentIdsQuery as CommentIdsQueryGQL } from 'src/queries'
import {
  CommentIdsQuery,
  CommentIdsQueryVariables,
} from 'src/queries/gql/graphql'

const PAGE_LIMIT = 10
const POLL_INTERVAL = 15000

const useCommentIds = (
  options?: QueryHookOptions<CommentIdsQuery, CommentIdsQueryVariables>
) => {
  const { data, loading, error, fetchMore, networkStatus, refetch } = useQuery(
    CommentIdsQueryGQL,
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
    }
  )

  return useMemo(
    () => ({
      commentsIds: data?.comments,
      loadingCommentsIds:
        loading ||
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
    [data?.comments, error, fetchMore, loading, networkStatus, refetch]
  )
}

export default useCommentIds
