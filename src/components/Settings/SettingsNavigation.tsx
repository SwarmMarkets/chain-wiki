import { SettingView } from 'src/components/Settings/enums'
import { useSearchParams } from 'react-router-dom'
import useSettingsLinks from './useSettingsLinks'
import SelectableList from '../ExpandableList/SelectableList'

const SettingsNavigation = () => {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('setting') || SettingView.GENERAL
  const settingsLinks = useSettingsLinks()

  const getSearchParams = (newValue: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('setting', newValue)
    return newSearchParams.toString()
  }

  return (
    <nav className='text-sm min-w-52'>
      <SelectableList
        items={settingsLinks?.map(({ link, label, icon }) => ({
          id: link,
          label,
          icon,
          active: activeTab === link,
          to: `?${getSearchParams(link)}`,
        }))}
        noMarginLeft
      />
    </nav>
  )
}

export default SettingsNavigation
