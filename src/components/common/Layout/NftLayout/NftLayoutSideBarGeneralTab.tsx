import React from 'react'
import { useTranslation } from 'react-i18next'
import Card from 'src/components/ui-kit/Card'
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

  const { logoUrl, iconLogoUrl, setLogoUrl, setIconLogoUrl, init } =
    useCustomizationStore()

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
      iconLogoUrl: nft.iconLogoUrl,
    })
  })

  const handleUploadIconLogo = (url: string) => {
    setIconLogoUrl(url)
  }

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
          {t('settings.icon.title')}
        </div>
        <div>{t('settings.icon.description')}</div>
        <div className='flex items-center gap-2 mt-2'>
          <div className='p-1 bg-gray-100 rounded-md flex items-center justify-center w-10 h-10 shrink-0'>
            {iconLogoUrl && (
              <img
                src={iconLogoUrl}
                className='w-5 h-5 object-contain rounded'
                alt='icon'
              />
            )}
          </div>
          <UploadFileButton className='w-full' onUpload={handleUploadIconLogo}>
            {t('settings.icon.upload')}
          </UploadFileButton>
        </div>

        <div className='typo-title2 text-main-accent font-semibold mb-1 mt-3'>
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
