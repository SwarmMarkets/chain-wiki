'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import useNFTIdParam from './useNftIdParam'
import { isAddress } from 'ethers/lib/utils'
import Routes from 'src/shared/consts/routes'

/**
 * Hook to update the route to use NFT slug instead of address.
 * Place this hook at the top level of a layout or page component.
 */
const useUpdateRouteToSlug = () => {
  const router = useRouter()
  const params = useParams() as { nftIdOrSlug?: string; tokenIdOrSlug?: string }
  const { nftIdOrSlug = '', tokenIdOrSlug = '' } = params
  const { slug: nftSlug, loading: loadingNft } = useNFTIdParam()

  useEffect(() => {
    if (nftIdOrSlug && isAddress(nftIdOrSlug) && nftSlug) {
      const basePath = tokenIdOrSlug
        ? Routes.read.token(nftSlug, tokenIdOrSlug)
        : Routes.read.nft(nftSlug)

      router.replace(basePath)
    }
  }, [nftIdOrSlug, nftSlug, tokenIdOrSlug, loadingNft, router])
}

export default useUpdateRouteToSlug
