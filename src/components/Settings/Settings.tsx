import { useParams, useSearchParams } from 'react-router-dom'
import SettingsNavigation from './SettingsNavigation'
import SettingsBody from './SettingsBody'
import { RoutePathSetting } from 'src/shared/enums'
import { ConditionalItem, ConditionalRender } from '../common/ConditionalRender'
import NftReadPage from 'src/pages/NftReadPage'
import ReadLayout from '../common/Layout/ReadLayout'
import RequirePermissions from '../common/RequirePermissions'
import UpdateNftContentButton from '../UpdateContent/UpdateNftContentButton'
import { useCustomizationStore } from 'src/shared/store/customization-store'
import { useTranslation } from 'react-i18next'

const Settings = () => {
  const { setting = '' } = useParams()
  const [searchParams] = useSearchParams()
  const actilveLink = searchParams.get('setting') || RoutePathSetting.GENERAL
  const { nftId = '' } = useParams()
  const { headerBackground, headerLinks, linksColor, logoUrl, isEdited } =
    useCustomizationStore()
  const { t } = useTranslation('buttons')

  return (
    <ConditionalRender value={setting}>
      <ConditionalItem
        case={RoutePathSetting.GENERAL}
        className='flex justify-center'
      >
        <div className='flex gap-12 w-full max-w-screen-lg mt-8'>
          <SettingsNavigation />
          <SettingsBody activeLink={actilveLink} />
        </div>
      </ConditionalItem>
      <ConditionalItem
        case={RoutePathSetting.CUSTOMIZATION}
        className='rounded-md border border-main overflow-y-auto'
      >
        <ReadLayout preview>
          <NftReadPage />
        </ReadLayout>
        <RequirePermissions nftAddress={nftId}>
          <UpdateNftContentButton
            className='mt-6 w-full'
            nftAddress={nftId}
            ipfsHeaderLinkToUpdate={{ headerLinks, color: linksColor }}
            nftContentToUpdate={{ headerBackground, logoUrl }}
            disabled={!isEdited}
          >
            {t('save')}
          </UpdateNftContentButton>
        </RequirePermissions>
      </ConditionalItem>
    </ConditionalRender>
  )
}

export default Settings
