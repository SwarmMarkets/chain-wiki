import { useEffect } from 'react'
import { useNavigate, useParams, generatePath } from 'react-router-dom'
import useNFTIdParam from './useNftIdParam'
import RoutePaths from 'src/shared/enums/routes-paths'
import { isAddress } from 'ethers/lib/utils'

/**
 * Hook to update the route to use NFT slug instead of address.
 * Place this hook at the top level of a layout or page component.
 */
const useUpdateRouteToSlug = () => {
  const navigate = useNavigate()
  const { nftIdOrSlug = '', tokenIdOrSlug = '' } = useParams()
  const { slug: nftSlug, loading: loadingNft } = useNFTIdParam()

  useEffect(() => {
    if (nftIdOrSlug && isAddress(nftIdOrSlug) && nftSlug) {
      if (tokenIdOrSlug) {
        navigate(
          generatePath(RoutePaths.TOKEN_READ, {
            nftIdOrSlug: nftSlug,
            tokenIdOrSlug,
          }),
          { replace: true }
        )
      } else {
        navigate(
          generatePath(RoutePaths.NFT_READ, {
            nftIdOrSlug: nftSlug,
          }),
          { replace: true }
        )
      }
    }
  }, [nftIdOrSlug, nftSlug, tokenIdOrSlug, loadingNft, navigate])
}

export default useUpdateRouteToSlug
