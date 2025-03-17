import { useParams, useSearchParams } from 'react-router-dom'
import SettingsNavigation from './SettingsNavigation'
import SettingsBody from './SettingsBody'
import { RoutePathSetting } from 'src/shared/enums'
import { ConditionalItem, ConditionalRender } from '../common/ConditionalRender'

const Settings = () => {
  const { setting = '' } = useParams()
  const [searchParams] = useSearchParams()
  const actilveLink = searchParams.get('setting') || RoutePathSetting.GENERAL

  return (
    <ConditionalRender value={setting}>
      <ConditionalItem case={RoutePathSetting.GENERAL}>
        <div className='flex gap-6'>
          <SettingsNavigation />
          <SettingsBody activeLink={actilveLink} />
        </div>
      </ConditionalItem>
    </ConditionalRender>
  )
}

export default Settings
