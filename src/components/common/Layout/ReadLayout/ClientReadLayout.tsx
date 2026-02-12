'use client'

import clsx from 'clsx'
import { useParams } from 'next/navigation'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Drawer from 'src/components/ui-kit/Drawer'
import { allNetworks } from 'src/environment/networks'
import useTokens from 'src/hooks/subgraph/useTokens'
import useBreakpoint from 'src/hooks/ui/useBreakpoint'
import { createClientForChain } from 'src/services/apollo'
import { chainParamResolver, ReadParams } from 'src/shared/consts/routes'
import {
  ipfsToHttp,
  IpfsIndexPage,
  NFTWithMetadata,
  TokensQueryFullData,
  unifyAddressToId,
} from 'src/shared/utils'
import ContentContext from './Content/ContentContext'
import LeftSidebar from './LeftSidebar'
import ReadHeader from './ReadHeader'
import RightSidebar from './RightSidebar'
import SidebarTree from './SidebarTree'
import { buildTree } from './utils'

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

  useEffect(() => {
    if (preview) return
    if (nft?.name) document.title = nft.name
    if (nft?.iconLogoUrl) {
      const favicon = document.querySelector(
        "link[rel~='icon']"
      ) as HTMLLinkElement | null
      if (favicon) favicon.href = ipfsToHttp(nft.iconLogoUrl)
    }
  }, [nft?.name, nft?.iconLogoUrl, preview])

  const treeData = useMemo(() => {
    if (!nft?.indexPagesContent?.indexPages) return []
    return buildTree(nft.indexPagesContent.indexPages, nft.slug, 0, chain)
  }, [chain, nft?.indexPagesContent?.indexPages, nft?.slug])
  const chainClient = useMemo(() => {
    if (!chain) return null
    const chainName = chainParamResolver[chain]
    const resolvedChain = allNetworks.find(
      c => c.name?.toLowerCase() === chainName?.toLowerCase()
    )
    if (!resolvedChain) return null
    return createClientForChain(resolvedChain.id)
  }, [chain])

  const { fullTokens: clientFullTokens } = useTokens(
    {
      client: chainClient || undefined,
      variables: nft?.id
        ? {
            filter: { nft: unifyAddressToId(nft.id) },
          }
        : undefined,
      skip: preview || !nft?.id || !chainClient,
    },
    { fetchFullData: true }
  )

  const resolvedFullTokens =
    clientFullTokens ||
    fullTokens ||
    (initialSelectedToken ? [initialSelectedToken] : null)

  const selectedToken = useMemo(() => {
    if (!resolvedTokenSlugOrId) return initialSelectedToken || null

    const fromFull = resolvedFullTokens?.find(
      t =>
        t.slug === resolvedTokenSlugOrId ||
        t.id.toLowerCase() === resolvedTokenSlugOrId?.toLowerCase()
    )
    if (fromFull) return fromFull

    if (
      initialSelectedToken &&
      (initialSelectedToken.slug === resolvedTokenSlugOrId ||
        initialSelectedToken.id.toLowerCase() ===
          resolvedTokenSlugOrId?.toLowerCase())
    ) {
      return initialSelectedToken
    }

    return null
  }, [resolvedFullTokens, initialSelectedToken, resolvedTokenSlugOrId])

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
