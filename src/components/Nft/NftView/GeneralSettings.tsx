import React, { useState } from 'react'
import TextField from 'src/components/ui-kit/TextField/TextField'
import UpdateNftContentButton from 'src/components/UpdateContent/UpdateNftContentButton'
import useNFT from 'src/hooks/subgraph/useNFT'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface GeneralSettingsProps {
  nftAddress: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
`

const MarginBottom = styled.div`
  margin-bottom: 12px;
`

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ nftAddress }) => {
  const { nft } = useNFT(nftAddress, { disableRefetch: true })
  const [name, setName] = useState<string | null>(null)
  const { t } = useTranslation('buttons')

  const handleNameChange = (name: string) => {
    setName(name)
  }

  const nameValue = name === null ? nft?.name : name

  return (
    <Container>
      <GridContainer>
        <TextField
          value={nameValue}
          onChange={handleNameChange}
          inputProps={{ placeholder: 'Enter site name' }}
        />
        <MarginBottom>
          <UpdateNftContentButton
            nftAddress={nftAddress}
            nftContentToUpdate={{ name: nameValue }}
            disabled={!nameValue || nameValue === nft?.name}
          >
            {t('save')}
          </UpdateNftContentButton>
        </MarginBottom>
      </GridContainer>
    </Container>
  )
}

export default GeneralSettings
