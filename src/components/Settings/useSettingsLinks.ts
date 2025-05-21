import { useTranslation } from 'react-i18next'
import { SettingView } from './enums'
import { IconName } from 'src/shared/types/iconNames'

interface SettingsLink {
  label: string
  link: string
  icon: IconName
}

const useSettingsLinks = (): SettingsLink[] => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  return [
    {
      label: t('navigation.general.links.general.label'),
      link: SettingView.GENERAL,
      icon: 'settings',
    },
    {
      label: t('navigation.accessControl.links.roles.label'),
      link: SettingView.ROLES,
      icon: 'roles',
    },
    {
      label: t('navigation.attestators.links.attestators.label'),
      link: SettingView.ATTESTATORS,
      icon: 'checkmark-circle',
    },
  ]
}

export default useSettingsLinks
