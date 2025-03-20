import Card from 'src/components/ui/Card'
import { NFTWithMetadata } from 'src/shared/utils'
import UploadFileButton from '../../UploadFileButton'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface NftLayoutSideBarGeneralTabProps {
  nft: NFTWithMetadata | null
}

const NftLayoutSideBarGeneralTab: React.FC<NftLayoutSideBarGeneralTabProps> = ({
  nft,
}) => {
  const { t } = useTranslation(['nft', 'layout'])

  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null)

  const logo = uploadedLogoUrl || nft?.logoUrl
  const handleUploadLogo = (url: string) => {
    setUploadedLogoUrl(url)
  }
  return (
    <Card>
      <h4 className='typo-title2 text-main-accent font-medium'>
        {t('customization.basic', { ns: 'layout' })}
      </h4>
      <div className='border-b border-main my-4'></div>
      <div className='mb-2'>
        <div className='typo-title2 text-main-accent font-medium mb-1'>
          {t('settings.customLogo.title')}
        </div>
        <div>{t('settings.customLogo.description')}</div>
        <div className='p-5 mt-2 bg-gray-100 rounded-md h-36 flex items-center justify-center'>
          {logo && <img className='max-w-52 max-h-28 rounded-md' src={logo} />}
        </div>
        <UploadFileButton className='w-full mt-2' onUpload={handleUploadLogo}>
          {t('createNft.form.uploadLogo')}
        </UploadFileButton>
      </div>
    </Card>
  )
}

export default NftLayoutSideBarGeneralTab
