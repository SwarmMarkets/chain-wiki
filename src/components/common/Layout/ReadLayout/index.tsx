import clsx from 'clsx'
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { generatePath, Outlet, useLocation, useParams } from 'react-router-dom'
import useNFT from 'src/hooks/subgraph/useNFT'
import RoutePaths from 'src/shared/enums/routes-paths'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'
import ContentContext from './ContentContext'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import Drawer from 'src/components/ui-kit/Drawer'
import ReadHeader from './ReadHeader'
import useBreakpoint from 'src/hooks/ui/useBreakpoint'

interface ReadLayoutProps {
  preview?: boolean
}

const ReadLayout: React.FC<PropsWithChildren<ReadLayoutProps>> = ({
  children,
  preview,
}) => {
  const { nftId } = useNFTIdParam()
  const { tokenIdOrSlug = '' } = useParams()
  const location = useLocation()
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const isXs = useBreakpoint('xs')
  const isSm = useBreakpoint('sm')
  const isMd = useBreakpoint('md')
  const isMobile = isXs || isSm || isMd

  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })

  const loading = loadingNft && !refetchingNft

  const isHistoryPage =
    location.pathname ===
    generatePath(RoutePaths.TOKEN_READ_HISTORY, {
      nftIdOrSlug: nft?.slug || '',
      tokenIdOrSlug: tokenIdOrSlug,
    })

  const firstTokenId = useMemo(() => {
    return (
      findFirstNonGroupVisibleNode(nft?.indexPagesContent?.indexPages)
        ?.tokenId || ''
    )
  }, [nft?.indexPagesContent?.indexPages])

  useEffect(() => {
    if (preview) return
    if (nft?.name) document.title = nft.name

    if (nft?.iconLogoUrl) {
      const favicon = document.querySelector(
        "link[rel~='icon']"
      ) as HTMLLinkElement | null
      if (favicon) favicon.href = nft.iconLogoUrl
    }
  }, [nft?.name, nft?.iconLogoUrl, preview])

  return (
    <ContentContext>
      <div className='flex flex-col w-full'>
        <ReadHeader
          nft={nft}
          preview={preview}
          isMobile={isMobile}
          toggleSidebar={() => setLeftSidebarOpen(prev => !prev)}
        />
        <div
          className={clsx(
            'flex flex-1 w-full max-w-screen-2xl mx-auto',
            'px-4 sm:px-6 md:px-8',
            preview ? 'pt-8' : 'pt-28'
          )}
        >
          {isMobile ? (
            <Drawer
              open={isLeftSidebarOpen}
              onClose={() => setLeftSidebarOpen(false)}
              position='left'
              className='!w-[240px] [&>button]:!left-[210px]'
            >
              <div className='flex flex-col overflow-y-auto pt-0'>
                <LeftSidebar
                  nft={nft}
                  preview={preview}
                  firstTokenId={firstTokenId}
                  onClose={() => setLeftSidebarOpen(false)}
                  isMobile={isMobile}
                  className='w-full px-2'
                />
              </div>
            </Drawer>
          ) : (
            <LeftSidebar
              nft={nft}
              preview={preview}
              firstTokenId={firstTokenId}
              isMobile={isMobile}
            />
          )}

          <main className='flex-1 px-0 sm:px-8 md:px-12'>
            {children || <Outlet />}
          </main>

          {!isMobile && !isHistoryPage && (
            <RightSidebar
              preview={preview}
              isLoading={loading}
              firstTokenId={firstTokenId}
              className='w-full'
            />
          )}
        </div>
      </div>
    </ContentContext>
  )
}

export default ReadLayout
