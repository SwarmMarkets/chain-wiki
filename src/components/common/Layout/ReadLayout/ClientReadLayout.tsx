'use client'

import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import Drawer from 'src/components/ui-kit/Drawer'
import useBreakpoint from 'src/hooks/ui/useBreakpoint'
import { ReadParams } from 'src/shared/consts/routes'
import {
  IpfsIndexPage,
  NFTWithMetadata,
  TokensQueryFullData,
} from 'src/shared/utils'
import ContentContext from './Content/ContentContext'
import useReadDocumentMeta from './hooks/useReadDocumentMeta'
import useReadLayoutData from './hooks/useReadLayoutData'
import LeftSidebar from './LeftSidebar'
import ReadHeader from './ReadHeader'
import RightSidebar from './RightSidebar'
import SidebarTree from './SidebarTree'

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

interface ClientReadLayoutProps extends PropsWithChildren {
  nft: NFTWithMetadata | null
  firstToken?: IpfsIndexPage | null
  preview?: boolean
  fullTokens: TokensQueryFullData[] | null
  initialSelectedToken?: TokensQueryFullData | null
  params?: ReadParams['nft'] & { tokenIdOrSlug?: string }
}

const ClientReadLayout: React.FC<ClientReadLayoutProps> = ({
  children,
  nft,
  firstToken,
  preview,
  fullTokens,
  initialSelectedToken,
  params,
}) => {
  const routeParams = useParams<ReadParams['token']>()
  const { tokenIdOrSlug } = routeParams || {}
  const chain = routeParams?.chain || params?.chain

  const resolvedTokenSlugOrId = tokenIdOrSlug || firstToken?.tokenId

  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const isMd = useBreakpoint('md')
  const isXl = useBreakpoint('xl')

  useReadDocumentMeta({
    preview,
    nftName: nft?.name,
    nftIconLogoUrl: nft?.iconLogoUrl,
  })

  const { resolvedFullTokens, selectedToken, treeData } = useReadLayoutData({
    chain,
    nft,
    preview,
    fullTokens,
    initialSelectedToken,
    resolvedTokenSlugOrId,
  })

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
              fullTokens={resolvedFullTokens}
            />
          )}

          <main className='flex-1 min-w-0 px-0 sm:px-8 md:px-12'>
            <ReadContext.Provider
              value={{
                nft,
                firstToken,
                fullTokens: resolvedFullTokens,
                selectedToken,
              }}
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
