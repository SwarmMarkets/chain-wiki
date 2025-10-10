'use client'

import { useSearchParams, useParams } from 'next/navigation'
import SettingsNavigation from './SettingsNavigation'
import { RoutePathSetting } from 'src/shared/enums'
import { ConditionalItem, ConditionalRender } from '../common/ConditionalRender'
import ReadLayout from '../common/Layout/ReadLayout'
import UpdateNftContentButton from '../UpdateContent/UpdateNftContentButton'
import { useCustomizationStore } from 'src/shared/store/customization-store'
import { useTranslation } from 'react-i18next'
import SettingsBody from './SettingsBody'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import NftReadPage from '../pages/NftReadPage'

const Settings = () => {
  const params = useParams() as { setting?: string }
  const setting = params.setting || ''
  const searchParams = useSearchParams()
  const activeLink = searchParams.get('setting') || RoutePathSetting.GENERAL
  const { nftId } = useNFTIdParam()

  const {
    headerBackground,
    headerLinks,
    linksColor,
    logoUrl,
    iconLogoUrl,
    isEdited,
  } = useCustomizationStore()
  const { t } = useTranslation('buttons')

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
          <ReadLayout preview>
            <NftReadPage />
          </ReadLayout>
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
