import { useSearchParams } from 'react-router-dom'
import SettingsNavigation from './SettingsNavigation'
import SettingsBody from './SettingsBody'
import { SettingView } from '@src/components/Settings/enums'
import Flex from '../ui/Flex'

const Settings = () => {
  const [searchParams] = useSearchParams()
  const activeLink = searchParams.get('setting') || SettingView.MANAGE

  return (
    <Flex>
      <SettingsNavigation />
      <SettingsBody activeLink={activeLink} />
    </Flex>
  )
}

export default Settings
