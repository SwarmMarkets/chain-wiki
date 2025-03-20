import { useParams, useSearchParams } from 'react-router-dom'
import SettingsNavigation from './SettingsNavigation'
import SettingsBody from './SettingsBody'
import { RoutePathSetting } from 'src/shared/enums'
import { ConditionalItem, ConditionalRender } from '../common/ConditionalRender'
import NftReadPage from 'src/pages/NftReadPage'
import ReadLayout from '../common/Layout/ReadLayout'

const Settings = () => {
  const { setting = '' } = useParams()
  const [searchParams] = useSearchParams()
  const actilveLink = searchParams.get('setting') || RoutePathSetting.GENERAL

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
        className='flex justify-center items-center rounded-md border border-main overflow-y-auto'
      >
        <ReadLayout preview>
          <NftReadPage />
        </ReadLayout>
      </ConditionalItem>
    </ConditionalRender>
  )
}

export default Settings
