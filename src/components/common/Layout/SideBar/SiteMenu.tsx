import { useTranslation } from 'react-i18next'
import DotMenu from 'src/components/ui-kit/DotMenu/DotMenu'
import { generateSiteLink } from 'src/shared/utils'
import { useToastManager } from 'src/hooks/useToastManager'

interface SiteMenuProps {
  nftId: string
  tokenId?: string
}

const SiteMenu: React.FC<SiteMenuProps> = ({ nftId, tokenId }) => {
  const { t } = useTranslation('layout', { keyPrefix: 'siteMenu' })
  const { addToast } = useToastManager()

  const siteUrl = generateSiteLink(nftId, tokenId)

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(siteUrl)
    addToast(t('urlCopied'), { type: 'success' })
  }

  const handleVisitSite = () => {
    window.open(siteUrl, '_blank')
  }

  return (
    <DotMenu position='right' iconProps={{ size: 14 }}>
      <li
        className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded'
        onClick={handleVisitSite}
      >
        {t('visitSite')}
      </li>
      <li
        className='px-4 py-2 hover:bg-gray-100 cursor-pointer rounded'
        onClick={handleCopyUrl}
      >
        {t('copyUrl')}
      </li>
    </DotMenu>
  )
}

export default SiteMenu
