import Editor from '@src/components/Editor'
import UploadFileButton from '@src/components/common/UploadFileButton'
import React, { MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LogoPreview, LogoWrapper } from '../styled-components'
import Box from '@src/components/ui/Box'
import TextField from '@src/components/ui/TextField/TextField'
import { useTheme } from 'styled-components'
import Text from '@src/components/ui/Text'

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
  const theme = useTheme()
  const { t } = useTranslation('updateContent')
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null)
  const [name, setName] = useState('')

  const handleNameChange = (e: MouseEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const handleUploadLogo = (url: string) => {
    setUploadedLogoUrl(url)
  }

  return (
    <Box>
      <Box>
        <Text.p
          value={name}
          fontSize={theme.fontSizes.small}
          mb='5px'
          fontWeight={theme.fontWeights.medium}
        >
          {t('edit.name.label')}
        </Text.p>

        <TextField
          width={250}
          inputProps={{ onChange: handleNameChange }}
          mb='10px'
          placeholder={t('edit.name.placeholder')}
        />
      </Box>
      <UploadFileButton mb={2} onUpload={handleUploadLogo}>
        {t('nft.changeLogo')}
      </UploadFileButton>
      {uploadedLogoUrl && (
        <LogoWrapper mb={2} justifyContent='center' p='20px'>
          <LogoPreview src={uploadedLogoUrl} />
        </LogoWrapper>
      )}
      <Editor
        name={name}
        onSuccessUpdate={onSuccessUpdate}
        nftAddress={nftAddress}
        initialContent={initialContent}
        logoUrl={uploadedLogoUrl}
      />
    </Box>
  )
}

export default NftEditView
