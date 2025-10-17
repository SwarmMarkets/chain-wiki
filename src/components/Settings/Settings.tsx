'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import useNFT from 'src/hooks/subgraph/useNFT'
import useTokens from 'src/hooks/subgraph/useTokens'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import { MParams } from 'src/shared/consts/routes'
import { RoutePathSetting } from 'src/shared/enums'
import { useCustomizationStore } from 'src/shared/store/customization-store'
import { unifyAddressToId } from 'src/shared/utils'
import { ConditionalItem, ConditionalRender } from '../common/ConditionalRender'
import ClientReadLayout from '../common/Layout/ReadLayout/ClientReadLayout'
import NftReadPage from '../pages/NftReadPage'
import UpdateNftContentButton from '../UpdateContent/UpdateNftContentButton'
import SettingsBody from './SettingsBody'
import SettingsNavigation from './SettingsNavigation'
import { findFirstNonGroupVisibleNode } from 'src/shared/utils/treeHelpers'

const Settings = () => {
  const params = useParams<MParams['settings']>()
  const setting = params.setting || ''
  const searchParams = useSearchParams()
  const activeLink = searchParams.get('setting') || RoutePathSetting.GENERAL
  const { nftId } = useNFTIdParam()
  const { nft } = useNFT(nftId, { fetchFullData: true })
  const { fullTokens } = useTokens(
    {
      variables: {
        filter: { nft: unifyAddressToId(nftId) },
        limit: 1000,
      },
      skip: !nftId,
    },
    { fetchFullData: true }
  )

  const {
    headerBackground,
    headerLinks,
    linksColor,
    logoUrl,
    iconLogoUrl,
    isEdited,
  } = useCustomizationStore()
  const { t } = useTranslation('buttons')

  const firstToken =
    findFirstNonGroupVisibleNode(nft?.indexPagesContent?.indexPages) || null

  return (
    <ConditionalRender value={setting}>
      <ConditionalItem
        case={RoutePathSetting.GENERAL}
        className='flex justify-center'
      >
        <div className='flex gap-12 w-full max-w-screen-lg mt-8'>
          <SettingsNavigation />
          <SettingsBody activeLink={activeLink} />
        </div>
      </ConditionalItem>
      <ConditionalItem case={RoutePathSetting.CUSTOMIZATION}>
        <div
          className='rounded-md border border-main overflow-y-auto pointer-events-none'
          style={{ maxHeight: 'calc(100vh - 200px)' }}
        >
          <ClientReadLayout
            preview
            nft={nft}
            fullTokens={fullTokens}
            firstToken={firstToken}
          >
            <NftReadPage />
          </ClientReadLayout>
        </div>
        <div className='flex justify-end mt-4'>
          <UpdateNftContentButton
            tooltipPosition='left'
            nftAddress={nftId}
            ipfsHeaderLinkToUpdate={{ headerLinks, color: linksColor }}
            nftContentToUpdate={{ headerBackground, logoUrl, iconLogoUrl }}
            disabled={!isEdited}
          >
            {t('save')}
          </UpdateNftContentButton>
        </div>
      </ConditionalItem>
    </ConditionalRender>
  )
}

export default Settings
