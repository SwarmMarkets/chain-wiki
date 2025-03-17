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
    <div className='mt-4 pr-6 text-sm'>
      <nav>
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
    </div>
  )
}

export default SettingsNavigation
