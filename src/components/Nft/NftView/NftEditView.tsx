import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'
import Box from '@src/components/ui/Box'
import TextField from '@src/components/ui/TextField/TextField'
import Text from '@src/components/ui/Text'
import UploadFileButton from '@src/components/common/UploadFileButton'
import Editor from '@src/components/Editor'
import ColorPicker from './ColorPicker'
import { LogoWrapper, LogoPreview } from '../styled-components'

interface NftEditViewProps {
  onSuccessUpdate: () => void
  nftAddress: string
  initialContent: string
  initialHeaderColor: string
}

const NftEditView: React.FC<NftEditViewProps> = ({
  onSuccessUpdate,
  nftAddress,
  initialContent,
  initialHeaderColor,
}) => {
  const theme = useTheme()
  const { t } = useTranslation('updateContent')
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [headerColor, setHeaderColor] = useState<string>(
    initialHeaderColor || theme.palette.white
  )

  useEffect(() => {
    setHeaderColor(initialHeaderColor)
  }, [initialHeaderColor])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const handleUploadLogo = (url: string) => {
    setUploadedLogoUrl(url)
  }

  return (
    <Box>
      <Box mb={10}>
        <Text.p
          fontSize={theme.fontSizes.small}
          mb='5px'
          fontWeight={theme.fontWeights.medium}
        >
          {t('edit.name.label')}
        </Text.p>
        <TextField
          width={250}
          inputProps={{ onChange: handleNameChange }}
          placeholder={t('edit.name.placeholder')}
        />
      </Box>
      <UploadFileButton mb={2} onUpload={handleUploadLogo}>
        {t('nft.changeLogo')}
      </UploadFileButton>
      <Box mb='10px'>
        <Text.p
          fontSize={theme.fontSizes.small}
          mb='5px'
          fontWeight={theme.fontWeights.medium}
        >
          {t('edit.colorPicker.label')}
        </Text.p>
        <ColorPicker color={headerColor} onColorChange={setHeaderColor} />
      </Box>
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
        headerBackground={headerColor}
      />
    </Box>
  )
}

export default NftEditView
