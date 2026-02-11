import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { createClientForChain } from 'src/services/apollo'
import { getNftBySlugOrAddress } from 'src/services/apollo/getNftBySlugOrAddress'
import { getTokens } from 'src/services/apollo/getTokens'
import Routes, {
  chainParamResolver,
  ReadParams,
} from 'src/shared/consts/routes'
import { getChainByName, TokensQueryFullData, unifyAddressToId } from 'src/shared/utils'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'
import ClientReadLayout from './ClientReadLayout'

type ReadLayoutParams = ReadParams['nft'] & {
  tokenIdOrSlug?: string
}

interface ReadLayoutProps {
  children: ReactNode
  params: ReadLayoutParams
}

const ReadLayout = async ({ children, params }: ReadLayoutProps) => {
  const nftIdOrSlugParam = params?.nftIdOrSlug
  const chainParam = params?.chain
  const chainId = getChainByName(chainParamResolver[chainParam])?.id

  if (!chainId) {
    redirect(Routes.manager.home)
  }

  const client = createClientForChain(chainId)

  const { nft } = await getNftBySlugOrAddress(nftIdOrSlugParam, { client })

  const firstToken =
    findFirstNonGroupVisibleNode(nft?.indexPagesContent?.indexPages) || null


  let tokenFromPath: string | undefined
  if (!params?.tokenIdOrSlug) {
    const h = await headers()
    const pathname = h.get('x-pathname') || ''
    const parts = pathname.split('/').filter(Boolean)
    if (parts.length >= 3) {
      tokenFromPath = parts[2]
    }
  }

  const resolvedTokenSlugOrId =
    params?.tokenIdOrSlug || tokenFromPath || firstToken?.tokenId || ''

  let initialSelectedToken: TokensQueryFullData | null = null

  if (nft?.id && resolvedTokenSlugOrId) {
    const { fullTokens: bySlug } = await getTokens(
      {
        filter: {
          nft: unifyAddressToId(nft.id),
          slug: resolvedTokenSlugOrId,
        },
        limit: 1,
      },
      { fetchFullData: true, client }
    )

    initialSelectedToken = bySlug?.[0] ?? null

    if (!initialSelectedToken) {
      const { fullTokens: byId } = await getTokens(
        {
          filter: { id: resolvedTokenSlugOrId },
          limit: 1,
        },
        { fetchFullData: true, client }
      )
      initialSelectedToken = byId?.[0] ?? null
    }
  }

  return (
    <ClientReadLayout
      nft={nft}
      firstToken={firstToken}
      fullTokens={initialSelectedToken ? [initialSelectedToken] : null}
      initialSelectedToken={initialSelectedToken}
      params={params}
    >
      {children}
    </ClientReadLayout>
  )
}

export default ReadLayout
