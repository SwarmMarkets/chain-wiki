import { ReactNode } from 'react'
import { getNftBySlugOrAddress } from 'src/services/apollo/getNftBySlugOrAddress'
import { getTokens } from 'src/services/apollo/getTokens'
import Routes, {
  ChainParam,
  chainParamResolver,
  ReadParams,
} from 'src/shared/consts/routes'
import { getChainByName, unifyAddressToId } from 'src/shared/utils'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'
import ClientReadLayout from './ClientReadLayout'
import { createClientForChain } from 'src/services/apollo'
import { getNftBySlugOnChains } from 'src/services/apollo/getNftBySlugOnChain'
import { redirect } from 'next/navigation'

interface ReadLayoutProps {
  children: ReactNode
  params: Promise<ReadParams['token']>
}

const ReadLayout = async ({
  children,
  params: paramsProp,
}: ReadLayoutProps) => {
  const params = await paramsProp
  const nftIdOrSlugParam = params?.nftIdOrSlug
  const chainParam = params?.chain
  const chainId = getChainByName(chainParamResolver[chainParam])?.id

  // To support cases when chain param is omitted
  if (!chainId) {
    const nftIdOrSlug = chainParam
    const tokenIdOrSlug = nftIdOrSlugParam

    const { baseNft, polygonNft } = await getNftBySlugOnChains(chainParam)

    if (baseNft) {
      if (tokenIdOrSlug) {
        redirect(Routes.read.token(nftIdOrSlug, tokenIdOrSlug, ChainParam.Base))
      }
      redirect(Routes.read.nft(nftIdOrSlug, ChainParam.Base))
    } else if (polygonNft) {
      if (tokenIdOrSlug) {
        redirect(
          Routes.read.token(nftIdOrSlug, tokenIdOrSlug, ChainParam.Polygon)
        )
      }
      redirect(Routes.read.nft(nftIdOrSlug, ChainParam.Polygon))
    } else {
      redirect(Routes.manager.home)
    }
  }

  const client = createClientForChain(chainId)

  const { nft } = await getNftBySlugOrAddress(nftIdOrSlugParam, { client })

  const firstToken =
    findFirstNonGroupVisibleNode(nft?.indexPagesContent?.indexPages) || null

  const { fullTokens } = await getTokens(
    {
      filter: { nft: unifyAddressToId(nft?.id || '') },
      limit: 1000,
    },
    { fetchFullData: true, client }
  )

  return (
    <ClientReadLayout
      nft={nft}
      firstToken={firstToken}
      fullTokens={fullTokens}
      params={params}
    >
      {children}
    </ClientReadLayout>
  )
}

export default ReadLayout
