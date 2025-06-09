import { useTranslation } from 'react-i18next'
import { SettingView } from 'src/components/Settings/enums'

import {
  ConditionalItem,
  ConditionalRender,
} from 'src/components/common/ConditionalRender'
import NftRoleManager from 'src/components/Nft/NftRoleManager'
import SettingCard from '../SettingCard'
import AttestatorsSetting from './AttestatorsSetting'
import ENSDomainSetting from './ENSDomainSetting'
import GeneralSetting from './GeneralSetting'
import IntegrationSetting from './IntegrationSetting'
import useNFTIdParam from 'src/hooks/useNftIdParam'

interface Props {
  activeLink: string
}

const SettingsBody = ({ activeLink }: Props) => {
  const { nftId } = useNFTIdParam()

  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  return (
    <ConditionalRender value={activeLink}>
      <ConditionalItem
        case={SettingView.GENERAL}
        className='flex flex-col gap-6'
      >
        <GeneralSetting />
      </ConditionalItem>

      <ConditionalItem case={SettingView.ROLES}>
        <SettingCard
          title={t('roleManager.title')}
          subtitle={t('roleManager.subtitle')}
          description={t('roleManager.description')}
        >
          <NftRoleManager nftAddress={nftId} />
        </SettingCard>
      </ConditionalItem>
      <ConditionalItem case={SettingView.INTEGRATION}>
        <IntegrationSetting />
      </ConditionalItem>
      <ConditionalItem case={SettingView.ATTESTATORS}>
        <AttestatorsSetting />
      </ConditionalItem>
      <ConditionalItem case={SettingView.ENS_DOMAIN}>
        <ENSDomainSetting />
      </ConditionalItem>
    </ConditionalRender>
  )
}

export default SettingsBody
