import { useTranslation } from 'react-i18next'
import SettingCard from '../../SettingCard'
import IntegrationForm from './IntegrationForm'

const IntegrationSetting = () => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  return (
    <SettingCard
      title={t('import.title')}
      subtitle={t('import.subtitle')}
      description={
        <div>
          <div>{t('import.description')}</div>
          <div className='mt-1.5'>{t('import.descriptionNote')}</div>
        </div>
      }
    >
      <IntegrationForm />
    </SettingCard>
  )
}

export default IntegrationSetting
