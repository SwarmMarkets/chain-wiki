import { useTranslation } from 'react-i18next'
import { isSameEthereumAddress } from 'src/shared/utils'
import { useActiveAccount } from 'thirdweb/react'
import SettingCard from '../../SettingCard'
import SetupENSForm from './SetupENSForm'
import useResolvedDomain from './useResolvedDomain'
import useSetupENSForm from './useSetupENSForm'

const ENSDomainSetting = () => {
  const { t } = useTranslation('nft', { keyPrefix: 'settings.ens' })
  const account = useActiveAccount()
  const { watch, ...form } = useSetupENSForm()
  const domain = watch('domain')
  const { ownerAddress, ownerLoading } = useResolvedDomain(domain)

  const isOwner = isSameEthereumAddress(account?.address, ownerAddress)

  return (
    <SettingCard
      title={t('title')}
      subtitle={t('subtitle')}
      description={
        <>
          <div>{t('description')}</div>
          <div className='mt-2'>{t('slugInstruction')}</div>
        </>
      }
    >
      <SetupENSForm
        ownerLoading={ownerLoading}
        isOwner={isOwner}
        form={{ watch, ...form }}
      />
    </SettingCard>
  )
}

export default ENSDomainSetting
