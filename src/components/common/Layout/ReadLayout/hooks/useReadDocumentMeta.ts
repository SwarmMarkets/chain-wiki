'use client'

import { useEffect } from 'react'
import { ipfsToHttp } from 'src/shared/utils'

interface UseReadDocumentMetaProps {
  preview?: boolean
  nftName?: string | null
  nftIconLogoUrl?: string | null
}

const useReadDocumentMeta = ({
  preview,
  nftName,
  nftIconLogoUrl,
}: UseReadDocumentMetaProps) => {
  useEffect(() => {
    if (preview) return

    const previousTitle = document.title
    const favicon = document.querySelector(
      "link[rel~='icon']"
    ) as HTMLLinkElement | null
    const previousFaviconHref = favicon?.href

    if (nftName) {
      document.title = nftName
    }

    if (favicon && nftIconLogoUrl) {
      favicon.href = ipfsToHttp(nftIconLogoUrl)
    }

    return () => {
      document.title = previousTitle
      if (favicon && previousFaviconHref) {
        favicon.href = previousFaviconHref
      }
    }
  }, [nftIconLogoUrl, nftName, preview])
}

export default useReadDocumentMeta
