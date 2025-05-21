import { useTranslation } from 'react-i18next'
import SettingCard from '../../SettingCard'

const AttestatorsSetting = () => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  return (
    <SettingCard
      title={t('attestatorsManager.title')}
      subtitle={t('attestatorsManager.subtitle')}
      description={t('attestatorsManager.description')}
    >
      <div>Preferred attestators</div>
    </SettingCard>
  )
}

export default AttestatorsSetting
