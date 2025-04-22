import React from 'react'
import { useTranslation } from 'react-i18next'
import Card from 'src/components/ui/Card'
import { useCustomizationStore } from 'src/shared/store/customization-store'
import { NFTWithMetadata } from 'src/shared/utils'
import UploadFileButton from '../../UploadFileButton'
import useOnFirstMount from 'src/components/ui-kit/hooks/useOnFirstMount'

interface NftLayoutSideBarGeneralTabProps {
  nft: NFTWithMetadata
}

const NftLayoutSideBarGeneralTab: React.FC<NftLayoutSideBarGeneralTabProps> = ({
  nft,
}) => {
  const { t } = useTranslation(['nft', 'layout'])

  const { logoUrl, setLogoUrl, init } = useCustomizationStore()

  useOnFirstMount(() => {
    init({
      ...(nft.headerBackground && {
        headerBackground: nft.headerBackground,
      }),
      ...(nft.headerLinksContent?.color && {
        linksColor: nft.headerLinksContent?.color,
      }),
      headerLinks: nft.headerLinksContent?.headerLinks,
      logoUrl: nft.logoUrl,
    })
  })

  const handleUploadLogo = (url: string) => {
    setLogoUrl(url)
  }
  return (
    <Card>
      <h4 className='typo-title2 text-main-accent font-semibold'>
        {t('customization.basic', { ns: 'layout' })}
      </h4>
      <div className='border-b border-main my-4'></div>
      <div className='mb-2'>
        <div className='typo-title2 text-main-accent font-semibold mb-1'>
          {t('settings.customLogo.title')}
        </div>
        <div>{t('settings.customLogo.description')}</div>
        <div className='p-5 mt-2 bg-gray-100 rounded-md h-36 flex items-center justify-center'>
          {logoUrl && (
            <img className='max-w-52 max-h-28 rounded-md' src={logoUrl} />
          )}
        </div>
        <UploadFileButton className='w-full mt-2' onUpload={handleUploadLogo}>
          {t('createNft.form.uploadLogo')}
        </UploadFileButton>
      </div>
    </Card>
  )
}

export default NftLayoutSideBarGeneralTab
