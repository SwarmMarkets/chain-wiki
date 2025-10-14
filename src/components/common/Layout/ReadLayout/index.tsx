import { ReactNode } from 'react'
import { getNftBySlugOrAddress } from 'src/services/apollo/getNftBySlugOrAddress'
import { getTokens } from 'src/services/apollo/getTokens'
import { ReadParams } from 'src/shared/consts/routes'
import { unifyAddressToId } from 'src/shared/utils'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'
import ClientReadLayout from './ClientReadLayout'

interface ReadLayoutProps {
  children: ReactNode
  params: Promise<ReadParams['nft']>
}

const ReadLayout = async ({
  children,
  params: paramsProp,
}: ReadLayoutProps) => {
  const params = await paramsProp
  const nftIdOrSlug = params?.nftIdOrSlug

  const { nft } = await getNftBySlugOrAddress(nftIdOrSlug)

  if (!nft) {
    return <p className='text-center text-gray-500'>NFT not found</p>
  }

  const firstToken = findFirstNonGroupVisibleNode(
    nft?.indexPagesContent?.indexPages
  )

  const { fullTokens } = await getTokens(
    {
      filter: { nft: unifyAddressToId(nft?.id || '') },
      limit: 1000,
    },
    { fetchFullData: true }
  )
  return (
    <ClientReadLayout nft={nft} firstToken={firstToken} fullTokens={fullTokens}>
      {children}
    </ClientReadLayout>
  )
}

export default ReadLayout
