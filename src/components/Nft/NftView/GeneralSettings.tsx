import React, { useState } from 'react'
import TextField from 'src/components/ui-kit/TextField/TextField'
import Flex from 'src/components/ui/Flex'
import UpdateNftContentButton from 'src/components/UpdateContent/UpdateNftContentButton'
import useNFT from 'src/hooks/subgraph/useNFT'
import { useTranslation } from 'react-i18next'

interface GeneralSettingsProps {
  nftAddress: string
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ nftAddress }) => {
  const { nft } = useNFT(nftAddress, { disableRefetch: true })
  const [name, setName] = useState<string | null>(null)
  const { t } = useTranslation('buttons')

  const handleNameChange = (name: string) => {
    setName(name)
  }

  const nameValue = name === null ? nft?.name : name

  return (
    <Flex flexDirection='column' $gap='16px'>
      <Flex alignItems='center' $gap='8px'>
        <TextField
          value={nameValue}
          onChange={handleNameChange}
          inputProps={{ placeholder: 'Enter site name' }}
          style={{ flexGrow: 1 }}
        />
        <UpdateNftContentButton
          nftAddress={nftAddress}
          nftContentToUpdate={{ name: nameValue }}
          disabled={!nameValue || nameValue === nft?.name}
          style={{ marginBottom: '12px' }} 
        >
          {t('save')}
        </UpdateNftContentButton>
      </Flex>
    </Flex>
  )
}

export default GeneralSettings
