'use client'

import { useEffect, useMemo, useState, PropsWithChildren } from 'react'
import clsx from 'clsx'
import { useParams, usePathname } from 'next/navigation'
import Drawer from 'src/components/ui-kit/Drawer'
import useNFT from 'src/hooks/subgraph/useNFT'
import useBreakpoint from 'src/hooks/ui/useBreakpoint'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import useHandleSwitchChain from 'src/hooks/web3/useHandleSwitchChain'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'
import ChooseSiteNetwork from './ChooseSiteNetwork'
import ContentContext from './Content/ContentContext'
import LeftSidebar from './LeftSidebar'
import ReadHeader from './ReadHeader'
import RightSidebar from './RightSidebar'
import SidebarTree from './SidebarTree'
import { buildTree } from './utils'
import { NFTWithChain } from 'src/components/Nft/NftList'
import { getChainById } from 'src/shared/utils'
import Routes, { MParams } from 'src/shared/consts/routes'

interface ReadLayoutProps {
  preview?: boolean
}

const ReadLayout: React.FC<PropsWithChildren<ReadLayoutProps>> = ({
  children,
  preview,
}) => {
  const {
    conflict,
    baseNft,
    polygonNft,
    loading: loadingConflict,
    switchLocalChain,
  } = useHandleSwitchChain(preview)
  const { nftId } = useNFTIdParam()
  const params = useParams<MParams['token']>()
  const tokenIdOrSlug = params.tokenIdOrSlug || ''
  const fullTokenid = useFullTokenIdParam()
  const pathname = usePathname()
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const isMd = useBreakpoint('md')
  const isXl = useBreakpoint('xl')

  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })
  const loading = (loadingNft && !refetchingNft) || loadingConflict

  const isHistoryPage =
    pathname === Routes.read.history(nft?.slug || '', tokenIdOrSlug)

  const firstToken = useMemo(
    () => findFirstNonGroupVisibleNode(nft?.indexPagesContent?.indexPages),
    [nft?.indexPagesContent?.indexPages]
  )

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

  const treeData = useMemo(() => {
    if (!nft?.indexPagesContent?.indexPages) return []
    return buildTree(nft.indexPagesContent.indexPages, nft.slug, 0)
  }, [nft?.indexPagesContent?.indexPages, nft?.slug])

  const handleSelectNetwork = (nft: NFTWithChain) => {
    const chain = nft.chain && getChainById(nft.chain)
    if (chain) switchLocalChain(chain, true)
  }

  if (conflict)
    return (
      <ChooseSiteNetwork
        onSelect={handleSelectNetwork}
        nfts={[baseNft, polygonNft].filter(Boolean) as NFTWithChain[]}
        loading={loadingConflict}
      />
    )

  return (
    <ContentContext>
      <div className='flex flex-col w-full h-screen'>
        <ReadHeader
          nft={nft}
          preview={preview}
          isMobile={isMd}
          toggleSidebar={() => setLeftSidebarOpen(prev => !prev)}
        />
        <div
          className={clsx(
            'flex flex-1 w-full max-w-screen-2xl mx-auto',
            'px-4 sm:px-6 md:px-8',
            preview ? 'pt-8' : 'pt-28'
          )}
        >
          {isMd ? (
            <Drawer
              open={isLeftSidebarOpen}
              onClose={() => setLeftSidebarOpen(false)}
              position='left'
              className='w-full flex flex-col'
            >
              <SidebarTree
                data={treeData}
                selectedId={fullTokenid || firstToken?.tokenId || ''}
                onSelect={() => setLeftSidebarOpen(false)}
              />
            </Drawer>
          ) : (
            <LeftSidebar
              nft={nft}
              preview={preview}
              firstTokenId={firstToken?.tokenId || ''}
            />
          )}

          <main className='flex-1 min-w-0 px-0 sm:px-8 md:px-12'>
            {children}
          </main>

          {!isXl && !isHistoryPage && (
            <RightSidebar
              preview={preview}
              isLoading={loading}
              firstTokenSlug={firstToken?.slug || ''}
            />
          )}
        </div>
      </div>
    </ContentContext>
  )
}

export default ReadLayout
