import { useParams } from 'next/navigation'
import { useTokenBySlug } from './subgraph/useTokenBySlug'
import useNFTIdParam from './useNftIdParam'
import { MParams } from 'src/shared/consts/routes'

const useFullTokenIdParam = () => {
  const { tokenIdOrSlug = '' } = useParams<MParams['token']>()
  const { nftId } = useNFTIdParam()

  const { token } = useTokenBySlug(nftId, tokenIdOrSlug)

  if (!nftId || !tokenIdOrSlug) return ''

  if (token) {
    return token.id
  }

  return `${nftId}-${tokenIdOrSlug}`
}

export default useFullTokenIdParam
