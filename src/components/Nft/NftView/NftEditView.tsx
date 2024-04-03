import Editor from '@src/components/Editor'
import UploadFileButton from '@src/components/common/UploadFileButton'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LogoPreview, LogoWrapper } from '../styled-components'
import Box from '@src/components/ui/Box'

interface NftEditViewProps {
  onSuccessUpdate: () => void
  nftAddress: string
  initialContent: string
}

const NftEditView: React.FC<NftEditViewProps> = ({
  onSuccessUpdate,
  nftAddress,
  initialContent,
}) => {
  const { t } = useTranslation('updateContent')
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null)

  const handleUploadLogo = (url: string) => {
    setUploadedLogoUrl(url)
  }

  return (
    <Box>
      <UploadFileButton mb={2} onUpload={handleUploadLogo}>
        {t('nft.changeLogo')}
      </UploadFileButton>
      {uploadedLogoUrl && (
        <LogoWrapper mb={2} justifyContent='center' p='20px'>
          <LogoPreview src={uploadedLogoUrl} />
        </LogoWrapper>
      )}
      <Editor
        onSuccessUpdate={onSuccessUpdate}
        nftAddress={nftAddress}
        initialContent={initialContent}
        logoUrl={uploadedLogoUrl}
      />
    </Box>
  )
}

export default NftEditView
