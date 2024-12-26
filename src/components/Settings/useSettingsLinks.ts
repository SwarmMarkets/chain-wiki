import { useTranslation } from 'react-i18next'
import { SettingView } from './enums'
import { IconName } from '../ui/Icon'

interface SettingsLink {
  label: string
  link: string
  icon: IconName
}

interface SettingsGroup {
  title: string
  links: SettingsLink[]
}

const useSettingsLinks = (): Record<string, SettingsGroup> => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  return {
    generalSettings: {
      title: t('navigation.general.title'),
      links: [
        {
          label: t('navigation.general.links.general.label'),
          link: SettingView.GENERAL,
          icon: 'settings',
        },
      ],
    },
    accessControl: {
      title: t('navigation.accessControl.title'),
      links: [
        {
          label: t('navigation.accessControl.links.roles.label'),
          link: SettingView.ROLES,
          icon: 'roles',
        },
      ],
    },
    layoutPreferences: {
      title: t('navigation.layoutPreferences.title'),
      links: [
        {
          label: t('navigation.layoutPreferences.links.contentEditor.label'),
          link: SettingView.CONTENT,
          icon: 'contentEditor',
        },
        {
          label: t('navigation.layoutPreferences.links.layout.label'),
          link: SettingView.LAYOUT,
          icon: 'layout',
        },
      ],
    },
  }
}

export default useSettingsLinks
