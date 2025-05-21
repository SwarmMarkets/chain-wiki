import { useTranslation } from 'react-i18next'
import SettingCard from '../../SettingCard'
import MakePreferredForm from './MakePreferredForm'
import { useParams } from 'react-router-dom'

const AttestatorsSetting = () => {
  const { nftId = '' } = useParams()
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  return (
    <SettingCard
      title={t('attestatorsManager.title')}
      subtitle={t('attestatorsManager.subtitle')}
      description={t('attestatorsManager.description')}
    >
      <MakePreferredForm nftAddress={nftId} />
    </SettingCard>
  )
}

export default AttestatorsSetting
