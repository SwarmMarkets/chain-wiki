'use client'

import TokenContentSkeleton from 'src/components/Token/TokenContentSkeleton'
import TokenView from 'src/components/Token/TokenView'
import useToken from 'src/hooks/subgraph/useToken'
import useTabs from 'src/hooks/useTabs'
import { TokenTabs } from 'src/shared/enums/tabs'
import DotMenu from 'src/components/ui-kit/DotMenu/DotMenu'
import { useTranslation } from 'react-i18next'
import useFullTokenIdParam from 'src/hooks/useFullTokenIdParam'
import useNFT from 'src/hooks/subgraph/useNFT'
import { useMemo } from 'react'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import Link from 'next/link'
import Routes, { MParams } from 'src/shared/consts/routes'
import { useParams } from 'next/navigation'

const TokenPage = () => {
  const { t } = useTranslation('token')

  const { tokenIdOrSlug = '' } = useParams<MParams['token']>()
  const { nftId } = useNFTIdParam()
  const fullTokenId = useFullTokenIdParam()

  const { changeTab } = useTabs<TokenTabs>({
    defaultTab: TokenTabs.READ,
  })

  const { nft, loadingNft, refetchingNft } = useNFT(nftId, {
    fetchFullData: true,
  })

  const firstTokenId = useMemo(
    () =>
      findFirstNonGroupVisibleNode(nft?.indexPagesContent?.indexPages)
        ?.tokenId || '',
    [nft?.indexPagesContent?.indexPages]
  )

  const { token, loadingToken, refetchingToken } = useToken(
    fullTokenId || firstTokenId
  )

  const showSkeleton =
    (loadingToken && !refetchingToken) || (loadingNft && !refetchingNft) || !nft

  const handleEditSite = () => {
    changeTab(TokenTabs.EDIT)
  }

  return (
    <>
      {showSkeleton ? (
        <div className='flex justify-center gap-5 w-full'>
          <div className='w-full'>
            <TokenContentSkeleton />
          </div>
        </div>
      ) : (
        <div className='w-full flex flex-col gap-4'>
          <div className='flex justify-between items-center'>
            <h1 className='typo-heading1 text-main-accent'>{token?.name}</h1>
            <DotMenu>
              <Link
                href={Routes.manager.history(nft.slug, tokenIdOrSlug as string)}
              >
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded'>
                  {t('menu.history')}
                </li>
              </Link>
            </DotMenu>
          </div>

          <TokenView onClickEditSite={handleEditSite} token={token} />
        </div>
      )}
    </>
  )
}

export default TokenPage
