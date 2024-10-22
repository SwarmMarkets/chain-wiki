import Editor from '@src/components/Editor'
import Box from '@src/components/ui/Box'
import Text from '@src/components/ui/Text'
import TextField from '@src/components/ui/TextField/TextField'
import { TokenQueryFullData } from '@src/shared/utils/ipfs/types'
import React, { MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'styled-components'

interface TokenEditViewProps {
  handleSuccessUpdate: () => void
  nftAddress: string
  token: TokenQueryFullData | null
}

const TokenEditView: React.FC<TokenEditViewProps> = ({
  handleSuccessUpdate,
  nftAddress,
  token,
}) => {
  const { t } = useTranslation('token')
  const theme = useTheme()
  const [name, setName] = useState('')

  const handleNameChange = (e: MouseEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
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
      <Editor
        name={name}
        onSuccessUpdate={handleSuccessUpdate}
        initialContent={token?.ipfsContent?.htmlContent || ''}
        nftAddress={nftAddress}
        tokenAddress={token?.id}
      />
    </Box>
  )
}

export default TokenEditView
