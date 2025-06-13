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
      label: t('navigation.general.label'),
      link: SettingView.GENERAL,
      icon: 'settings',
    },
    {
      label: t('navigation.roles.label'),
      link: SettingView.ROLES,
      icon: 'roles',
    },
    {
      label: t('navigation.attestators.label'),
      link: SettingView.ATTESTATORS,
      icon: 'checkmark-circle',
    },
    {
      label: t('navigation.ens.label'),
      link: SettingView.ENS_DOMAIN,
      icon: 'ens-mark',
    },
    {
      label: t('navigation.integration.label'),
      link: SettingView.INTEGRATION,
      icon: 'gear',
    },
  ]
}

export default useSettingsLinks
