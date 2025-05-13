import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SettingView } from 'src/components/Settings/enums'
import { generateSiteLink } from 'src/shared/utils'

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share'
import {
  ConditionalRender,
  ConditionalItem,
} from 'src/components/common/ConditionalRender'
import ExplorerLink from 'src/components/common/ExplorerLink'
import NftRoleManager from 'src/components/Nft/NftRoleManager'
import GeneralSettings from 'src/components/Nft/NftView/GeneralSettings'
import Icon from 'src/components/ui-kit/Icon/Icon'
import SettingCard from '../SettingCard'
import IntegrationSetting from './IntegrationSetting'

interface Props {
  activeLink: string
}

const SettingsBody = ({ activeLink }: Props) => {
  const { nftId = '' } = useParams()
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })
  const shareUrl = generateSiteLink(nftId)

  const [showCheckmark, setShowCheckmark] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setShowCheckmark(true)
    setTimeout(() => setShowCheckmark(false), 1000)
  }

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
          description={
            <div className='flex items-center justify-between flex-wrap gap-2'>
              <span>{t('siteLink.description')}</span>
              <div className='flex gap-2 ml-4'>
                <EmailShareButton url={shareUrl}>
                  <EmailIcon size={24} round />
                </EmailShareButton>
                <FacebookShareButton url={shareUrl}>
                  <FacebookIcon size={24} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                  <TwitterIcon size={24} round />
                </TwitterShareButton>
                <RedditShareButton url={shareUrl}>
                  <RedditIcon size={24} round />
                </RedditShareButton>
                <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon size={24} round />
                </WhatsappShareButton>
              </div>
            </div>
          }
          title={t('siteLink.title')}
        >
          <div className='flex items-center gap-2 mb-4 group hover:text-primary-accent transition-colors duration-200'>
            <div style={{ width: 16 }}>
              {!showCheckmark ? (
                <Icon
                  name='copy'
                  size={16}
                  cursor='pointer'
                  className='text-primary hover:text-primary-accent'
                  onClick={handleCopy}
                />
              ) : (
                <Icon
                  name='checkmark'
                  size={16}
                  cursor='pointer'
                  className='group-hover:text-primary-accent'
                />
              )}
            </div>
            <a
              className='text-primary transition-colors duration-200 group-hover:text-primary-accent break-all cursor-pointer'
              href={shareUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {shareUrl}
            </a>
          </div>
        </SettingCard>

        <SettingCard
          description={t('smartContract.description')}
          title={t('smartContract.title')}
        >
          <ExplorerLink type='address' hash={nftId}>
            {nftId}
          </ExplorerLink>
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
      <ConditionalItem case={SettingView.INTEGRATION}>
        <IntegrationSetting />
      </ConditionalItem>
    </ConditionalRender>
  )
}

export default SettingsBody
