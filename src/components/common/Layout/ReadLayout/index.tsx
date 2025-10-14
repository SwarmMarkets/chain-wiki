import { ReactNode } from 'react'
import { getNftBySlugOrAddress } from 'src/services/apollo/getNftBySlugOrAddress'
import { getTokens } from 'src/services/apollo/getTokens'
import { ReadParams } from 'src/shared/consts/routes'
import { getChainByName, unifyAddressToId } from 'src/shared/utils'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'
import ClientReadLayout from './ClientReadLayout'
import { createClientForChain } from 'src/services/apollo'
import { baseChainConfig } from 'src/environment/networks/base'

interface ReadLayoutProps {
  children: ReactNode
  params: Promise<ReadParams['token']>
}

const ReadLayout = async ({
  children,
  params: paramsProp,
}: ReadLayoutProps) => {
  const params = await paramsProp
  const nftIdOrSlug = params?.nftIdOrSlug
  const chainName = params?.chain || 'base'
  const chainId = getChainByName(chainName)?.id || baseChainConfig.id
  const client = createClientForChain(chainId)

  const { nft } = await getNftBySlugOrAddress(nftIdOrSlug, { client })

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
