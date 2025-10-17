import { ReactNode } from 'react'
import { getNftBySlugOrAddress } from 'src/services/apollo/getNftBySlugOrAddress'
import { getTokens } from 'src/services/apollo/getTokens'
import Routes, {
  chainParamResolver,
  ReadParams,
} from 'src/shared/consts/routes'
import { getChainByName, unifyAddressToId } from 'src/shared/utils'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'
import ClientReadLayout from './ClientReadLayout'
import { createClientForChain } from 'src/services/apollo'
import { redirect } from 'next/navigation'

interface ReadLayoutProps {
  children: ReactNode
  params: ReadParams['token']
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
