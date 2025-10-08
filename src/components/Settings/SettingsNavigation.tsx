'use client'

import { SettingView } from 'src/components/Settings/enums'
import { useSearchParams, usePathname } from 'next/navigation'
import useSettingsLinks from './useSettingsLinks'
import SelectableList from '../ExpandableList/SelectableList'

const SettingsNavigation = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const activeTab = searchParams.get('setting') || SettingView.GENERAL
  const settingsLinks = useSettingsLinks()

  const getHref = (newValue: string) => {
    const currentParams = Object.fromEntries(searchParams.entries())
    return `${pathname}?${new URLSearchParams({
      ...currentParams,
      setting: newValue,
    }).toString()}`
  }

  return (
    <nav className='text-sm min-w-52'>
      <SelectableList
        items={settingsLinks?.map(({ link, label, icon }) => ({
          id: link,
          label,
          icon,
          active: activeTab === link,
          to: getHref(link), // передаём ссылку с сохранением query
        }))}
        noMarginLeft
        lighter
      />
    </nav>
  )
}

export default SettingsNavigation
