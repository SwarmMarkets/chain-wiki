import { useTranslation } from 'react-i18next'
import SettingCard from '../../SettingCard'
import IntegrationForm from './IntegrationForm'

const IntegrationSetting = () => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  return (
    <SettingCard
      title={t('import.title')}
      subtitle={t('import.subtitle')}
      description={t('import.description')}
    >
      <IntegrationForm onSuccessSubmit={() => {}} onErrorSubmit={() => {}} />
    </SettingCard>
  )
}

export default IntegrationSetting
