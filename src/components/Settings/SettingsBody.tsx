import { SettingView } from 'src/components/Settings/enums'
import NftRoleManager from '../Nft/NftRoleManager'
import { useParams } from 'react-router-dom'
import GeneralSettings from '../Nft/NftView/GeneralSettings'
import SettingCard from './SettingCard'
import { useTranslation } from 'react-i18next'
import { ConditionalItem, ConditionalRender } from '../common/ConditionalRender'
import { generateSiteLink } from 'src/shared/utils'

interface Props {
  activeLink: string
}

const SettingsBody = ({ activeLink }: Props) => {
  const { nftId = '' } = useParams()
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  return (
    <ConditionalRender value={activeLink}>
      <ConditionalItem
        case={SettingView.GENERAL}
        className='flex flex-col gap-6'
      >
        <SettingCard
          description={t('siteName.description')}
          subtitle={t('siteName.subtitle')}
          title={t('siteName.title')}
        >
          <GeneralSettings nftAddress={nftId} />
        </SettingCard>
        <SettingCard
          description={t('siteLink.description')}
          title={t('siteLink.title')}
        >
          <a
            className='text-primary hover:text-primary-accent transition-colors break-all inline-block w-full'
            href={generateSiteLink(nftId)}
            target='_blank'
          >
            {generateSiteLink(nftId)}
            {generateSiteLink(nftId)}
          </a>
        </SettingCard>
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
    </ConditionalRender>
  )
}

export default SettingsBody
