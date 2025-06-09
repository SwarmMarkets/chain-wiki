import { useParams } from 'react-router-dom'
import { useTokenBySlug } from './subgraph/useTokenBySlug'
import useNFTIdParam from './useNftIdParam'

const useFullTokenIdParam = () => {
  const { tokenIdOrSlug = '' } = useParams()
  const { nftId } = useNFTIdParam()

  const { token } = useTokenBySlug(nftId, tokenIdOrSlug)

  if (!nftId || !tokenIdOrSlug) return ''

  if (token) {
    return token.id
  }

  return `${nftId}-${tokenIdOrSlug}`
}

export default useFullTokenIdParam
