import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'
import ExplorerLink from 'src/components/common/ExplorerLink'
import Icon from 'src/components/ui-kit/Icon/Icon'
import useNFTIdParam from 'src/hooks/useNftIdParam'
import { generateSiteLink } from 'src/shared/utils'
import SettingCard from '../../SettingCard'
import SiteNameSetting from './SiteNameSetting'
import SiteSlugSetting from './SiteSlugSetting'

const GeneralSetting = () => {
  const { nftId, slug } = useNFTIdParam()

  const { t } = useTranslation('nft', { keyPrefix: 'settings' })

  const shareUrl = generateSiteLink({ nftIdOrSlug: slug || nftId })

  const [showCheckmark, setShowCheckmark] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setShowCheckmark(true)
    setTimeout(() => setShowCheckmark(false), 1000)
  }

  return (
    <>
      <SettingCard
        description={t('siteName.description')}
        subtitle={t('siteName.subtitle')}
        title={t('siteName.title')}
      >
        <SiteNameSetting nftAddress={nftId} />
      </SettingCard>
      <SettingCard
        description={t('siteSlug.description')}
        subtitle={t('siteSlug.subtitle')}
        title={t('siteSlug.title')}
      >
        <SiteSlugSetting nftAddress={nftId} />
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
    </>
  )
}

export default GeneralSetting
