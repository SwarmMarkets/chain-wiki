import { useParams } from 'react-router-dom'
import { useTokenBySlug } from './subgraph/useTokenBySlug'
import useToken from './subgraph/useToken'
import { isFullTokenId } from 'src/shared/utils'

export const useTokenIdentifier = () => {
  const { nftId = '', tokenIdOrSlug = '' } = useParams()

  const isTokenId = isFullTokenId(tokenIdOrSlug)
  const tokenId = isTokenId ? tokenIdOrSlug : undefined
  const slug = !isTokenId ? tokenIdOrSlug : undefined

  const { token: tokenBySlug, loading: loadingBySlug } = useTokenBySlug(
    nftId,
    slug
  )
  const { token: tokenById, loading: loadingById } = useToken(tokenId || '')

  return {
    token: tokenBySlug || tokenById,
    loading: slug ? loadingBySlug : loadingById,
    isTokenId,
    tokenIdOrSlug,
    nftId,
  }
}
