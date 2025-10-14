'use client'

import clsx from 'clsx'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Drawer from 'src/components/ui-kit/Drawer'
import useBreakpoint from 'src/hooks/ui/useBreakpoint'
import { ReadParams } from 'src/shared/consts/routes'
import {
  IpfsIndexPage,
  NFTWithMetadata,
  TokensQueryFullData,
} from 'src/shared/utils'
import ContentContext from './Content/ContentContext'
import LeftSidebar from './LeftSidebar'
import ReadHeader from './ReadHeader'
import RightSidebar from './RightSidebar'
import SidebarTree from './SidebarTree'
import { buildTree } from './utils'
import { useParams } from 'next/navigation'

interface ReadContextProps {
  nft: NFTWithMetadata | null
  fullTokens?: TokensQueryFullData[] | null
  firstToken?: IpfsIndexPage | null
  selectedToken?: TokensQueryFullData | null
}

const ReadContext = createContext<ReadContextProps | null>(null)

export function useReadContext() {
  const ctx = useContext(ReadContext)
  if (!ctx)
    throw new Error('useReadContext must be used within ReadLayoutClient')
  return ctx
}

const ClientReadLayout: React.FC<
  PropsWithChildren<{
    nft: NFTWithMetadata | null
    firstToken: IpfsIndexPage | null
    preview?: boolean
    fullTokens: TokensQueryFullData[] | null
    params: ReadParams['token']
  }>
> = ({ children, nft, firstToken, preview, fullTokens, params }) => {
  // const {
  //   conflict,
  //   baseNft,
  //   polygonNft,
  //   loading: loadingConflict,
  //   switchLocalChain,
  // } = useHandleSwitchChain(preview)

  const { chain } = params
  const { tokenIdOrSlug } = useParams<ReadParams['token']>()

  const resolvedTokenSlugOrId = tokenIdOrSlug || firstToken?.tokenId

  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const isMd = useBreakpoint('md')
  const isXl = useBreakpoint('xl')

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
    return buildTree(nft.indexPagesContent.indexPages, nft.slug, 0, chain)
  }, [chain, nft?.indexPagesContent?.indexPages, nft?.slug])

  // const handleSelectNetwork = (nft: NFTWithChain) => {
  //   const chain = nft.chain && getChainById(nft.chain)
  //   if (chain) switchLocalChain(chain, true)
  // }

  // if (conflict)
  //   return (
  //     <ChooseSiteNetwork
  //       onSelect={handleSelectNetwork}
  //       nfts={[baseNft, polygonNft].filter(Boolean) as NFTWithChain[]}
  //       loading={loadingConflict}
  //     />
  //   )

  const selectedToken = fullTokens?.find(
    t =>
      t.slug === resolvedTokenSlugOrId ||
      t.id.toLowerCase() === resolvedTokenSlugOrId?.toLowerCase()
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
                selectedId={selectedToken?.id || ''}
                onSelect={() => setLeftSidebarOpen(false)}
              />
            </Drawer>
          ) : (
            <LeftSidebar
              nft={nft}
              preview={preview}
              token={selectedToken}
              chainParam={chain}
            />
          )}

          <main className='flex-1 min-w-0 px-0 sm:px-8 md:px-12'>
            <ReadContext.Provider
              value={{ nft, firstToken, fullTokens, selectedToken }}
            >
              {children}
            </ReadContext.Provider>
          </main>

          {!isXl && (
            <RightSidebar
              preview={preview}
              firstTokenSlug={firstToken?.slug || ''}
            />
          )}
        </div>
      </div>
    </ContentContext>
  )
}

export default ClientReadLayout
