import { useParams } from 'react-router-dom'
import { useTokenBySlug } from './subgraph/useTokenBySlug'

const useFullTokenIdParam = () => {
  const { nftId = '', tokenIdOrSlug = '' } = useParams()
  const { token } = useTokenBySlug(nftId, tokenIdOrSlug)

  if (!nftId || !tokenIdOrSlug) return ''

  if (token) {
    return token.id
  }

  return `${nftId}-${tokenIdOrSlug}`
}

export default useFullTokenIdParam
