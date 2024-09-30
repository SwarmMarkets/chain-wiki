import useCommentsIds from './useCommentsIds'

function usePageCommentsCount(tokenId: string) {
  const { commentsIds } = useCommentsIds({
    variables: { limit: 50, filter: { token: tokenId } },
  })

  return commentsIds?.length || 0
}

export { usePageCommentsCount }
