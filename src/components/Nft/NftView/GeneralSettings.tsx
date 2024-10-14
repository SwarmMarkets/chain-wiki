import React from 'react'
import UploadFileButton from '@src/components/common/UploadFileButton'
import ColorPicker from './ColorPicker'
import Text from '@src/components/ui/Text'
import TextField from '@src/components/ui/TextField/TextField'
import { useTheme } from 'styled-components'
import { LogoPreview, LogoWrapper } from '../styled-components'
import { useHeaderColorContext } from './HeaderColorContext'

interface GeneralSettingsProps {
  name: string
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  uploadedLogoUrl: string | null
  onUploadLogo: (url: string) => void
  initialHeaderColor: string
  onColorChange: (color: string) => void
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  name,
  onNameChange,
  uploadedLogoUrl,
  onUploadLogo,
  initialHeaderColor,
  onColorChange,
}) => {
  const theme = useTheme()

  return (
    <div>
      <Text.p
        fontSize={theme.fontSizes.small}
        mb='5px'
        fontWeight={theme.fontWeights.medium}
      >
        Name
      </Text.p>
      <TextField
        width={250}
        inputProps={{ onChange: onNameChange }}
        placeholder='Enter site name'
      />
      <UploadFileButton mb={2} onUpload={onUploadLogo}>
        Change Logo
      </UploadFileButton>
      <div>
        <Text.p
          fontSize={theme.fontSizes.small}
          mb='5px'
          fontWeight={theme.fontWeights.medium}
        >
          Color Picker
        </Text.p>
        <ColorPicker color={initialHeaderColor} onColorChange={onColorChange} />
      </div>
      {uploadedLogoUrl && (
        <LogoWrapper mb={2} justifyContent='center' p='20px'>
          <LogoPreview src={uploadedLogoUrl} />
        </LogoWrapper>
      )}
    </div>
  )
}

export default GeneralSettings
