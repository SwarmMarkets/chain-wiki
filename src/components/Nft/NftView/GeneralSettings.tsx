import React, { useEffect, useState, useCallback } from 'react'
import UploadFileButton from '@src/components/common/UploadFileButton'
import TextField from '@src/components/ui/TextField/TextField'
import { useTheme } from 'styled-components'
import { LogoPreview, LogoWrapper } from '../styled-components'
import { SettingsLayout } from './SettingsLayout'
import { useTranslation } from 'react-i18next'
import { useHeaderColorContext } from './HeaderColorContext'
import useNFT from '@src/hooks/subgraph/useNFT'
import UpdateNftContentButton from '@src/components/UpdateContent/UpdateNftContentButton'
import Flex from '@src/components/ui/Flex'
import RequirePermissions from '@src/components/common/RequirePermissions'
import { NFTContentToUpdate } from '@src/hooks/useNFTUpdate'
import ColorPicker from './ColorPicker'

interface GeneralSettingsProps {
  nftAddress: string
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ nftAddress }) => {
  const theme = useTheme()
  const { t } = useTranslation('nft')
  const { headerColor, setHeaderColor } = useHeaderColorContext()
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const { nft } = useNFT(nftAddress, { disableRefetch: true })

  const nameValue = name === null ? nft?.name : name

  const nftContentToUpdate: NFTContentToUpdate = {
    logoUrl: uploadedLogoUrl,
    headerBackground: headerColor,
    ...(name && { name }),
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const handleUploadLogo = (url: string) => {
    setUploadedLogoUrl(url)
  }

  const handleColorChange = (color: string) => {
    setHeaderColor(color)
  }

  const colorPickerValue =
    headerColor || nft?.headerBackground || theme.palette.white

  const reset = useCallback(() => setHeaderColor(''), [setHeaderColor])

  useEffect(() => {
    return reset
  }, [reset])

  return (
    <Flex flexDirection='column' $gap='16px'>
      <SettingsLayout
        title={t('roleManager.siteName.title')}
        description={t('roleManager.siteName.description')}
      >
        <TextField
          width={250}
          value={nameValue}
          inputProps={{ onChange: handleNameChange }}
          placeholder='Enter site name'
        />
      </SettingsLayout>

      <SettingsLayout
        title={t('roleManager.customLogo.title')}
        description={t('roleManager.customLogo.description')}
      >
        <UploadFileButton mb={2} onUpload={handleUploadLogo}>
          Change Logo
        </UploadFileButton>
        {uploadedLogoUrl && (
          <LogoWrapper justifyContent='center' p='20px'>
            <LogoPreview src={uploadedLogoUrl} />
          </LogoWrapper>
        )}
      </SettingsLayout>

      <SettingsLayout
        title={t('roleManager.colorPicker.title')}
        description={t('roleManager.colorPicker.description')}
      >
        <ColorPicker
          color={colorPickerValue}
          onColorChange={handleColorChange}
        />
      </SettingsLayout>

      <Flex justifyContent='flex-end'>
        <RequirePermissions nftAddress={nftAddress} canUpdateContent>
          <UpdateNftContentButton
            mt={3}
            // onSuccess={onSuccessUpdate}
            nftAddress={nftAddress}
            nftContentToUpdate={nftContentToUpdate}
          />
        </RequirePermissions>
      </Flex>
    </Flex>
  )
}

export default GeneralSettings
