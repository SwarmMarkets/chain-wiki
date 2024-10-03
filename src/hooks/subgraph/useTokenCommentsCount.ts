import useCommentsIds from './useCommentIds'

function useTokenCommentsCount(tokenId: string) {
  const { commentsIds } = useCommentsIds({
    variables: { limit: 50, filter: { token: tokenId } },
  })

  return commentsIds?.length || 0
}

export { useTokenCommentsCount }
