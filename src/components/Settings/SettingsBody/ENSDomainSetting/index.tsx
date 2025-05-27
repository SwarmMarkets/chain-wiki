import { useTranslation } from 'react-i18next'
import SettingCard from '../../SettingCard'
import SetupENSForm from './SetupENSForm'

const ENSDomainSetting = () => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings.ens' })
  return (
    <SettingCard
      title={t('title')}
      subtitle={t('subtitle')}
      description={t('description')}
    >
      <SetupENSForm />
    </SettingCard>
  )
}

export default ENSDomainSetting
