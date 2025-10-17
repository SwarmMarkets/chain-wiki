import { QueryHookOptions } from '@apollo/client'
import { CommentIdsQuery as CommentIdsQueryGQL } from 'src/queries'
import {
  CommentIdsQuery,
  CommentIdsQueryVariables,
} from 'src/queries/gql/graphql'
import client from 'src/services/apollo'

const PAGE_LIMIT = 10

export const getCommentIDs = async (
  options?: QueryHookOptions<CommentIdsQuery, CommentIdsQueryVariables>
): Promise<{
  commentsIds: CommentIdsQuery['comments'] | undefined
  error?: any
}> => {
  try {
    const { data } = await client.query<
      CommentIdsQuery,
      CommentIdsQueryVariables
    >({
      query: CommentIdsQueryGQL,
      notifyOnNetworkStatusChange: true,
      ...options,
      fetchPolicy: 'network-only',
      variables: {
        limit: PAGE_LIMIT,
        skip: 0,
        ...options?.variables,
      },
    })

    return { commentsIds: data?.comments }
  } catch (error) {
    console.error('Error fetching comments IDs:', error)
    return { commentsIds: undefined, error }
  }
}
