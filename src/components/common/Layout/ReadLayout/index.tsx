import { Outlet, useParams, useLocation, generatePath } from 'react-router-dom'
import useNFT from 'src/hooks/subgraph/useNFT'
import LeftSidebar from './LeftSidebar'
import ReadHeader from './ReadHeader'
import RightSidebar from './RightSidebar'
import RoutePaths from 'src/shared/enums/routes-paths'
import clsx from 'clsx'
import React, { PropsWithChildren, useEffect, useMemo } from 'react'
import ContentContext, { useContentRef } from './ContentContext'
import { useTranslation } from 'react-i18next'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'

interface ReadLayoutProps {
  preview?: boolean
}

const ReadLayout: React.FC<PropsWithChildren<ReadLayoutProps>> = ({
  children,
  preview,
}) => {
  const { nftId = '', tokenIdOrSlug = '' } = useParams()
  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })
  const location = useLocation()
  const { t } = useTranslation('layout')

  const loading = loadingNft && !refetchingNft

  const isHistoryPage =
    location.pathname ===
    generatePath(RoutePaths.TOKEN_READ_HISTORY, {
      nftId: nftId,
      tokenIdOrSlug: tokenIdOrSlug,
    })

  useEffect(() => {
    if (preview) return

    if (nft?.name) {
      document.title = nft.name
    }
    if (nft?.iconLogoUrl) {
      const favicon = document.querySelector(
        "link[rel~='icon']"
      ) as HTMLLinkElement | null
      if (favicon) {
        favicon.href = nft.iconLogoUrl
      }
    }
  }, [nft?.name, nft?.iconLogoUrl, preview])

  const firstTokenId = useMemo(
    () =>
      findFirstNonGroupVisibleNode(nft?.indexPagesContent?.indexPages)
        ?.tokenId || '',
    [nft?.indexPagesContent?.indexPages]
  )

  return (
    <ContentContext>
      <div className='flex flex-col w-full'>
        <ReadHeader nft={nft} preview={preview} />

        <div
          className={clsx(
            'flex flex-1 max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 w-full',
            preview ? 'pt-8' : 'pt-28'
          )}
        >
          <LeftSidebar
            nft={nft}
            preview={preview}
            firstTokenId={firstTokenId}
          />

          <main className='flex-1 px-12'>{children || <Outlet />}</main>

          {!isHistoryPage && (
            <RightSidebar
              preview={preview}
              isLoading={loading}
              firstTokenId={firstTokenId}
            />
          )}
        </div>
      </div>
    </ContentContext>
  )
}

export default ReadLayout
