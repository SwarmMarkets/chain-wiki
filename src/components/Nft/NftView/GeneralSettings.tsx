import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Card from 'src/components/ui/Card'
import Flex from 'src/components/ui/Flex'
import useNFT from 'src/hooks/subgraph/useNFT'
import { NFTContentToUpdate } from 'src/hooks/useNFTUpdate'
import { useTheme } from 'styled-components'
import { useHeaderColorContext } from './HeaderColorContext'
import TextField from 'src/components/ui-kit/TextField/TextField'

interface GeneralSettingsProps {
  nftAddress: string
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ nftAddress }) => {
  const { nft } = useNFT(nftAddress, { disableRefetch: true })
  const theme = useTheme()
  const { t } = useTranslation('nft', { keyPrefix: 'settings' })
  const { headerColor, setHeaderColor } = useHeaderColorContext()
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)

  const handleNameChange = (name: string) => {
    setName(name)
  }

  const handleUploadLogo = (url: string) => {
    setUploadedLogoUrl(url)
  }

  const handleColorChange = (color: string) => {
    setHeaderColor(color)
  }

  const colorPickerValue =
    headerColor || nft?.headerBackground || theme.palette.white

  const nameValue = name === null ? nft?.name : name

  const nftContentToUpdate: NFTContentToUpdate = {
    logoUrl: uploadedLogoUrl,
    headerBackground: colorPickerValue,
    ...(name && { name }),
  }

  const reset = useCallback(() => setHeaderColor(''), [setHeaderColor])

  useEffect(() => {
    return reset
  }, [reset])

  return (
    <Flex flexDirection='column' $gap='16px'>
      <div className='flex flex-col gap-3'>
        <h3 className='text-main-accent typo-title3 font-semibold'>
          {t('siteName.title')}
        </h3>
        <Card className='flex flex-col gap-2'>
          <h4 className='text-main-accent typo-title2 font-semibold'>
            {t('siteName.subtitle')}
          </h4>
          <div>{t('siteName.description')}</div>
          <TextField
            value={nameValue}
            onChange={handleNameChange}
            inputProps={{ placeholder: 'Enter site name' }}
          />
        </Card>
      </div>

      {/* <SettingCard
        title={t('customLogo.title')}
        description={t('customLogo.description')}
      >
        <UploadFileButton mb={2} onUpload={handleUploadLogo}>
          Change logo
        </UploadFileButton>
        {uploadedLogoUrl && (
          <LogoWrapper justifyContent='center' p='20px'>
            <LogoPreview src={uploadedLogoUrl} />
          </LogoWrapper>
        )}
      </SettingCard>

      <SettingCard
        title={t('colorPicker.title')}
        description={t('colorPicker.description')}
      >
        <ColorPicker
          color={colorPickerValue}
          onColorChange={handleColorChange}
        />
      </SettingCard>

      <Flex justifyContent='flex-end'>
        <RequirePermissions nftAddress={nftAddress} canUpdateContent>
          <UpdateNftContentButton
            mt={3}
            // onSuccess={onSuccessUpdate}
            nftAddress={nftAddress}
            nftContentToUpdate={nftContentToUpdate}
          />
        </RequirePermissions>
      </Flex> */}
    </Flex>
  )
}

export default GeneralSettings
