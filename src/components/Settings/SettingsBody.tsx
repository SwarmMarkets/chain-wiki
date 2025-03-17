import { SettingView } from 'src/components/Settings/enums'
import NftRoleManager from '../Nft/NftRoleManager'
import { useParams } from 'react-router-dom'
import GeneralSettings from '../Nft/NftView/GeneralSettings'
import SettingCard from './SettingCard'
import { useTranslation } from 'react-i18next'
import { ConditionalItem, ConditionalRender } from '../common/ConditionalRender'

interface Props {
  activeLink: string
}

const SettingsBody = ({ activeLink }: Props) => {
  const { nftId = '' } = useParams()
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  // switch (activeLink) {
  //   default:
  //   case SettingView.GENERAL:
  //     return <GeneralSettings nftAddress={nftId} />
  //   case SettingView.ROLES:
  //     return (
  //       <SettingCard
  //         title={t('roleManager.title')}
  //         description={t('roleManager.description')}
  //       >
  //         <NftRoleManager nftAddress={nftId} />
  //       </SettingCard>
  //     )
  //   case SettingView.CONTENT:
  //     return (
  //       <SettingCard
  //         title={t('editPageContent.title')}
  //         description={t('editPageContent.description')}
  //       >
  //         <EditContent nftAddress={nftId} />
  //       </SettingCard>
  //     )
  //   case SettingView.LAYOUT:
  //     return (
  //       <SettingCard
  //         title={t('editHeaderLinks.title')}
  //         description={t('editHeaderLinks.description')}
  //       >
  //         <EditHeaderLinks nftAddress={nftId} />
  //       </SettingCard>
  //     )
  // }

  return (
    <ConditionalRender value={activeLink}>
      <ConditionalItem case={SettingView.GENERAL}>
        <GeneralSettings nftAddress={nftId} />
      </ConditionalItem>
      <ConditionalItem case={SettingView.ROLES}>
        <SettingCard
          title={t('roleManager.title')}
          description={t('roleManager.description')}
        >
          <NftRoleManager nftAddress={nftId} />
        </SettingCard>
      </ConditionalItem>
    </ConditionalRender>
  )
}

export default SettingsBody
