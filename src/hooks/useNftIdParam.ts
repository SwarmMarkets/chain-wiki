import { useParams } from 'react-router-dom'
import { useNftBySlug } from './subgraph/useNftBySlug'
import { isAddress } from 'ethers/lib/utils'

const useNFTIdParam = () => {
  const { nftIdOrSlug = '' } = useParams()
  const { nft, loading } = useNftBySlug(nftIdOrSlug)

  if (!nftIdOrSlug) return { nftId: '', slug: '', loading }

  if (isAddress(nftIdOrSlug))
    return { nftId: nftIdOrSlug, slug: nft?.slug, loading }

  if (nft) {
    return { nftId: nft.id, slug: nft.slug, loading }
  }

  return { nftId: '', slug: '', loading }
}

export default useNFTIdParam
